const { createRouter } = require('../wrapper/Exsocket');


const router = createRouter();


function people(app){
   

    return {
         showChild(child_key,callback){
            const jsonObject = {
               child_key: child_key,
            };
            router.on('show_child_key',jsonObject,callback);
            app.use(router);
        }
    };
}




module.exports=people;