const chalk = require('chalk');

exports.buffer = (msg) => {
  let ret = '';
  const space = 30;
  const length = space - msg.length - 1;
  if (length > 0) {
    ret = ' '.repeat(length);
  }
  return ret;
};

exports.toMs = num => `${num / 1000} s`;

exports.divider = () => `\n${'-'.repeat(100)}`;

exports.scoreColor = (sc) => {
  const score = Number(sc);
  let color = chalk.yellow;
  color = score < 50 ? chalk.red : color;
  color = score > 89 ? chalk.green : color;
  return color(score);
};
