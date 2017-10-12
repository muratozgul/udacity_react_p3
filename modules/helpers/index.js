import _ from 'lodash';

export const createActions = (actionNames, nameSpace) => {
  // example: (['DELETE'], 'POSTS') -> { DELETE: 'POSTS::DELETE' }
  return Object.freeze(actionNames.reduce((obj, key) => {
    obj[key] = _.isString(nameSpace) ? `${nameSpace}::${key}` : key;
    return obj;
  }, {}));
};

export const isNonBlankString = (str) => {
  return _.isString(str) && str.trim().length > 0;
};

export const iterateMap = (map, func = v => v) => {
  const arr = [];
  const mapIter = map.values();
  for (var v of mapIter) {
    arr.push(func(v));
  }
  return arr;
}
