const { readFile } = require('fs/promises');
const { resolve } = require('path');

const pathFile = resolve(__dirname, '../talker.json');

async function readTalkers() {
  try {
    const data = await readFile(pathFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error on read file');
    console.log(error.message);
  }
}

module.exports = { readTalkers };