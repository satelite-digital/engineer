import path from 'path';
/* eslint-disable import/no-dynamic-require, global-require */
const readConfigFile = async (
  configPath = path.join(process.cwd(), 'engineer.config.js'),
) => require(configPath)();
/* eslint-enable */

export default readConfigFile;
