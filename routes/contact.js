const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile(__dirname + '/../data/contact_list.json', 'utf8', (err, data) => {
    console.log(data);
    res.status(200).end(data);
  });
});

router.put('/', (req, res) => {
  /**
   * Read the contact scheme and check if the passed data match the scheme.
   * Unexpected fields will be cut.
   */
  let newContact = {'id': 0};
  fs.readFile(__dirname + '/../data/contact_scheme.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    for (let key in data) {
      if (req.query[key]) {
        newContact[key] = req.query[key];
      }
    }
  });

  /**
   * Read the contact list and append the new contact.
   */
  fs.readFile(__dirname + '/../data/contact_list.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);

    // Increment mechanism for dataset ID. 
    for (let i = 0; data.length > i; i++) {
      if (newContact.id <= data[i].id) {
        newContact.id = data[i].id +1;
      }
    }

    data.push(newContact);
    fs.writeFile(__dirname + '/../data/contact_list.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  });
  res.status(200).end();
});

module.exports = router;