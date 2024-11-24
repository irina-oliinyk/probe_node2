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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validator/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController), checkRoles(ROLES.TEACHER));

router.get('/:studentId', isValidId,checkRoles(ROLES.TEACHER, ROLES.PARENT),, ctrlWrapper(getStudentByIdController));

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:studentId',checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteStudentController));

router.put(
  '/:studentId',
  isValidId,
  validateBody(createStudentSchema), checkRoles(ROLES.TEACHER),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  validateBody(updateStudentSchema),checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(patchStudentController),
);

router.use(authenticate);

router.get('/', ctrlWrapper(getStudentsController));

export default router;
