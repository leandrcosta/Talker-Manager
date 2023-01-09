const { writeFile } = require('fs/promises');
const { resolve } = require('path');

const pathFile = resolve(__dirname, '../talker.json');

async function writeTalkers(data) {
  try {
    const dataWrite = await writeFile(pathFile, JSON.stringify(data, null, 2));
    return dataWrite;
  } catch (error) {
    console.log('Error on write file');
    console.log(error.message);
  }
}

module.exports = { writeTalkers };