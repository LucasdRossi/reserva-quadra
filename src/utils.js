module.exports = {
  waitTimeout: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};
