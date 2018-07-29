import { logger, fetchContent, fsp } from '../../utils';
import iconv from 'iconv-lite';
import { parse as _parse } from 'babylon';
import {
    FinamImportError,
    FinamDownloadError,
    FinamThrottlingError,
    FinamParsingError,
    FinamObjectNotFoundError,
    FinamTooLongTimeframeError
} from './exception';
import fs from 'fs';

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

        assert(ast && typeof ast.program !== undefined && typeof ast.program.body !== undefined, 'Узел body не найден', FinamParsingError)

        const body = ast.program.body;

        const variableDeclarations = body.filter(
            node =>
                node.type === 'VariableDeclaration' &&
                node.kind.match('let|const|var')
        );

        assert(typeof variableDeclarations !== undefined && variableDeclarations.length > 0, 'Узел VariableDeclaration не найден', FinamParsingError)

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

        assert(typeof declarations !== null && declarations.length > 0, 'Узел declarations не найден', FinamParsingError)

        const vars = {} // Массив распознанных объектов
        declarations.forEach(dec => {
            if (dec.init.type === 'ArrayExpression' && dec.init.elements) {
                const value = [];
                vars[dec.id.name] = value;

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
                vars[dec.id.name] = value;
                
                dec.init.properties.forEach(propItem => {
                    if (propItem.type.match(/Property$/)) {
                        const key = typeof propItem.key.nam == undefined ? propItem.key.name : propItem.key.value 
                        value[key] = propItem.value.value;
                    }
                });
            }
        });

        this.validateMeta(vars);

        this.meta = vars;
        return vars;
    };

    validateMeta = (meta) => {
        const testNames = [
            'aEmitentIds',
            'aEmitentNames',
            'aEmitentCodes',
            'aEmitentMarkets',
            'aEmitentDecp',
            'aDataFormatStrs',
            'aEmitentChild',
            'aEmitentUrls'
        ]
        const names = Object.keys(meta);
        assert(names.length > 0, 'Исходный файл митаданных не содержит переменных', FinamParsingError);
        testNames.forEach(test => {
            assert(names.findIndex(name => name === test) >= 0, `В исходном файле метаданных нет переменной ${test}`, FinamParsingError)
        })
    }

    /**
     * Скачивает исходный файл метаданныех (.js)
     *
     * @memberof Metadata
     */
    download = async () => {
        const data = await fetchContent(this.finamUrl, 'win1251');
        return data;
    };

    upload = async () => {};

    saveMetadata = async (meta = this.meta) => {
        assert(meta && typeof meta !== undefined);
        const dir = './udata';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const str = JSON.stringify(meta);
        try {
            await fsp.writeFile(`${dir}/metadata.json`, str);
        } catch (err) {
            logger.error(err);
        }
    };
}

export default Metadata;
