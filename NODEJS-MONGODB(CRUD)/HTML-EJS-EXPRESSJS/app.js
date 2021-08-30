const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


var foundData=[{_id:'',name:'',email:'',phone:''}];


mongoose.connect("mongodb://localhost:27017/crudDB",{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
});

const dataSchema = {
    name:String,
    email:String,
    phone:Number
};

const Data=mongoose.model("Data",dataSchema);

//==========================================================read======================================================
app.get('/',(req,res)=>{
    Data.find({},(err,foundDatas)=>{
        var data=foundDatas;
        res.render('app',{row:data,add_class:'fade',add_msg:'',add_svg:'',foundData:foundData,update:false});
    })
});

//==========================================================create======================================================

app.post('/save',(req,res)=>{
    console.log(req.body.user_email);
    Data.find({email:req.body.user_email},(err,foundData)=>{
        if(foundData!=''){
            console.log('email already exists');
            res.redirect('/');
        }
        else{
            Data.create({name:req.body.user_name,email:req.body.user_email,phone:req.body.user_phone},(err,data)=>{
                if(!err){
                    Data.find({},(err,foundDatas)=>{
                        var data=foundDatas;
                        if(!err){
                           res.render('app',{row:data,add_class:'alert-success',add_msg:'Record has been saved',add_svg:'#check-circle-fill',foundData:[{_id:'',name:'',email:'',phone:''}],update:false});
                        }  
                        else{
                            console.log(err);
                        }
                   });
                }
                else{
                    console.log(err);
                }
            })  
        }
        
    })
});
//==========================================================delete======================================================

app.get('/delete/:uid',(req,res)=>{
    var id=req.params.uid;
    Data.deleteOne({_id:id},(err,result)=>{
        if(!err){
            Data.find({},(err,foundDatas)=>{
                var data=foundDatas
                if(!err){
                   res.render('app',{row:data,add_class:'alert-danger',add_msg:'Record has been deleted',add_svg:'#exclamation-triangle-fill',foundData:foundData,update:false});
                }  
                else{
                    console.log(err);
                }
           });
        }
    })
});
//==========================================================update======================================================

app.get('/edit/:id',(req,res)=>{
    var id=req.params.id;
    Data.find({_id:id},(err,foundDatas)=>{
        // console.log(foundDatas[0].name);
        // console.log(foundDatas[0].email);
        // console.log(foundDatas[0].phone);
        var selectedData=foundDatas;
        if(!err){
            Data.find({},(err,wholeData)=>{
                var data=wholeData;
                if(!err){
                    res.render('app',{row:data,add_class:'fade',add_msg:'',add_svg:'',foundData:selectedData,update:true});
                 }  
                 else{
                     console.log(err);
                 }
            })
        }else{
            console.log(err);
        }
    })
});

app.post('/update',(req,res)=>{
    Data.updateOne({_id :req.body.user_id},{name:req.body.user_name,email:req.body.user_email,phone:req.body.user_phone},(err)=>{
        if(err){
          console.log(err);
        }else{
            Data.find({},(err,wholeData)=>{
                var data=wholeData;
                if(!err){
                    res.render('app',{row:data,add_class:'alert-info',add_msg:'Record has been updated',add_svg:'#exclamation-triangle-fill',foundData:foundData,update:true});
                 }  
                 else{
                     console.log(err);
                 }
            })
        }
    })
});

app.listen(3002,()=>{
    console.log("server started at port 3002");
})