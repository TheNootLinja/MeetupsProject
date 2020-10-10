// String Validations

// Validation function to check and make sure the
// string it is passed isn't empty
export function notEmpty(val) {
    return val.trim().length > 0;
}

// Email Validations

export function isValidEmail(val) {
    return new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(val)
}

// Password Validations

