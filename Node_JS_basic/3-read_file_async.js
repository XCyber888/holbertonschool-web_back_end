const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Faylı asinxron şəkildə oxuyuruq
    fs.readFile(path, 'utf8', (error, content) => {
      if (error) {
        // Fayl tapılmadıqda və ya oxunmadıqda Promise-i reject edirik
        reject(new Error('Cannot load the database'));
        return;
      }

      // Məlumatı təmizləyirik və sətirlərə bölürük
      const trimmedContent = content.trim();
        console.log('Number of students: 0');
        resolve();
        return;
      }

      // \r?\n ilə Windows/Linux sətir sonluqlarını təmizləyirik
      const lines = trimmedContent.split(/\r?\n/).filter((line) => line.length > 0);
      const students = lines.slice(1);
      console.log(`Number of students: ${students.length}`);

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
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }

      // Hər şey uğurlu bitdikdə Promise-i tamamlayırıq
      resolve();
    });
  });
}

module.exports = countStudents;
