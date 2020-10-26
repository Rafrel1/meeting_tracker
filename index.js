var express = require('express');
var app = express();
var fs = require('fs');

app.get('/contact', function (req, res) {
  fs.readFile(__dirname + '/data/contact_list.json', 'utf8', (err, data) => {
    console.log(data);
    res.end(data);
  });
});

app.put('/contact', (req, res) => {
  /**
   * Read the contact scheme and check if the passed data match the scheme.
   * Unexpected fields will be cut.
   */
  var newContact = {};
  fs.readFile(__dirname + '/data/contact_scheme.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    for (var key in data) {
      if (req.query[key]) {
        newContact[key] = req.query[key];
      }
    }
  });

  /**
   * Read the contact list and append the new contact.
   */
  fs.readFile(__dirname + '/data/contact_list.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.push(newContact);
    console.log(data);
    fs.writeFile(__dirname + '/data/contact_list.json', JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('saved');
    });
  });
  res.end();
});

var server = app.listen(8081, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Corona tracker is listening to at http://%s:%s', host, port);
});