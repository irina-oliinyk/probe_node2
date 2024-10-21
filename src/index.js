import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'I love you!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`);
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });
