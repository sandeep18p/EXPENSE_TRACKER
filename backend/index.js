const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);

// Sync Sequelize models and start server
(async () => {
  try {
    await sequelize.sync(); // Sync models with the database
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
