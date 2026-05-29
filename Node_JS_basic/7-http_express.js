const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbPath = process.argv[2];

function parseStudents(path) {
    return 'Cannot load the database';
  }
  const content = fs.readFileSync(path, 'utf8').trim();

  const lines = content.split('\n').filter((line) => line.length > 0);
  const students = lines.slice(1);
  let output = `Number of students: ${students.length}`;

  const fields = {};
  for (const student of students) {
    const data = student.split(',');
    const firstName = data[0];
    const field = data[3];
    fields[field].push(firstName);
  }

  for (const [field, list] of Object.entries(fields)) {
    output += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
  }
  return output;
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const baseText = 'This is the list of our students\n';
  const studentData = parseStudents(dbPath);
  res.send(`${baseText}${studentData}`);
});

app.listen(port);
module.exports = app;
