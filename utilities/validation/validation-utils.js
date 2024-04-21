class Validator {
    static isValidUKPostcode(postcode) {
        postcode.replace(/%20/g, ' ');
        const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        return regex.test(postcode.replace(/\s+/g, ''));
    }
}

module.exports = Validator;