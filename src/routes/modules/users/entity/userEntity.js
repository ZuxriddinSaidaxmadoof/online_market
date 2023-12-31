const uuid = require("uuid");

class UserClass{
    constructor(phone, password, fullName){
        this.id = uuid.v4();
        this.phone = phone;
        this.password = password;
        this.full_name = fullName;
        this.role = "user"
    }
}

module.exports = {UserClass};
