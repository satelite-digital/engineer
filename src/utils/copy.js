import fs from 'fs-extra';

const copyTemplate = (input, output) => fs.copy(input, output);

export default copyTemplate;
