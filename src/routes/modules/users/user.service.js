const { join } = require("path");
const { DataSource } = require("../../../lib/dataSource.js");
const {UserClass} = require("./entity/userEntity.js");
const {hashPasword, verifyPassword} = require("../../../lib/bcrypt.js");
const {ResData} = require("../../../lib/resData.js");
const {getToken} = require("../../../lib/jwt.js")



const userPath = join(__dirname, "../../../../database/users.json")
const userSource = new DataSource(userPath);


class UserService{
    async getAllUsers(){
        return {
            data: await userSource.read()
        }
    }
    async createUser(dto){

        const users = userSource.read();
        const findUserPhone = users.find(e => {
            return e.phone == dto.phone
        })
        if(findUserPhone){
            return new ResData("This phone already exist", 400)
        }

        const hashed = await hashPasword(dto.password);
        const newUser = new UserClass(dto.phone, hashed, dto.fullName);
        users.push(newUser);
        await userSource.write(users)
        return new ResData("User created", 201, newUser);

    }
    async login(dto){
        const users = userSource.read();
        const foundUserByPhone = users.find(e => {
            return e.phone == dto.phone
        })
        if(!foundUserByPhone){
            return new ResData("User not found", 400, foundUserByPhone)
        }
        const verify = await verifyPassword(dto.password, foundUserByPhone.password);
        if(verify){
            const token = getToken(foundUserByPhone);
            return new ResData("user found", 200, {foundUserByPhone, token})
        }else{
            return new ResData("Wrong passeord", 400)
        }
    }
}

module.exports = {UserService};