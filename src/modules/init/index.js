import path from 'path';
import templates from '../../constants/templates';
import copyTemplate from './copyTemplate';
import downloadTemplate from './downloadTemplate';
import unzipTemplate from './unzipTemplate';
import removeTemplate from './removeTemplate';

const init = async (template = 'init') => {
  const tmpPath = path.join(process.cwd(), 'tmp');
  const downloadedTemplatePath = await downloadTemplate(
    templates[template],
    tmpPath,
  );
  const [{ path: unzippedTemplatePath }] = await unzipTemplate(
    downloadedTemplatePath,
    tmpPath,
  );
  await copyTemplate(path.join(tmpPath, unzippedTemplatePath), process.cwd());
  await removeTemplate(tmpPath);
  return true;
};

export default init;
