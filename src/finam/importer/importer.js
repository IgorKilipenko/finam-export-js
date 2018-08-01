// @flow

import { logger, fetchContent, assert } from '../../utils';
import { timeframe as Timeframe, markets } from '../importer';
import { URL, URLSearchParams } from 'url';
import { listeners } from 'cluster';
import { FinamParsingError, FinamDownloadError } from './exception';

/**
 *
 *
 * @class Importer
 */
class Importer {
    constructor(host: string = 'export.finam.ru') {
        if (typeof host !== undefined) {
            this.host = host;
        }
    }
    host: string;
    headers = {};
    url_params = {
        d: 'd',
        f: 'table',
        e: '.csv',
        dtf: '1',
        tmf: '3',
        MSOR: '0',
        mstime: 'on',
        mstimever: '1',
        sep: '3',
        sep2: '1',
        at: '1'
    };

    searchParams = {
        date: /^(\d{4})(\d{2})(\d{2})$/,
        time: /^(\d{2}):(\d{2}):(\d{2})/
    };

    /**
     *
     * @param options {Object} {
     *  symbol {string}
     *  timeframe [TICKS: 1, MINUTES1: 2, MINUTES5: 3, MINUTES10: 4, MINUTES15: 5, MINUTES30: 6, HOURLY: 7, DAILY: 8, WEEKLY: 9, MONTHLY: 10]
     *  id
     *  market [BONDS: 2, COMMODITIES: 24, CURRENCIES: 45, ETF: 28, FUTURES: 14, FUTURES_ARCHIVE: 17,INDEXES: 6,FUTURES_USA: 7, SHARES: 1, SPB: 517, USA: 25]
     *  from = new Date(2007, 1, 1)
     *  to = new Date()
     * }
     * @memberof Importer
     */
    import = async (options: Object): Object => {
        const {
            symbol,
            timeframe = Timeframe.DAILY,
            id,
            market = markets.SHARES,
            from = new Date(2007, 1, 1),
            to = new Date()
        } = options;

        const params = {
            p: timeframe,
            em: id,
            market: market,
            df: from.getDate(),
            mf: from.getMonth() - 1,
            yf: from.getFullYear(),
            dt: to.getDate(),
            mt: to.getMonth() - 1,
            yt: to.getFullYear(),
            cn: symbol,
            code: symbol,
            datf: timeframe === Timeframe.TICKS ? 6 : 5
        };

        const url = this.buildUrl(params);

        logger.debug(`Скачивание файла. URL: ${url}...`);

        const data = await fetchContent(url);

        logger.debug(`Данные получены. Исходные данные - \n${data}`);

        assert(
            typeof data !== undefined && data.lebgth > 0,
            `Ошибка скачивания файла. Файл пустой. ${JSON.stringify({
                URL: url.toString(),
                data
            })}`,
            FinamDownloadError
        );

        logger.debug(`Получено ${data.lebgth} символов`);

        return this.parseCsv(data);
    };

    validate = (data: string) => {
        assert();
    };

    buildUrl = (params: object) => {
        const searchParams = new URLSearchParams({
            ...this.url_params,
            ...params
        });

        assert(searchParams.toString().length > 0);

        const url = new URL(`http://${this.host}`);
        url.protocol = 'http:';
        url.host = this.host;
        url.pathname = 'table.csv';
        url.search = searchParams.toString();

        return url;
    };

    /**
     *
     * @returns {Object} "<DATE>","<TIME>","<OPEN>","<HIGH>","<LOW>","<CLOSE>","<VOL>"
     * @memberof Importer
     */
    parseCsv = (
        csv: string,
        options: object = { newLine: '\r\n', delim: ';' }
    ): Object => {
        const lines = csv.trim().split(options.newLine);

        assert(
            listeners.length > 0,
            `Количество строк в исходном документе меньше 1. Исхлдный текст файла: ${csv}`,
            FinamParsingError
        );

        const headers = lines
            .shift()
            .split(options.delim)
            .map(header => header.replace(/^<|>$/g, '').toLowerCase());

        assert(
            headers.length > 0,
            `Неверный формат заголовка. headers: ${JSON.stringify(headers)}`
        );

        const table = headers.reduce((res, curr) => {
            res[curr] = new Array(lines.length);
            return res;
        }, {});

        lines.forEach((line, lineNum) => {
            line.split(options.delim).forEach((val, i) => {
                const field = headers[i];
                table[field][lineNum] =
                    field.search(/^date|time$/) < 0
                        ? val
                        : this.parseDateTime(val, field);
            });
        });

        return table;
    };

    parseDateTime = (str: string, type: 'date' | 'time') => {
        const match =
            type === 'date'
                ? str.match(this.searchParams.date)
                : str.match(this.searchParams.time);
        if (match) {
            return type === 'date'
                ? new Date(...match.slice(1, 3))
                : new Date(1970, 1, 1, ...match.slice(1, 3)).getTime();
        }
    };
}

export default Importer;
