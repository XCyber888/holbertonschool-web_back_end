const fs = require('fs');

function countStudents(path) {
  try {
    // Faylı oxuyuruq, əgər fayl yoxdursa birbaşa catch blokuna düşəcək
    const content = fs.readFileSync(path, 'utf8').trim();
    
      console.log('Number of students: 0');
      return;
    }

    // \r?\n regex-i sayəsində həm Linux (\n), həm də Windows (\r\n) sətir sonluqları tam təmizlənir
    const lines = content.split(/\r?\n/).filter((line) => line.length > 0);
    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);

    const fields = {};
    for (const student of students) {
      const data = student.split(',');
      const firstName = data[0].trim();
      const field = data[3].trim(); // trim() gizli boşluqları tamamilə silir

        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    for (const [field, list] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
    }
  } catch (error) {
    // Test sisteminin gözlədiyi dəqiq xəta fırlatma mexanizmi
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
