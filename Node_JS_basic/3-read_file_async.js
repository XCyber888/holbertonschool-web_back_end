const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const trimmed = content.trim();
      if (!trimmed) {
        console.log('Number of students: 0');
        resolve();
        return;
      }
      const lines = trimmed.split('\n').filter((line) => line.length > 0);
      const students = lines.slice(1);
      console.log(`Number of students: ${students.length}`);

      const fields = {};
      for (const student of students) {
        const data = student.split(',');
        const firstName = data[0];
        const field = data[3];
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }

      for (const [field, list] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      resolve();
    });
  });
}
module.exports = countStudents;
