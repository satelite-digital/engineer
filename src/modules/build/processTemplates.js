import fs from 'fs-extra';
import path from 'path';
import objectGetDeep from '../../utils/objectGetDeep';

const Handlebars = require('handlebars');

const processTemplateIf = (template, scope) => {
  if (!('if' in template)) {
    return true;
  }
  return template.if(scope);
};

const readFile = async (filePath) => fs.readFile(filePath, 'utf-8');

const compileTemplate = (file, scope, options) => {
  const engine = options?.engine || Handlebars;
  const compiler = engine.compile(file);
  return compiler(scope);
};

const computeDestination = (template, scope) => {
  let destination = path.join(process.cwd(), template.dest);
  const matches = destination.match(/\[(.*?)\]/g);
  if (matches) {
    matches.forEach((item) => {
      const key = item.replace('[', '').replace(']', '');
      destination = destination.replace(item, scope[key]);
    });
  }
  return destination;
};

const buildFile = async (template, scope, options) => {
  if (!processTemplateIf(template, scope)) {
    return false;
  }
  const fileContents = await readFile(template.src);
  const compiledTemplate = compileTemplate(fileContents, scope, options);
  const computedDestination = computeDestination(template, scope);
  return fs.outputFile(computedDestination, compiledTemplate);
};

const processTemplate = async (template, data, options) => {
  const scope = template.key ? objectGetDeep(data, template.key) : data;
  if (Array.isArray(scope)) {
    scope.forEach((subscope) => buildFile(template, subscope, options));
  } else {
    buildFile(template, scope, options);
  }
};

const processArray = (templatesArray, data = {}, options) => {
  templatesArray.forEach((template) => {
    processTemplate(template, data, options);
  });
};

const processObject = (templatesObject, data = {}, options, keys = []) => processArray(
  Object.entries(templatesObject).reduce((previous, [key, templates]) => {
    if (!keys.length) {
      return [...previous, ...templates];
    }
    return keys.includes(key) ? [...previous, ...templates] : [...previous];
  }, []),
  data,
);

const processTemplates = (templates, data, options, keys) => {
  if (typeof templates !== 'object') {
    return false;
  }
  if (Array.isArray(templates)) {
    return processArray(templates, data, options);
  }
  return processObject(templates, data, options, keys);
};

export default processTemplates;
