const express = require("express");
const router = express.Router();
const fs = require('fs');
const lineReader = require('line-reader');
const readline = require('readline');

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
  
  lineReader.eachLine('files/file.txt', function(line){
    if(line.includes(req.body.port1)){
      errors.port1 = "Port number is existed"
      return res.status(400).json(errors);

    }
    if(line.includes(req.body.port2)){
      errors.port2 = "Port number is existed"
      return res.status(400).json(errors);

    }
    else{
      fs.appendFile('files/file.txt',req.body.port1+"\n"+req.body.port2+"\n", function(err){
        if(err){
          console.log('errors')
        }
        else {
          console.log('Saved')
          const newContact = new Contact({
            studentNumber: req.body.studentNumber,
            port1: req.body.port1,
            port2: req.body.port2
          });
          newContact
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }
      })
    }
  })

  

  







});

module.exports = router;