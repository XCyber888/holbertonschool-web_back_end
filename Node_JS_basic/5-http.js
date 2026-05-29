const http = require('http');
const fs = require('fs');

const dbPath = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(Error('Cannot load the database'));

      // Həm \n, həm də Windows mühitindən gələ biləcək \r\n simvollarını tam təmizləyirik
      const lines = data.split(/\r?\n/).filter((l) => l.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const fields = {};
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        if (parts.length < 4) continue;
        
        const field = parts[3].trim();
        const firstname = parts[0].trim();

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

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    try {
      const data = await countStudents(dbPath);
      // Başlıq mətni ilə datanı tam birləşdirib tək səfərdə res.end ilə göndəririk
      res.end(`This is the list of our students\n${data}`);
    } catch (err) {
      res.end(`This is the list of our students\n${err.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
