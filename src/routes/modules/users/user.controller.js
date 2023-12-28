class UserController{
    #service
    constructor(service){
        this.#service = service;
    }
    
    getAllUsers(){
        console.log("usermodule");
        try{
            return this.#service.getAllUsers()
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {UserController};