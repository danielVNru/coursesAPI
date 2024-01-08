
export function pick(source:object, keys: string[]) {
    let result = {};
    for (let key in source) {
      if (keys.includes(key)) {
        result[key] = source[key];
      }
    }
    return result;
}