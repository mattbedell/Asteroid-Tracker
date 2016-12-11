const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));

//app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`SERVER LISTENING ON ${PORT}`))
