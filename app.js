// * ===== 사용할 패키지 호출 및 mysql 셋팅 ===== * //
const express = require('express');
const app = express();
const port = 8080;
const mysql = require('mysql2/promise');
let connection;
const mysqlConnectionSet = (async()=>{
    try{
        // db config set
        connection = await mysql.createConnection({
            host: '34.64.161.186',
            user: 'root',
            password: '1234',
            database: 'juyeon'
        });

        // db connect
        await connection.connect();

    } catch(error){
        console.log(error)
    }
})()

// * ===== html 렌더링 ===== * //
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// * ===== url router ===== * //
app.get('/',(req, res)=>{
    res.send('hello world')
});

app.get('/index',(req, res)=>{
    //res.render('C:\Users\juyeo\Desktop\2022\project\jy\index.html')
    res.render('index')
});

app.get('/insert', async (req, res) => {
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


app.get('/receive_python', async (req, res) => {

    const data = req.query.data;
    console.log(data);
    const datas = data.split(',');
    console.log(datas);
    try {
        await connection.query(`insert into student(teacher_Id, std_no, day1_pt, day2_pt, day3_pt, day4_pt, day5_pt, total, security_point) values('${datas[0]}','${datas[1]}', '${datas[2]}','${datas[3]}','${datas[4]}','${datas[5]}', '${datas[6]}','${datas[7]}', ${datas[8]})`)
        res.send("받았습니다.");
    } catch(error){
        res.send('실패했습니다.')
    }
})

app.get('/student_point_table',(req, res)=>{
    res.render('student_point_table')
});

app.get('/select_student',async(req, res)=>{
        const chk_id = req.query.t_id;
        const chk_pw = req.query.pw;
        //r = await connection.query('select * from student');
        console.log(chk_id);
        console.log(chk_pw);
        var sql = "select * from student where teacher_Id = " + String(chk_id);
        //const r = await connection.query('select pw from teacher where  ')
        try {
            const rows = await connection.query(sql);
            console.log(rows);
            await res.render('student_list',{async: true});
            
        } catch(error){
            res.send('false')
        }
});

// * ===== app listen ===== * //
const server = app.listen(port,()=> {
    console.log('서버가 실행되었습니다.');
})

// * ===== app 종료  ===== * //
const exitFunction = async () => {
    await connection.end();
    server.close()
    process.exit()
}

//do something when app is closing
process.on('exit', async()=>{
    console.log('process.close')
    await exitFunction()
})
//catches ctrl+c event
process.on('SIGINT', async()=>{
    console.log('process.SIGINT');
    await exitFunction()
})