import decompress from 'decompress';

const unzipTemplate = (input, output) => decompress(input, output);

export default unzipTemplate;
