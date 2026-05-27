const fs = require('fs');

function countStudents(path) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = fs.readFileSync(path, 'utf-8');
    // Həm \r\n, həm də \n simvollarını təmizləyərək sətirlərə bölürük
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const studentLines = lines.slice(1);
    console.log(`Number of students: ${studentLines.length}`);

    // İxtisasların ardıcıllığını tam qorumaq üçün massiv və obyekt istifadə edirik
    const fieldsOrder = [];
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');
      const firstName = studentData[0].trim();
      const field = studentData[studentData.length - 1].trim();

        fields[field] = [];
        fieldsOrder.push(field); // İlk görünən ixtisası sıraya əlavə edirik
      }
      fields[field].push(firstName);
    }

    for (const field of fieldsOrder) {
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    }

  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
