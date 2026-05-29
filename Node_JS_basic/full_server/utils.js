import fs from 'fs';

export function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);
      const fields = {};

      for (const student of students) {
        const parts = student.split(',');
        if (parts.length < 4) continue;
        const firstname = parts[0].trim();
        const field = parts[3].trim();

          fields[field] = [];
        }
        fields[field].push(firstname);
      }
      resolve(fields);
    });
  });
}
