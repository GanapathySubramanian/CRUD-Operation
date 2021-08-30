const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();


app.use(cors());

app.use(express.json());

var user_Id;
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


app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    Data.find({},(err,foundData)=>{
        if(err){
            res.send(err);
        }else{
            res.send(foundData);
        }
    })
})

app.post('/save',(req,res)=>{
    Name=req.body.Name;
    Email=req.body.Email;
    Phone=req.body.Phone;

    Data.find({email:Email},(err,foundData)=>{
        if(foundData!=''){
            console.log('email already exists');
            res.redirect('http://localhost:3000');
        }
        else{
            Data.create({name:Name,email:Email,phone:Phone},(err,data)=>{
            })  
        }
        
    })
})

app.delete('/delete/:Id',(req,res)=>{
    var id=req.params.Id;
    Data.deleteOne({_id:id},(err,result)=>{

    })
});

app.post('/edit',(req,res)=>{
    // console.log(req.body.id);
    user_Id=req.body.id;
})
app.get('/edit',(req,res)=>{
    Data.find({_id:user_Id},(err,result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    })
})

app.post('/update',(req,res)=>{
    var id=req.body.Id;
    var name=req.body.Name;
    var phone=req.body.Phone;
    var email=req.body.Email;
    console.log(name)
    console.log(email)
    console.log(phone)
    Data.updateOne({_id :id},{name:name,email:email,phone:phone},(err,result)=>{
    })
})

app.use(express.json());
app.listen(3001,()=>{
    console.log('Server Started at port 3001')
})