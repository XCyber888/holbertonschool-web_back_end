const http = require('http');
const fs = require('fs');

const PORT = 1245;
const DB_FILE = process.argv[2];

// Tələbə məlumatlarını string formatında yığmaq üçün köməkçi funksiya
function getStudentsDescription(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, content) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const trimmedContent = content.trim();
        resolve('Number of students: 0');
        return;
      }

      const lines = trimmedContent.split(/\r?\n/).filter((line) => line.length > 0);
      const students = lines.slice(1);
      
      let output = `Number of students: ${students.length}`;

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
        output += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
      }

      resolve(output);
    });
  });
}

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const studentsData = await getStudentsDescription(DB_FILE);
      res.end(studentsData);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(PORT);

module.exports = app;
