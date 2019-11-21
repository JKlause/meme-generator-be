const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');

app.use(require('cookie-parser')());
app.use(require('cors')());
app.use(express.json());


app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/meme', ensureAuth, require('./routes/meme'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
