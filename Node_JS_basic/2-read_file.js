const fs = require('fs');

function countStudents(path) {
  try {
    // Faylı sinxron şəkildə oxuyuruq (utf-8 formatında)
    const data = fs.readFileSync(path, 'utf-8');
    
    // Sətirlərə bölürük və həm başlanğıcdakı, həm də sondakı boşluqları təmizləyirik
    const lines = data.trim().split('\n');
    
    // Əgər fayl tamamilə boşdursa və ya yalnız başlıqdan ibarətdirsə
    if (lines.length <= 1 || lines[0] === '') {
      console.log('Number of students: 0');
      return;
    }

    // Başlıq sətrini çıxarırıq (firstname, lastname, age, field)
    const headers = lines[0].split(',');
    const studentLines = lines.slice(1).filter((line) => line.trim() !== '');

    console.log(`Number of students: ${studentLines.length}`);

    // İxtisasları qruplaşdırmaq üçün obyekt yaradırıq
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');
      if (studentData.length < headers.length) continue; // Yarımçıq sətirləri keçirik

      const firstName = studentData[0].trim();
      const field = studentData[studentData.length - 1].trim();

        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    // Hər bir ixtisas üzrə nəticələri çap edirik
    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }

  } catch (error) {
    // Fayl tapılmadıqda və ya oxunmadıqda xəta fırladırıq
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
