const http = require('http');
const fs = require('fs');

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

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');
    
    const studentData = parseStudents(dbPath);
    res.end(studentData);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
