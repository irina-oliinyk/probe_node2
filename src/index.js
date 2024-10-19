import express from 'express';

const app = express();

const PORT = 3000;

// app.get('/', (req, res) => {
//   res.json({
//     message: 'I love you!',
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// app.use((req, res, next) => {
//   console.log(`Time ${new Date().toLocaleString}`);
//   next();
// });
