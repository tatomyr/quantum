export const partition = (isValid) => (array) => array.reduce(([pass, fail], item) => isValid(item) ? [[...pass, item], fail] : [pass, [...fail, item]], [[], []]);
