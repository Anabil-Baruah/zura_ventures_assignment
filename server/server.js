const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Register = require('./routers/Register');
const Project = require('./routers/Projects');
const Configurations = require('./routers/Configurations');
const cors = require('cors');
const port = process.env.PORT || 8000;
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// Mount the router on a specific path
app.use('/api/register', Register);
app.use('/api/project', Project);
app.use('/api/project/config', Configurations)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});