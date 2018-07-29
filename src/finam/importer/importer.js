import { logger, fetchContent, assert } from '../../utils';
//import Timeframe from './timeframe';
import {
    timeframe as Timeframe,
    markets
} from '../importer';
import { URL, URLSearchParams } from 'url';
import Metadata from './Metadata';


class Importer {
    constructor(host = 'export.finam.ru') {
        if (typeof host !== undefined) {
            this.host = host;
        }
    }
    headers = {

    }
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

    import = async options => {
        options = {
            market: markets.SHARES,
            from: new Date(2007, 1, 1),
            to: new Date(),
            timeframe: Timeframe.DAILY,
            ...options
        };

        const { symbol, timeframe, id, market, from, to } = options;

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

    buildUrl = params => {
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
    parseCsv = (csv, options = {newLine: '\r\n', delim:';'}) => {
        
        const lines = csv.trim().split(options.newLine);
        const headers = lines.shift().split(options.delim).map(header => header.replace(/^<|>$/g, '').toLowerCase());

        return lines.map(line => {
            return line.split(options.delim).reduce((candle, val, i) => {
                candle[headers[i]] = val;
                return candle;
            } , {})
        });
    }
}

export default Importer;
