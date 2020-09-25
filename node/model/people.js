const { createRouter } = require('../../wrapper/Exsocket');


const router = createRouter();


function people(app){
   

    return {
         showChild(child_key,callback){
            const jsonObject = {
               child_key: child_key,
            };
            router.on('show_child_key',jsonObject,callback);
            app.use(router);
        },
        showChildPosition(child_id,callback){
            const jsonObject = {
               child_id: child_id,
            };
            router.on('show_child_position',jsonObject,callback);
            app.use(router);
        },  
        alterChildPosition(child_id,longitude,latitude,callback){
            const jsonObject = {
               child_id: child_id,
               longitude: longitude,
               latitude: latitude,
            };
            router.on('alter_child_position',jsonObject,callback);
            app.use(router);
        },
        showChildGoodBabyTotalValue(child_id,callback){
            const jsonObject = {
                child_id: child_id,
            };
            router.on('show_child_good_baby_total_value',jsonObject,callback);
            app.use(router);
        },   
        showChildGoodBabyDayValue(child_id,callback){
            const jsonObject = {
                child_id: child_id,
            };
        
            router.on('show_child_good_baby_day_value',jsonObject,callback);
            app.use(router);
        },
        AddChildGoodBabyValue(child_id,add_value,type,callback){
            let today = new Date();
            const jsonObject = {
                child_id: child_id,
                add_value: add_value,
                type: type,
                date: formatDate(today),
            };
        
            router.on('add_child_good_baby_value',jsonObject,callback);
            app.use(router);
        },
    };
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}




module.exports=people;