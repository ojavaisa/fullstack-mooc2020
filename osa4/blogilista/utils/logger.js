const info = (...params) => {
  if (process.env.NODE_ENV !== 'test'){ //don't do normal (loging) prints in testing
    console.log(...params);
  }
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info, error
};