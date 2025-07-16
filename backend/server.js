// server.js

const express        = require('express');
const cors           = require('cors');
const registroRoutes = require('./routes/registro');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', registroRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
