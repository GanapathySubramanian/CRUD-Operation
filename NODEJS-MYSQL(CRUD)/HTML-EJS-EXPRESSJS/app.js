const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');


const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



var foundData=[{id:'',name:'',email:'',phone:''}];

var dbconnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
  });
  dbconnect.connect((err)=>{
      if(err){
          throw err;
      }
      else{
          console.log('connected to the database CRUD');
      }
  });

//==========================================================read======================================================
app.get('/',(req,res)=>{
    var sql1="SELECT * FROM data";
 
    dbconnect.query(sql1,(err,result)=>{
        var rowdata=result;
        var add_class='fade';
        if(!err){
            res.render('index',{row:rowdata,add_class:add_class,add_msg:'',add_svg:'',foundData:foundData,update:false});
        }
        else{
            console.log(err);
        }
    })
});

//==========================================================create======================================================
app.post('/save',(req,res)=>{
   
    var name=req.body.user_name;
    var email=req.body.user_email;
    var phone=req.body.user_phone;

    var sql2 = "insert into data(name,email,phone) VALUES ('"+name+"','"+email+"','"+phone+"')";

    dbconnect.query(sql2,(err, result)=>{
     if(!err){
        var sql3="SELECT * FROM data";
        dbconnect.query(sql3,(error,result)=>{
            var data=result;
            if(!error){
                res.render('index',{row:data,add_class:'alert-success',add_msg:'Record has been saved',add_svg:'#check-circle-fill',foundData:foundData,update:false});
            }
            else{
                console.log(error);
            }
        })
     }
     else{
         console.log(err);
     }
  })
});


//==========================================================delete======================================================

app.get('/delete/:user_id',(req,res)=>{
    
    var id=req.params.user_id;

    // console.log(id);

    var sql4="DELETE FROM data WHERE id='"+id+"'";

 
    dbconnect.query(sql4,(err,result)=>{
        if(!err){
            var sql5="SELECT * FROM data";
            dbconnect.query(sql5,(error,result)=>{
                var data=result;
                if(!error){
                    res.render('index',{row:data,add_class:'alert-danger',add_msg:'Record has been deleted',add_svg:'#exclamation-triangle-fill',foundData:foundData,update:false});
                }
                else{
                    console.log(error);
                }
            })
        }
        else{
            console.log(err);
        }
    })
});



//==========================================================update======================================================

app.get('/edit/:user_id',(req,res)=>{

    var id=req.params.user_id;

    var sql6="SELECT * FROM data WHERE id="+id+"";
    
   

            dbconnect.query(sql6,(error,result)=>{
                Datas=result;
                if(!error){
                    var sql7="SELECT * FROM data";
                    dbconnect.query(sql7,(err,result)=>{
                        var data=result;
                       
                        if(!error){
                            res.render('index',{row:data,add_class:'fade',add_msg:'',add_svg:'',foundData:Datas,update:true});
                            console.log(Datas);
                        }
                        else{
                            console.log(err);
                        }
                    })
                }
                else{
                    console.log(error);
                }
            })
});

app.post('/update',(req,res)=>{
    
     var id=req.body.user_id;
     var name=req.body.user_name;
     var email=req.body.user_email;
     var phone=req.body.user_phone;

    var sql8="UPDATE `data` SET name='"+name+"',email='"+email+"',phone='"+phone+"' WHERE id="+id;
    

    dbconnect.query(sql8,(error,result)=>{
        if(!error){
            var sql9="SELECT * FROM data";
            dbconnect.query(sql9,(err,result)=>{
                var data=result;

                if(!error){
                    res.render('index',{row:data,add_class:'alert-info',add_msg:'Record has been updated',add_svg:'#exclamation-triangle-fill',foundData:data,update:true});
                }
                else{
                    console.log(err);
                }
            })
        }
        else{
            console.log(error);
        }
    })
    
});


app.listen(3001,()=>{
    console.log("Server started at port 3001");
});  
