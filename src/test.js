import { logger , fetchContentPool} from './utils';
import {Importer, Metadata, timeframe, markets} from './index';
import path from 'path';

const testMetadata = async () => {
    const parser = new Metadata();
    try {
        const data = await parser.download();
        const vars = parser.parse(data);
        parser.saveMetadata();
        Object.keys(vars).forEach(item => {
            logger.debug(item);
        });
    } catch (err) {
        logger.error(err);
    }
};

const testImporter = async () => {
    const importer = new Importer();

    const data = await importer.import({
        symbol: 'GAZP',
        from: new Date(2007, 1, 1),
        to: new Date(),
        timeframe: timeframe.DAILY,
        market: markets.SHARES,
        id : 16842
    });

    logger.debug(JSON.stringify(data.slice(0, 5)));
}

const testSet = async () =>{
    const urls = [
        //Газпром
        'http://export.finam.ru/GAZP_160101_180716.txt?market=1&em=16842&code=GAZP&apply=0&df=1&mf=0&yf=2016&from=01.01.2016&dt=16&mt=6&yt=2018&to=16.07.2018&p=8&f=GAZP_160101_180716&e=.txt&cn=GAZP&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1',
        //ГМК
        'http://export.finam.ru/GMKN_160101_180716.txt?market=1&em=795&code=GMKN&apply=0&df=1&mf=0&yf=2016&from=01.01.2016&dt=16&mt=6&yt=2018&to=16.07.2018&p=8&f=GMKN_160101_180716&e=.txt&cn=GMKN&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1',
        //КМЗ
        'http://export.finam.ru/KMEZ_160101_180716.txt?market=1&em=22525&code=KMEZ&apply=0&df=1&mf=0&yf=2016&from=01.01.2016&dt=16&mt=6&yt=2018&to=16.07.2018&p=8&f=KMEZ_160101_180716&e=.txt&cn=KMEZ&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1'
    ]
    //const data = await fetchContentSet({
    //    urls
    //})
    //logger.debug(data);

    const data = await fetchContentPool(urls);
    for (const res of data){
        logger.debug(res);
    }
}

//testMetadata();
//testImporter();
testSet();