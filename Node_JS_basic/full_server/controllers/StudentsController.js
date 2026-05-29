import { readDatabase } from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv[2];
    readDatabase(dbPath)
      .then((fields) => {
        let output = 'This is the list of our students';
        const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        
        for (const field of sortedFields) {
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
        response.status(200).send(output);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    const dbPath = process.argv[2];
    readDatabase(dbPath)
      .then((fields) => {
        const list = fields[major] ? fields[major].join(', ') : '';
        response.status(200).send(`List: ${list}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}
