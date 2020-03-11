const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubmitInput(data) {
    let errors = {};

    //Convert all the null value or undifined value into null string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    
    
    if (!Validator.isNumeric(data.studentNumber)){
        errors.studentNumber = 'Invalid student number';
    }

    if (Validator.isEmpty(data.studentNumber)){
        errors.studentNumber = 'Student number must not be empty';
    }

    if (!Validator.isLength(data.studentNumber,{max:7})){
        errors.studentNumber = 'Student number must be under 7 characters'
    }

   
    if(!Validator.isInt(data.port1,{gt: 60999, lt: 62000})){
        errors.port1="Port number must be between 61000 and 61999"
    }

    if (Validator.isEmpty(data.port1)){
        errors.port1 = 'Port number must not be empty';
    }


    if(!Validator.isInt(data.port2,{gt: 60999, lt: 62000})){
        errors.port2="Port number must be between 61000 and 61999"
    }
    if (Validator.matches(data.port2,data.port1)){
        errors.port2 = 'Port 2 must be different from Port 1'
    }
    if (Validator.isEmpty(data.port2)){
        errors.port2 = 'Port number must not be empty';
    }

   


    // if (!Validator.isEmail(data.email)){
    //     errors.email = 'Email của bạn không hợp lệ';
    // }
    // if (Validator.isEmpty(data.email)){
    //     errors.email = 'Bạn chưa điền Email của bạn';
    // }

    // if (!Validator.isNumeric(data.phone)){
    //     errors.phone = 'Số điện thoại của bạn k hợp lệ';
    // }
    // if (Validator.isEmpty(data.phone)){
    //     errors.phone = 'Bạn chưa điền số điện thoại của bạn';
    // }

  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}