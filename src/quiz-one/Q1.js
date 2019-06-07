/**
 * Load string and analyze to an array
 * with key & value respectively
 * @param {* String} text
 */

const load = text => {
  if (text === "" || !text) return [{}];

  const array = [];
  const statements = text.split("\n");
  let keyValueArr = [];

  let temp = {};
  for (let i = 0; i < statements.length; i++) {
    temp = {};
    keyValueArr = statements[i].split(";");
    if (keyValueArr.length > 1) {
      keyValueArr.map(KV => {
        const [key, value] = KV.split("=");
        temp[key] = value;
      });
    } else {
      const [key, value] = keyValueArr[0].split("=");
      temp[key] = value;
    }

    array.push(temp);
  }
  return array;
};

/**
 * Store array into string
 *
 * @param {* Array} array
 */
const store = array => {
  if (!array || array === []) return "";

  const statements = [];
  let combinedString = "";
  for (let i = 0; i < array.length; i++) {
    combinedString = Object.entries(array[i])
      .map(kv => kv.join("="))
      .join(";");
    statements.push(combinedString);
  }

  const output = statements.join("\n");
  return output;
};

export { load, store };
