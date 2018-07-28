import { consoleLogger as logger } from './logger';
import { URL } from 'url';
import http from 'http';
import https from 'https';
import iconv from 'iconv-lite';

import fetch from 'node-fetch';

const fetchContent = (url, converterStream = iconv.decodeStream('win1251')) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.text()).then(text => resolve(text)).catch(err => reject(err));
    })
    
}

const _fetchContent = (url, converterStream = iconv.decodeStream('win1251')) => {
    return new Promise((resolve, reject) => {
        const urlBuilder = new URL(url);
        logger.debug(urlBuilder.href);
        const lib =
            urlBuilder.protocol === 'https:'
                ? https
                : http
        const options = {
            protocol: urlBuilder.protocol,
            host: urlBuilder.host,
            path: urlBuilder.pathname,
            agent: false,
            //headers: {
            //    'Content-Type': 'application/javascript'
            //}
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        };
        logger.debug(JSON.stringify(options));
        const request = lib.get(options, res => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(
                    new Error(
                        'Ошибка загрузки страницы, код ошибки: ' +
                            res.statusCode
                    )
                );
            }
            const body = [];
            const stream =
                converterStream !== undefined && converterStream
                    ? converterStream
                    : res;
            if (stream === converterStream) {
                res.pipe(converterStream);
            }
            stream.on('data', chunk => body.push(chunk));
            stream.on('end', () => {
                const data = body.join('');
                logger.debug(`Данные загружены. ${data.length} символов`);
                resolve(data);
            });
        });
        request.on('error', err => reject(err));
    });
};


export { fetchContent };
