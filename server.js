const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`SERVER LISTENING ON ${PORT}`))
