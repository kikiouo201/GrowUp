const Question = require('./question');
const People = require('./people');
const exsocket= require('../../wrapper/Exsocket');

const app=exsocket();
console.log("api start");

const Api = {
    People: People(app),
    Question: Question(app),
}

module.exports=Api;