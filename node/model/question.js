const fs = require('fs');
const { createRouter } = require('../wrapper/Exsocket');
const router = createRouter();

const FAVORITE_QUESTION = 'favorite_question';

const ADD_QA = 'add_qa';
const SHOW_PAST_QUESTION = 'show_past_question';
const DELETE_PAST_QUESTION = 'delete_past_question';

const ADD_BOOK = 'add_book';
const SHOW_BOOK = 'show_book';
const ALTER_BOOK = 'alter_book';
const DELETE_BOOK = 'delete_book';

const ADD_BOOK_CONTENT = 'add_book_content';
const ALTER_BOOK_CONTENT = 'alter_book_content';
const SHOW_BOOK_CONTENT = 'show_book_content';
const DELETE_BOOK_CONTENT = 'delete_book_content';
const ADD_QUIZ = 'add_quiz';
const SHOW_QUIZ_CONTENT = 'show_quiz_content';
const SHOW_QUIZ_RECORD = 'show_quiz_record';
const ADD_QUIZ_RECORD = 'add_quiz_record';

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function question(app){

    return{
         addQuiz(book_id,callback){
            const jsonObject = {
                book_id: book_id,
            };
            
            router.on(ADD_QUIZ,jsonObject,callback);
            app.use(router);
        },
        
         addQuizRecord(child_id,name,amount,correct_amount,quiz,callback){
            const jsonObject = {
                child_id: child_id,
                total_time: 10,
                name: name,
                amount: amount,
                correct_amount: correct_amount,
                quizs: quiz,
            };
            console.log("now addQR place!")
            router.on(ADD_QUIZ_RECORD,jsonObject,callback);
            app.use(router);
        },
        
       
         showQuizContent(quiz_record_id,callback){
            const jsonObject = {
                quiz_record_id: quiz_record_id,
            };
            router.on(SHOW_QUIZ_CONTENT,jsonObject,callback);
            app.use(router);
        },
        
       
         showQuizRecord(child_id,callback){
            const jsonObject = {
                child_id: child_id,
            };
            router.on(SHOW_QUIZ_RECORD,jsonObject,callback);
            app.use(router);
        },
        
        
         addQa(child_id, question_text, answer, question_img,book_name,book_img,book_introduction, category,callback){
             let question_url=null;
             if(question_img.match('.jpg') || question_img.match('.png')){
                question_url = base64_encode(question_img);
                //question_url = question_url.toString();
               // console.log('url='+question_url);
             }
             let book_url=null;
             if(book_img.match('.jpg') || book_img.match('.png')){
                book_url = base64_encode(book_img);
                //question_url = question_url.toString();
               // console.log('url='+question_url);
             }
            const jsonObject = {
                child_id: child_id,
                question_text: question_text, 
                answer: answer,
                base64str : question_url ,
                category: category,
                book_name: book_name,
                book_img: book_url,
                book_introduction: book_introduction,
                recommend: "小孩",
            };
            
            router.on(ADD_QA,jsonObject,callback);
            app.use(router);
        },
        
        
         deletePastQuestion(book_content_id, callback){
            const jsonObject = {
                id: book_content_id,
            };
            
            router.on(DELETE_PAST_QUESTION,jsonObject,callback);
            app.use(router);
        },
        
         showPastQuestion(child_id, callback){
            const jsonObject = {
                child_id: child_id,
            };
            
            router.on(SHOW_PAST_QUESTION,jsonObject,callback);
            app.use(router);
        },
        
         addBook(child_id, name, category, callback){
            const jsonObject = {
                child_id: child_id,
                name: name,
                category:category,
            };
            
            router.on(ADD_BOOK,jsonObject,callback);
            app.use(router);
        },
        
         deleteBook(book_id, callback){
            const jsonObject = {
                id: book_id,
            };
            
            router.on(DELETE_BOOK,jsonObject,callback);
            app.use(router);
        },
        
         showBook(child_id, callback){
            const jsonObject = {
                child_id: child_id,
            };
            
            router.on(SHOW_BOOK,jsonObject,callback);
            app.use(router);
        },
        
         alterBook(book_id, name, category, callback){
            const jsonObject = {
                id: book_id,
            };
            if(name != ''){
                jsonObject.name = name;
            }
            if(category != ''){
                jsonObject.category = category;
            }
            
            router.on(ALTER_BOOK,jsonObject,callback);
            app.use(router);
        },
        showPictureBook(child_id, callback){
            const jsonObject = {
                child_id: child_id,
            };
            
            router.on('show_picture_book',jsonObject,callback);
            app.use(router);
        },
        
        
         addBookContent(book_id,qa_id,callback){
        
            const jsonObject = {
                book_id: book_id,
                qa_id: qa_id,
            };
            router.on(ADD_BOOK_CONTENT,jsonObject,callback);
            app.use(router);
        
        },
        
         deleteBookContent(book_content_id, callback){
        
            const jsonObject = {
                id: book_content_id,
            };
            router.on(DELETE_BOOK_CONTENT,jsonObject,callback);
            app.use(router);
        },
        
        
        
         showBookContent(book_id,callback){
        
            const jsonObject = {
                id: book_id,
            };
            router.on(SHOW_BOOK_CONTENT,jsonObject,callback);
            app.use(router);
        },
        
         alterBookContent(id, book_id, qa_id, callback){
        
            const jsonObject = {
                id: id,
            };
        
            if(book_id != 0){
                jsonObject.book_id = book_id;
            }
            if(qa_id != 0){
                jsonObject.qa_id = qa_id;
            }
            router.on(ALTER_BOOK_CONTENT,jsonObject,callback);
            app.use(router);
        },
        
    };
}



module.exports=question;