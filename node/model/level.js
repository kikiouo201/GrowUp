const { createRouter } = require('../wrapper/Exsocket');


const router = createRouter();


function level(app){
   

    return {
         showLevel(child_id,callback){
            const jsonObject = {
               child_id: child_id,
            };
            router.on('show_level',jsonObject,callback);
            app.use(router);
        },
        alterLevel(child_id,level_name,callback){
            const jsonObject = {
               child_id: child_id,
               level_name:level_name,
               ispass:1,
            };
            router.on('alter_level',jsonObject,callback);
            app.use(router);
        }


    };
}




module.exports=level;