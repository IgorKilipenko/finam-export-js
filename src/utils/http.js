import { consoleLogger as logger } from './logger';
import iconv from 'iconv-lite';

import fetch from 'node-fetch';
import { StringDecoder } from 'string_decoder';

const fetchContent = (url, enc = 'win1251') => {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.buffer()).then(buffer => iconv.decode(buffer,enc)).then(text => resolve(text)).catch(err => reject(err));
    })
    
}

export { fetchContent };
