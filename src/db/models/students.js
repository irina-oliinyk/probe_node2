import { Schema, model } from 'mongoose';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    gender: {
      type: String,
      require: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StudentsCollection = model('students', studentsSchema);
