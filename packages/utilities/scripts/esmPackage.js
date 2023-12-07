/**
 * @module esmPackage
 */
const fs = require('fs');
const path = require('path');
const util = require('util');

const { promisify } = util;
const esmDir = path.join(process.env.PWD, 'esm');
const consola = console;
/**
 * Create an 'module' package.json variant for esm export
 */
async function esmPackage () {
  try {
    const packagePath = path.join(esmDir, 'package.json');
    const pkg = { type: 'module' };
    await promisify(fs.writeFile)(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
  } catch (e) {
    consola.error(e);
  }
}

esmPackage();
