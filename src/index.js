import { logger } from './utils';
import {Importer, Metadata, timeframe, markets} from './finam/importer';
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

testMetadata();
testImporter();

