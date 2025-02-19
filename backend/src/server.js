const express = require('express');
const cors = require('cors');
const {
  notFound,
  errorHandler,
} = require('./middlewares/error_handler_middleware');
const itemsRouter = require('./api/v1/items/items_router');
const usersRouter = require('./api/v1/users/users_router');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'App is listening...' });
});

app.use('/items', itemsRouter);
app.use('/users', usersRouter);

app.use(notFound);
app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
  console.error(`unhandled rejection: ${JSON.stringify(reason)}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err.message}`);
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
