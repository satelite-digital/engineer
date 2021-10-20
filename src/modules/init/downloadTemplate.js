import download from '../../utils/download';

const downloadTemplate = (template, dest) => download(template, dest, 'template.zip');

export default downloadTemplate;
