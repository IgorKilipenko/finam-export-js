import { logger } from './utils';
import {Importer, Metadata } from './finam/importer/index';

const testMetadata = async () => {
    logger.debug(typeof Metadata);
    const parser = new Metadata();
    try {
        const data = await parser.download();
        const vars = parser.parse(data);
        parser.saveMetadata(data);
        vars.forEach(item => {
            //if (Array.isArray(item.value)){
            //    logger.debug({[item.name]: item.value.slice(0,5)});
            //}
            logger.debug(item.name);
        });
    } catch (err) {
        logger.error(err);
    }
    //const code = parser.parse('var data = [1,2,3], obj = {nm: "Igor"}, tst=3; var v3="fff", vNull');
};

const testImporter = () => {
    const importer = new Importer();

    importer.download()
}

testMetadata();
//testImporter();

