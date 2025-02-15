const express = require('express');
const cors = require('cors');
const itemsRouter = require('./api/v1/items/items_router');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'App is listening...' });
});

app.use('/items', itemsRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
