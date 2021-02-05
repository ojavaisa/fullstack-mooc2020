const info = (...params) => {
  // if (process.env.NODE_ENV !== 'test'){ //don't do normal (logging) prints in testing
  //   console.log(...params);
  // }
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info, error
};