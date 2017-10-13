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

export const iterateMap = (map, func = (k, v) => v) => {
  const arr = [];
  const mapIter = map.entries();
  for (var pair of mapIter) {
    arr.push(func(pair[0], pair[1]));
  }
  return arr;
}
