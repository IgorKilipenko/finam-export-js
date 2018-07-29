import { logger } from './utils';
import {Importer, Metadata } from './finam/importer/index';
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

const testImporter = () => {
    const importer = new Importer();

    importer.download();
}

testMetadata();
//testImporter();

