const express = require('express');
const mysql = require("mysql2/promise");
// const mysql = require("mysql2/promise");
const app = express();
const port = 8080;




// * ===== html 렌더링 ===== * //
app.engine('html', require('ejs').renderFile)

app.set('view engine', 'html')
app.get('/',(req, res)=>{
    res.send('hello world')
});

app.get('/index',(req, res)=>{
    //res.render('C:\Users\juyeo\Desktop\2022\project\jy\index.html')
    res.render('index')
});

app.get('/insert', async (req, res) => {

    // * ===== DB 연결 ===== * //
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
            host: '34.64.161.186',
            user: 'root',
            password: '1234',
            database: 'juyeon'
        });


    try{
        await connection.connect();
    } catch(error){
        console.log(error)
    }

    const teacher_Id = req.query.teacher_Id;
    const class_no = req.query.class_no;
    let pw = req.query.pw;
    try {
        await connection.query(`insert into teacher(teacher_Id, class_no, pw) values('${teacher_Id}',${class_no}, '${pw}')`)
        res.send('true')
    }catch(error){
        res.send('false')
    }
})

app.get('/createclass',(req, res)=>{
    res.render('createclass')
});

const server = app.listen(port,()=> {
    console.log('서버가 실행되었습니다.');
})




// * ===== socket 통신 ===== * //


app.get('/receive_python', async (req, res) => {

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
            host: '34.64.161.186',
            user: 'root',
            password: '1234',
            database: 'juyeon'
        });


    try{
        await connection.connect();
    } catch(error){
        console.log(error)
    }

    const test1 = req.query.data;
    console.log(test1);
    await connection.query(`insert into student(teacher_Id, std_no, day1_pt, day2_pt,day3_pt, day4_pt, day5_pt, total, security_point) values('123','20202', 'pass','pass','pass','pass','pass', 'pass' , 100)`)
    res.send("받았습니다.");
   
})