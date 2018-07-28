import { logger, fetchContent } from '../../utils';
import Timeframe from './timeframe';
import {URL, URLSearchParams} from 'url';
import Metadata from './Metadata';

const assert = logger.assert;

const LookupComparator = {
    EQUALS: 1,
    STARTSWITH: 2,
    CONTAINS: 3
};

class Importer {
    constructor(host = 'export.finam.ru') {
        if (typeof host !== undefined) {
            this.host = host;
        }
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

    download = async (
        id=16842,
        market=1,
        startDate = new Date(2007, 1, 1),
        endDate = new Date(),
        timeframe = Timeframe.DAILY
    ) => {

        const code = 'GAZP';

        const params = {
            p: timeframe.value,
            em: id,
            market: market.value,
            df: startDate.getDate(),
            mf: startDate.getMonth() - 1,
            yf: startDate.getFullYear(),
            dt: endDate.getDate(),
            mt: endDate.getMonth() - 1,
            yt: endDate.getFullYear(),
            cn: code,
            code: code,
            datf: timeframe === Timeframe.TICKS ? 6 : 5
        };

        const url = this.buildUrl(params);

        const data = await fetchContent(url);

        logger.debug(data);

        return data;
    };

    buildUrl = params => {

        const searchParams = new URLSearchParams({
            ...this.url_params,
            ...params
        })

        assert(searchParams.toString().length > 0);
        
        const url = new URL(`http://${this.host}`);
        url.protocol = 'http:', 
        url.host = this.host;
        url.pathname = 'table.csv';
        //url.search = search;
        url.search = searchParams.toString();

        return url;
    };


}



export default Importer;
