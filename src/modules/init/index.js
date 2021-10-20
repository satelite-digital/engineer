import path from 'path';
import templates from '../../constants/templates';
import copyTemplate from './copyTemplate';
import downloadTemplate from './downloadTemplate';
import unzipTemplate from './unzipTemplate';
import removeTemplate from './removeTemplate';

const init = async (template = 'init') => {
  try {
    const tmpPath = path.join(process.cwd(), 'tmp');
    const downloadedTemplatePath = await downloadTemplate(
      template in templates ? templates[template] : template,
      tmpPath,
    );
    const [{ path: unzippedTemplatePath }] = await unzipTemplate(
      downloadedTemplatePath,
      tmpPath,
    );
    await copyTemplate(path.join(tmpPath, unzippedTemplatePath), process.cwd());
    await removeTemplate(tmpPath);
    return true;
  } catch (err) {
    console.log('Invalid template or URL provided');
    return false;
  }
};

export default init;
