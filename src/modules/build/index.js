import readConfigFile from './readConfigFile';
import processTemplates from './processTemplates';

const build = async (keys) => {
  const { data, templates, options } = await readConfigFile();
  processTemplates(templates, data, options, keys);
};

export default build;
