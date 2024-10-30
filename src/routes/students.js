import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:studentId', ctrlWrapper(getStudentByIdController));

router.post('/', ctrlWrapper(createStudentController));

router.delete('/:studentId', ctrlWrapper(deleteStudentController));

router.put('/:studentId', ctrlWrapper(upsertStudentController));

router.patch('/:studentId', ctrlWrapper(patchStudentController));

export default router;
