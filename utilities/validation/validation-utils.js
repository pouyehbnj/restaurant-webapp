//The class for user input validation

class Validator {
    // Validating the format of the UK postcode 

    static isValidUKPostcode(postcode) {
        postcode.replace(/%20/g, ' ');
        const regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/i;
        // const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        return regex.test(postcode.replace(/\s+/g, ''));
    }
}

module.exports = Validator;
