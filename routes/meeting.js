const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile(__dirname + '/../data/meeting_list.json', 'utf8', (err, data) => {
    console.log(data);
    res.status(200).end(data);
  });
});

router.put('/', (req, res) => {
  /**
   * Read the meeting scheme and check if the passed data match the scheme.
   * Unexpected fields will be cut.
   */
  let newMeeting = {'id': 0};
  fs.readFile(__dirname + '/../data/meeting_scheme.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    for (let key in data) {
      if (req.query[key]) {
        newMeeting[key] = req.query[key];
      }
    }
  });

  /**
   * Read the meeting list and append the new meeting.
   */
  fs.readFile(__dirname + '/../data/meeting_list.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);

    // Increment mechanism for dataset ID. 
    for (let i = 0; data.length > i; i++) {
      if (newMeeting.id <= data[i].id) {
        newMeeting.id = data[i].id +1;
      }
    }

    data.push(newMeeting);
    fs.writeFile(__dirname + '/../data/meeting_list.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  });
  res.status(200).end();
});

module.exports = router;