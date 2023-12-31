const { ResData } = require("../../../lib/resData.js");
const {userchema, loginSchema} = require("./schema/user_schema.js");

class UserController{
    #service
    constructor(service){
        this.#service = service;
    }
    
    async getAllUsers(){
        try{
            return await this.#service.getAllUsers()
        }catch(err){
            console.log(err);
        }
    }
    async createUser(req,res){
        try{
            const dto = req.body
    
            const joiResult = userchema.validate(dto)
            
            const phone = dto.phone
            if(!(phone.toString().length == 9)){
                console.log("wrong phone");
                return new ResData("Phone length must be equal 9", 400)
            }
            else if(joiResult.error){
                console.log("joiResult error", joiResult.error);
                return new ResData(joiResult.error.details, 400, null)
            }
            else{
                console.log("length", phone, phone.toString().length);
                const data = await this.#service.createUser(dto);
                return data;
            }

        }catch(err){
            return new ResData(err.message || "Something went wrong", err.statusCode || 400, null, err)
        }
    }

    async login(req,res){
        const dto = req.body;
        const checkLogin = loginSchema.validate(dto);
        if(checkLogin.error){
            return new ResData(checkLogin.error?.message, 400);
        }
        const data = this.#service.login(dto);
        return data;

    }
}

module.exports = {UserController};