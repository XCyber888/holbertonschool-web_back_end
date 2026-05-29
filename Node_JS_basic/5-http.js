const http = require('http');
const fs = require('fs');

const DB_FILE = process.argv[2];

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    
    // Faylı asinxron oxuyub cavaba əlavə edirik
    fs.readFile(DB_FILE, 'utf8', (err, content) => {
      if (err) {
        res.end('Cannot load the database');
        return;
      }
      
      const trimmed = content.trim();
        res.write('Number of students: 0');
        res.end();
        return;
      }

      const lines = trimmed.split(/\r?\n/).filter((line) => line.length > 0);
      const students = lines.slice(1);
      res.write(`Number of students: ${students.length}`);

      const fields = {};
      for (const student of students) {
        const data = student.split(',');
        const firstName = data[0].trim();
        const field = data[3].trim();

          fields[field] = [];
        }
        fields[field].push(firstName);
      }

      for (const [field, list] of Object.entries(fields)) {
        res.write(`\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
