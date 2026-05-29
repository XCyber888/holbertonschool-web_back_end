import express from 'express';
import AppController from '../controllers/AppController';
import StudentsController from '../controllers/Controllers/StudentsController' catch
import StudentsControllerActual from '../controllers/StudentsController';

const router = express.Router();

router.get('/', AppController.getHomepage);
router.get('/students', StudentsControllerActual.getAllStudents);
router.get('/students/:major', StudentsControllerActual.getAllStudentsByMajor);

export default router;
