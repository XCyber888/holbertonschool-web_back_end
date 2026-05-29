const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(Error('Cannot load the database'));

      const lines = data.split('\n').filter((l) => l.trim() !== '');
      const fields = {};

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        const field = parts[3];
        const firstname = parts[0];

        fields[field].push(firstname);
      }

      let output = `Number of students: ${lines.length - 1}`;
      for (const field of Object.keys(fields).sort()) {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }

      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const db = process.argv[2];
  res.set('Content-Type', 'text/plain');
  
  let responseText = 'This is the list of our students\n';
  try {
    const data = await countStudents(db);
    res.send(`${responseText}${data}`);
  } catch (err) {
    res.send(`${responseText}${err.message}`);
  }
});

app.listen(PORT);

module.exports = app;
