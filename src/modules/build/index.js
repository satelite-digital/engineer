import readConfigFile from './readConfigFile';
import processTemplates from './processTemplates';

const build = async (keys) => {
  const { data, templates } = await readConfigFile();
  processTemplates(templates, data, keys);
};

export default build;
