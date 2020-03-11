const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Create Contact Schema

const ContactSchema = new Schema({
    studentNumber:{
        type: String,
        require:true
    },
    port1:{
        type:String,
        required:true
    },
    port2:{
        type:String,
        required:true
        
    },
    
});

module.exports = Contact = mongoose.model('contacts',ContactSchema);