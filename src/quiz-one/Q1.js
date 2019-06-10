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

  const result = [];
  let key = "",
    value = "";

  // True = key , false = value
  let nextIsKey = true;
  let obj = {};
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Seperate statements and identify next statement in string
    if (char === "\n") {
      nextIsKey = true;
      obj[key] = value;
      key = "";
      value = "";
      result.push(obj);
      obj = {};
      continue;
    }

    // Seperate properties in object and identify next properties in string
    if (char === ";") {
      nextIsKey = true;
      obj[key] = value;
      key = "";
      value = "";
      continue;
    }

    // Seperate key & value
    if (char === "=") {
      nextIsKey = false;
      continue;
    }

    if (i + 1 === text.length) {
      obj[key] = value + char;
      result.push(obj);
      continue;
    }

    if (nextIsKey) {
      key += char;
      continue;
    } else {
      value += char;
      continue;
    }
  }
  return result;
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

  const statements = array.map(element =>
    Object.entries(element)
      .map(item => item.join("="))
      .join(";")
  );

  const output = statements.join("\n");
  return output;
};

export { load, store };
