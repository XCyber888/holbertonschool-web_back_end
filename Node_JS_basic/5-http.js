const http = require('http');
const fs = require('fs');

const dbPath = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(Error('Cannot load the database'));

      // Boş sətirləri təmizləyirik
      const lines = data.split('\n').filter((l) => l.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const fields = {};
      // Başlığı ötürərək tələbələri dövr edirik
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        const field = parts[3];
        const firstname = parts[0];

        fields[field].push(firstname);
      }

      let output = `Number of students: ${lines.length - 1}`;
      // Holberton-un mütləq istədiyi əlifba sırası sıralaması (.sort())
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
    res.write('This is the list of our students\n');

    try {
      // Mütləq asinxron gözləmə (await) olmalıdır
      const data = await countStudents(dbPath);
      res.end(data);
    } catch (err) {
      res.end(err.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
