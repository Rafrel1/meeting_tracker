const express = require('express');
const app = express();
const contact = require('./routes/contact');
const meeting = require('./routes/meeting');

app.use('/contact', contact);
app.use('/meeting', meeting);

const server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Corona tracker is listening to at http://%s:%s', host, port);
});