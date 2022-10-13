// * ===== 사용할 패키지 호출 및 mysql 셋팅 ===== * //
const express = require('express');
const app = express();
const port = 8080;
const mysql = require('mysql2/promise');
let connection;

const teacher = [{
    teacher_Id: "1",
    class_no: "1",
    pw: "1",
}, {
    teacher_Id: "2",
    class_no: "2",
    pw: "2",
}]
const student = [{
    teacher_Id:'1',
    std_no:'11',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
}, {
    teacher_Id:'1',
    std_no:'12',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
},{
    teacher_Id:'1',
    std_no:'13',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
},{
    teacher_Id:'2',
    std_no:'14',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
}, {
    teacher_Id:'2',
    std_no:'15',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
},{
    teacher_Id:'2',
    std_no:'16',
    day1_pt:'PASS',
    day2_pt:'PASS',
    day3_pt:'PASS',
    day4_pt:'PASS',
    day5_pt:'PASS',
    total:'PASS',
    security_point:'100'
}]

    function appSet(){
    app.use(express.static("views"));
    // const mysqlConnectionSet = (async()=>{
    //     try{
    //         // db config set
    //         connection = await mysql.createConnection({
    //             host: '34.64.161.186',
    //             user: 'root',
    //             password: '1234',
    //             database: 'juyeon'
    //         });

    //         // db connect
    //         await connection.connect();

    //         // ping query
    //         setInterval(function () {
    //             connection.query('SELECT 1');
    //         }, 5000);

    //     } catch(error){
    //         console.log(error)
    //     }
    // })()

    // ping query
    setInterval(async ()=>{
        connection = await mysql.createConnection({
        host: '34.64.161.186',
        user: 'root',
        password: '1234',
        database: 'juyeon'
        });
        await connection.connect();
        connection.query('select 1');
        connection.close();
        console.log("ping");
   }, 5000);



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


    // * ===== 원래 코드 ===== * //

    // app.get('/insert', async (req, res) => {
    //     const teacher_Id = req.query.teacher_Id;
    //     const class_no = req.query.class_no;
    //     let pw = req.query.pw;
    //     try {
    //         await connection.query(`insert into teacher(teacher_Id, class_no, pw) values('${teacher_Id}',${class_no}, '${pw}')`)
            
    //         // const teacherIdList = teacher.map(per => per.teacher_Id);
    //         // let duplicatedFlag = true
    //         // for(const perTeacherId of teacherIdList){
    //         //     if(perTeacherId === teacher_Id){
    //         //         duplicatedFlag = false
    //         //     }
    //         // }

    //         // if(duplicatedFlag === false){
    //         //     console.log('id 중복된 경우')
    //         //     throw new Error()
    //         // }

    //         // // 데이터 넣기
    //         // teacher.push({
    //         //     teacher_Id,
    //         //     class_no,
    //         //     pw,
    //         // })

    //         res.send('계정이 생성되었습니다.')
    //     }catch(error){
    //         console.log(error)
    //         res.send('정보가 잘못되었습니다. 다른 정보를 입력해주세요.')
    //     }
    // })

    app.get('/insert', async (req, res) => {
        const teacher_Id = req.query.teacher_Id;
        const class_no = req.query.class_no;
        let pw = req.query.pw;
        

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
                await connection.query(`insert into teacher(teacher_Id, class_no, pw) values('${teacher_Id}',${class_no}, '${pw}')`)
                console.log("보냄");
                connection.close()
                res.send('계정이 생성되었습니다.')

            } catch(error){
                console.log(error)
                res.send('정보가 잘못되었습니다. 다른 정보를 입력해주세요.')

            }
        })()

    })

    app.get('/createclass',(req, res)=>{
        res.render('createclass')
    });


    // * ===== 원래 코드 ===== * //

    // app.get('/receive_python', async (req, res) => {

    //     const data = req.query.data;
    //     console.log(data);
    //     const datas = data.split(',');
    //     console.log(datas);
    //     try {
    //         // 복합키 만들어서 upsert 진행: (ALTER TABLE student ADD PRIMARY KEY(teacher_Id, std_no);)
    //         const result = await connection.query(`
    //             insert into
    //                 student(teacher_Id, std_no, day1_pt, day2_pt, day3_pt, day4_pt, day5_pt, total, security_point)
    //             values
    //                         ('${datas[0]}','${datas[1]}', '${datas[2]}','${datas[3]}','${datas[4]}','${datas[5]}', '${datas[6]}','${datas[7]}', ${datas[8]})
    //             ON DUPLICATE KEY UPDATE 
    //                 teacher_Id = '${datas[0]}',
    //                 std_no = '${datas[1]}',
    //                 day1_pt = '${datas[2]}',
    //                 day2_pt = '${datas[3]}',
    //                 day3_pt = '${datas[4]}',
    //                 day4_pt = '${datas[5]}',
    //                 day5_pt = '${datas[6]}',
    //                 total = '${datas[7]}',
    //                 security_point = ${datas[8]}
    //         `)

    //         console.log(result)
    //         // const teacher_Id = datas[0]
    //         // const std_no = datas[1]

    //         // const teacherIdAndStdNoList = student.map(per => {
    //         //     return {old_teacher_Id: per.teacher_Id, old_std_no: per.std_no}
    //         // })

    //         // let insertFlag = false
    //         // for(const [index, {old_teacher_Id, old_std_no}] of teacherIdAndStdNoList.entries()){
    //         //     if(old_teacher_Id === teacher_Id && old_std_no === std_no){
    //         //         student[index] = {
    //         //             teacher_Id:datas[0],
    //         //             std_no:datas[1],
    //         //             day1_pt:datas[2],
    //         //             day2_pt:datas[3],
    //         //             day3_pt:datas[4],
    //         //             day4_pt:datas[5],
    //         //             day5_pt:datas[6],
    //         //             total:datas[7],
    //         //             security_point:datas[8]
    //         //         }
    //         //         insertFlag = true
    //         //         break;
    //         //     }
    //         // }

    //         // if(insertFlag === false){
    //         //     student.push({
    //         //         teacher_Id:datas[0],
    //         //         std_no:datas[1],
    //         //         day1_pt:datas[2],
    //         //         day2_pt:datas[3],
    //         //         day3_pt:datas[4],
    //         //         day4_pt:datas[5],
    //         //         day5_pt:datas[6],
    //         //         total:datas[7],
    //         //         security_point:datas[8]
    //         //     })
    //         // }

    //         connection.close()
    //         res.send("받았습니다.");
    //     } catch(error){
    //         res.send('실패했습니다.')
    //     }
    // })

    app.get('/receive_python', async (req, res) => {

        const data = req.query.data;
        console.log(data);
        const datas = data.split(',');
        console.log(datas);
        

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
                    // 복합키 만들어서 upsert 진행: (ALTER TABLE student ADD PRIMARY KEY(teacher_Id, std_no);)
                    const result = await connection.query(`
                    insert into
                        student(teacher_Id, std_no, day1_pt, day2_pt, day3_pt, day4_pt, day5_pt, total, security_point)
                    values
                                ('${datas[0]}','${datas[1]}', '${datas[2]}','${datas[3]}','${datas[4]}','${datas[5]}', '${datas[6]}','${datas[7]}', ${datas[8]})
                    ON DUPLICATE KEY UPDATE 
                        teacher_Id = '${datas[0]}',
                        std_no = '${datas[1]}',
                        day1_pt = '${datas[2]}',
                        day2_pt = '${datas[3]}',
                        day3_pt = '${datas[4]}',
                        day4_pt = '${datas[5]}',
                        day5_pt = '${datas[6]}',
                        total = '${datas[7]}',
                        security_point = ${datas[8]}
                    `)
    
                    console.log("학생정보보냄");
                    connection.close()
                    res.send("받았습니다.");
    
                } catch(error){
                    console.log(error)
                    res.send('실패했습니다.')
    
                }
            })()
            

        
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
        const sql = `
            select * from student
            where teacher_Id = (
                    select teacher_Id from teacher where teacher_Id = "${chk_id}" and pw = "${chk_pw}"
                )
        `
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
            const rows = (await connection.query(sql))[0];
            console.log(rows);
            if(rows.length === 0 ){
                res.send('<h1>ID 또는 비밀번호를 확인해주세요.</h1>')
            } else {
                res.render('student_list',{rows: rows});
            
            }
            connection.close()
        } catch(error){
            console.log(error)
            res.send('실패했습니다.')

        }
       
        
    });


    // * ===== 원래 코드 ===== * //

    // app.get('/select_student',async(req, res)=>{
    //     const chk_id = req.query.t_id;
    //     const chk_pw = req.query.pw;
    //     //r = await connection.query('select * from student');
    //     console.log(chk_id);
    //     console.log(chk_pw);
    //     const sql = `
    //         select * from student
    //         where teacher_Id = (
    //                 select teacher_Id from teacher where teacher_Id = "${chk_id}" and pw = "${chk_pw}"
    //             )
    //     `

    //     // console.log(sql)
    //     //const r = await connection.query('select pw from teacher where  ')
    //     try {
    //         const rows = (await connection.query(sql))[0];
    //         console.log(rows);
    //         if(rows.length === 0 ){
    //             res.send('<h1>ID 또는 비밀번호를 확인해주세요.</h1>')
    //         } else {
    //             res.render('student_list',{rows: rows});
            
    //         }

    //         // let studentList;
    //         // // * 선생님 정보 확인
    //         // let chkFlag = false
    //         // // 관리자인 경우
    //         // if(chk_id === "maincharacter"){
    //         //     if(chk_pw === "maincharacter"){
    //         //         studentList = student
    //         //         chkFlag = true
    //         //     }
    //         // } else {

    //         //     teacher.forEach(per => {
    //         //         if(per.teacher_Id === chk_id && per.pw === chk_pw){
    //         //             chkFlag = true
    //         //         }
    //         //     })

    //         //     if(chkFlag === false){
    //         //         res.send('<h1>ID 또는 비밀번호를 확인해주세요.</h1>')
    //         //     }

    //         //     // * 해당 선생님 반의 학생 정보 출력
    //         //     studentList = student.filter((per) => {
    //         //         if(per.teacher_Id === chk_id){
    //         //             return true
    //         //         } else {
    //         //             return false
    //         //         }
    //         //     })
    //         // }


    //         // if(chkFlag === false){
    //         //     res.send('<h1>ID 또는 비밀번호를 확인해주세요.</h1>')
    //         // }

    //         //console.log(studentList)

    //         //res.render('student_list',{rows: studentList});

    //     } catch(error){
    //         res.send('false')
    //     }
    // });


    // * ===== app listen ===== * //
    const server = app.listen(port,()=> {
        console.log('서버가 실행되었습니다.');
    })

    // * ===== app 종료  ===== * //
    const exitFunction = () => {
        // await connection.end();
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
}

try {
    appSet();
}catch(e){
    console.error(e);
    appSet();
}
