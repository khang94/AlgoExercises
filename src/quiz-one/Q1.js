/**
 * Load string and analyze to an array
 * with key & value respectively
 * Input => 'key1=value1;key2=value2\nkeyA=valueA'
 *
 * Output => [{ key1: value1,
 *              key2: value2
 *            },
 *            {
 *               keyA: valueA
 *            }]
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
 * Store array and combined into string
 * Input =>  [{ key1: value1,
 *              key2: value2
 *            },
 *            {
 *               keyA: valueA
 *            }]
 *
 * Output => 'key1=value1;key2=value2\nkeyA=valueA'
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
