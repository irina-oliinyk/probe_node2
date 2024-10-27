import { getAllStudents, getStudentById } from '../services/students.js';

// 1. Імпортуємо функцію з бібліотеки
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();

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
