const objectGetDeep = (obj, propString) => {
  if (!propString) return obj;

  let prop;
  const props = propString.split('.');
  let object = { ...obj };
  let i = 0;
  /* eslint-disable-next-line no-plusplus */
  for (i; i < props.length - 1; i++) {
    prop = props[i];
    const candidate = object[prop];
    if (candidate !== undefined) {
      object = candidate;
    } else {
      break;
    }
  }
  return object[props[i]];
};

export default objectGetDeep;
