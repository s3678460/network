const express = require("express");
const router = express.Router();
const fs = require('fs');
const lineReader = require('line-reader');
const readline = require('readline');
const mailer = require('../api/misc/mailer');

// Load Validation
const validateSubmitInput = require('../../validation/submit');

// Load Model
const Contact = require("../../models/Contact");

//@route GET api/contacts
//GET all contacts
//access public
router.get("/", (req, res) => {
  const errors = {};

  Contact.find()
    .then(contacts => {
      if (contacts.length === 0) {
        errors.nocontact = 'There is no contact'
        res.status(404).json(errors)
      }

      res.json(contacts)
    })
    .catch(err => res.status(500).json({ msg: 'Server Error' }))
});

//@route POST api/contacts/submit
//POST new contact
//access public
router.post("/submit", (req, res) => {

  const { errors, isValid } = validateSubmitInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { port1, port2 } = req.body;
    if (checkPortAvailable(port1) == true) {
    errors.port1 = "Port number not available"
    return res.status(400).json(errors);

  } else if (checkPortAvailable(port2) == true) {
    errors.port2 = "Port number not available"
    return res.status(400).json(errors)

  } else {
    const newPorts = req.body.port1 + "\n" + req.body.port2 + "\n";
    fs.appendFile('files/file.txt', newPorts, function (err) {
      if (err) {
        throw err;
      }

    })

    const newContact = new Contact({
      studentNumber: req.body.studentNumber,
      port1: req.body.port1,
      port2: req.body.port2
    });
    newContact
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));

    const html = `Network Programming - Port Selection
    <br/>
    <br/>
    Student Number: ${newContact.studentNumber}
    <br/>
    Port 1: ${newContact.port1}
    <br/>
    Port2 : ${newContact.port2}
    `

    mailer.sendEmail(
      '"Network Programming" <huynhcongminhs3678460@gmail.com>',
      "minhhuynhrmit@gmail.com",
      "Network Programming - Port Selection",
      html
    
    
    )
  }


});

function checkPortAvailable(portNumber) {
  var data = fs.readFileSync('files/file.txt', 'utf8')
  var portList = data.split('\n');
  var result = false;
  portList.forEach(port => {
    if (port == portNumber) {
      result = true;
    }
  })
  return result;
}

module.exports = router;