import { logger } from './logger';
import iconv from 'iconv-lite';
import fetch from 'node-fetch';

const fetchContent = (url, enc = 'win1251') => {
    //http.globalAgent.keepAlive =false;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.buffer())
            .then(buffer => iconv.decode(buffer, enc))
            .then(text => {
                //logger.debug(text);
                resolve(text);
            })
            .catch(err => reject(err));
    });
};

const fetchContentPool = (urls, enc = 'win1251') => {
    const result = new Array(urls.length);

    return new Promise(async (resolve, reject) => {
        try {
            for (const [i, url] of urls.entries()) {
                result[i] = await fetchContent(url, enc);
            }
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

export { fetchContent, fetchContentPool };
