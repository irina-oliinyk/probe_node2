import {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
} from '../services/students.js';
import { createStudent } from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { parseFilterParams } from '../utils/parseFilterParams.js';

// 1. Імпортуємо функцію з бібліотеки
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  // Добавления для фильтрации
  const filter = parseFilterParams(req.query);

  // тут тоже + filter
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: ' Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);
  // Відповідь, якщо контакт не знайдено
  // Створення помилки
  if (!student) {
    // 2. Створюємо та налаштовуємо помилку
    throw createHttpError(404, 'Student not found');
  }

  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully create a student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: ' Successfully upserted a student!',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a student`,
    data: result.student,
  });
};
