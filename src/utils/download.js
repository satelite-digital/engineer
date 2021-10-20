import fs from 'fs-extra';
import path from 'path';

const axios = require('axios');

const download = async (src, dest, filename) => {
  await fs.ensureDir(dest);
  const downloadPath = path.join(dest, filename);
  const writer = fs.createWriteStream(downloadPath);

  const response = await axios({
    url: src,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve(downloadPath);
    });
    writer.on('error', reject);
  });
};

export default download;
