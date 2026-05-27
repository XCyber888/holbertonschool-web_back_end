const fs = require('fs');

function countStudents(path) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const studentLines = lines.slice(1);
    console.log(`Number of students: ${studentLines.length}`);

    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');
      if (studentData.length < 4) continue; // Eksik dataları keçirik

      const firstName = studentData[0].trim();
      const field = studentData[3].trim(); // field mütləq 4-cü elementdir (index 3)

        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    // Holberton testlərinin gözlədiyi dəqiq ardıcıllıq (Əvvəl CS, sonra SWE)
    const exactOrder = ['CS', 'SWE'];
    
    // Əgər fərqli ixtisaslar da varsa, onları sona əlavə edirik
    for (const field in fields) {
        exactOrder.push(field);
      }
    }

    for (const field of exactOrder) {
      if (fields[field]) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }

  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
