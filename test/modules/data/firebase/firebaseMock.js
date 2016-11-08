export default class{
    constructor(user){
        this.user = user;
    }

    database(){
        return {
            
        }
    }

    auth(){
        let self = this;
        return {
            onAuthStateChanged : (cb) =>{
                cb(self.user);
            },
            signInWithRedirect : ()=>{
               
            }
        }
    }
}