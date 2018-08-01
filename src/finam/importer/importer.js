// @flow

import { logger, fetchContent, assert } from '../../utils';
import { timeframe as Timeframe, markets } from '../importer';
import { URL, URLSearchParams } from 'url';

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


    /**
     *
     * @param options {
     *  symbol
     *  timeframe [TICKS: 1, MINUTES1: 2, MINUTES5: 3, MINUTES10: 4, MINUTES15: 5, MINUTES30: 6, HOURLY: 7, DAILY: 8, WEEKLY: 9, MONTHLY: 10]
     *  id
     *  market [BONDS: 2, COMMODITIES: 24, CURRENCIES: 45, ETF: 28, FUTURES: 14, FUTURES_ARCHIVE: 17,INDEXES: 6,FUTURES_USA: 7, SHARES: 1, SPB: 517, USA: 25]
     *  from = new Date(2007, 1, 1)
     *  to = new Date()
     * }
     * @memberof Importer
     */
    import = async (options: Object) => {
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

        const data = await fetchContent(url);

        return this.parseCsv(data);
    };

    buildUrl = (params: object) => {
        const searchParams = new URLSearchParams({
            ...this.url_params,
            ...params
        });

        assert(searchParams.toString().length > 0);

        const url = new URL(`http://${this.host}`);
        (url.protocol = 'http:'), (url.host = this.host);
        url.pathname = 'table.csv';
        url.search = searchParams.toString();

        return url;
    };

    /**
     *
     * @returns "<DATE>","<TIME>","<OPEN>","<HIGH>","<LOW>","<CLOSE>","<VOL>"
     * @memberof Importer
     */
    parseCsv = (csv: string, options: object = { newLine: '\r\n', delim: ';' }) => {
        const lines = csv.trim().split(options.newLine);
        const headers = lines
            .shift()
            .split(options.delim)
            .map(header => header.replace(/^<|>$/g, '').toLowerCase());

        //return lines.map(line => {
        //    return line.split(options.delim).reduce((candle, val, i) => {
        //        candle[headers[i]] = val;
        //        return candle;
        //    }, {});
        //});
        
        const table = headers.reduce((res, curr) =>{
            res[curr] = new Array(lines.length);
            return res;
        }, {})
        logger.debug(Object.keys(table))
        lines.forEach((line, lineNum) => {
            line.split(options.delim).forEach((val, i) => {
                table[headers[i]][lineNum] = val;
                //logger.debug(val)
            })
        });

        return table;
    };
}

export default Importer;
