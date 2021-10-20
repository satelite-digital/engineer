import fs from 'fs-extra';

const removeTemplate = (target) => fs.remove(target);

export default removeTemplate;
