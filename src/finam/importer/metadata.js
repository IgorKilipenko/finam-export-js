import { logger, fetchContent } from '../../utils';
import iconv from 'iconv-lite';
import { parse as _parse } from 'babylon';
import {
    FinamImportError,
    FinamDownloadError,
    FinamThrottlingError,
    FinamParsingError,
    FinamObjectNotFoundError,
    FinamTooLongTimeframeError,
} from './exception';

const assert = logger.assert;

/**
 * Обеспечивает получение метаданных с сайта финам. [
 * aEmitentIds
 * aEmitentNames
 * aEmitentCodes
 * aEmitentMarkets
 * aEmitentDecp
 * aDataFormatStrs
 * aEmitentChild
 * aEmitentUrls]
 *
 * @class Metadata
 */
class Metadata {
    finamUrl = 'https://www.finam.ru/cache/icharts/icharts.js';

    /**
     * Парсит исходный код js находит все обявленные элементы типа: [массив | объект]
     * 
     * @param {string} textCode Исходный код на js
     * @returns {Array<object>} Массив алементов {name, value}
     * @memberof Metadata
     */
    parse = textCode => {

        if (
            !textCode ||
            typeof textCode !== 'string' ||
            textCode.length === 0
        ) {
            throw new FinamImportError('Нет данных');
        }

        let ast = null;

        try {
            ast = _parse(textCode);
        } catch (err) {
            ast = null;
            throw new FinamParsingError(err.message);
        }

        

        if (!ast || ast.program === undefined){
            throw new FinamParsingError('Узел body не найден');
        }

        const body = ast.program.body;

        const variableDeclarations = body.filter(
            node =>
                node.type === 'VariableDeclaration' &&
                node.kind.match('let|const|var')
        );

        if (!variableDeclarations || variableDeclarations.length === 0) {
            throw new FinamParsingError('Узел VariableDeclaration не найден');
        }

        const declarations = variableDeclarations
            .map(varDec => varDec.declarations)
            .reduce((res, curr) => {
                res.push(
                    ...curr.filter(
                        item => item.type === 'VariableDeclarator' && item.init
                    )
                );
                return res;
            }, []);

        if (!declarations || declarations.length === 0) {
            throw new FinamParsingError('Узел declarations не найден');
        }

        const vars = [];    // Массив распознанных объектов
        declarations.forEach(dec => {
            if (dec.init.type === 'ArrayExpression' && dec.init.elements) {
                const value = [];
                vars.push({
                    name: dec.id.name,
                    value
                });
                dec.init.elements.forEach(item => {
                    if (item.type.match(/Literal$/)) {
                        value.push(item.value);
                    }
                });
            } else if (
                dec.init.type === 'ObjectExpression' &&
                dec.init.properties
            ) {
                const value = {};
                vars.push({
                    name: dec.id.name,
                    value
                });
                dec.init.properties.forEach(propItem => {
                    if (propItem.type.match(/Property$/)) {
                        value[propItem.key.name] = propItem.value.value;
                    }
                });
            }
        });

        assert(vars.length > 0);

        return vars;
    };

    /**
     * Скачивает исходный файл метаданныех (.js)
     *
     * @memberof Metadata
     */
    download = async () => {
        const data = await fetchContent(
            this.finamUrl,
            iconv.decodeStream('win1251')
        );
        return data;
    };
}

export default Metadata;
