const uuid = require("uuid");

class UserClass{
    constructor(fullName, login, password){
        this.id = uuid.v4();
        this.full_name = fullName;
        this.login = login;
        this.password = password;
    }
}

module.exports = {UserClass};