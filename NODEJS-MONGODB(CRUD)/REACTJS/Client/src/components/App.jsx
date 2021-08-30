import React,{useState,useEffect} from "react";
import Forminput from "./Forminput";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
// import Alertmsg from "./Alertmsg";
// import IconButton from '@material-ui/core/IconButton';
// import Collapse from '@material-ui/core/Collapse';
// import Button from '@material-ui/core/Button';
// import Closeicon from '@material-ui/icons/Close';
// import ClearIcon from '@material-ui/icons/Clear';
// import { AlertTitle } from "@material-ui/lab";   
  
function App(){
    
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));

    const [userName,setuserName]=useState("");
    const [userEmail,setuserEmail]=useState("");
    const [userPhone,setuserPhone]=useState(0);
    const [userList,addUserlist]=useState([]);

    const callTouseStyle = useStyles();

    const [open, setOpen] = useState(false);
    const [alertType,setAlertType]=useState("success");
    const [alertMsg,setAlertMsg]=useState("Data Saved Successfully");
    
//edit and update
    const [userId,setid]=useState("");
    const [user_name,setName]=useState("");
    const [user_email,setEmail]=useState("");
    const [user_phone,setPhone]=useState("");
    const [isUpdate,setUpdate]=useState(false);
    
    var u_name,u_email,u_phone;
    
    function readData(){
        Axios.get('http://localhost:3001/')
        .then(function (response) {
          console.log(response)
          addUserlist(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    useEffect(()=>{
        readData();
    },[])

    function handleOnchange(e){
        let Name=e.target.name;
        if(Name==="user_name"){
            setuserName(e.target.value);
        }
        else if(Name==="user_email"){
            setuserEmail(e.target.value);
        }
        else if(Name==="user_phone"){
            setuserPhone(e.target.value);
        }
    }
    function handleSave(){
        // alert("submitteed")
        // Axios.post('http://localhost:3001/api/save', {
        //     Name: userName,
        //     Email: userEmail,
        //     Phone: userPhone
        //   })
        //   .then(function (response) {
        //     console.log(response)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        
            Axios({
                method: 'post',
                url: 'http://localhost:3001/save',
                data: {
                    Name: userName,
                    Email: userEmail,
                    Phone: userPhone
                }
              })

            
            //   alert("success")
              setAlertType("success");
              setAlertMsg("Data Saved Successfully");
              setOpen(true);
            
            }
            function handleEdit(id){
                setUpdate(true);
                console.log(id);

                Axios({
                    method:"post",
                    url:'http://localhost:3001/edit',
                    data:{id:id}
                })
                    Axios.get('http://localhost:3001/edit').then((res)=>{
                        console.log(res.data);
                        console.log(res.data[0]._id);
                        console.log(res.data[0].name);
                        console.log(res.data[0].email);
                        console.log(res.data[0].phone);

                        setid(res.data[0]._id);
                        setName(res.data[0].name);
                        setEmail(res.data[0].email);
                        setPhone(res.data[0].phone);
                       
                    })
             
            
            }
            
            function handleUpdate(){
                
                console.log(userId);
                
                userName===""?u_name=user_name:u_name=userName;
                userEmail===""?u_email=user_email:u_email=userEmail;
                userPhone===0?u_phone=user_phone:u_phone=userPhone;
                
                console.log(u_name);
                console.log(u_email);
                console.log(u_phone);
                  
                Axios({
                    method:'post',
                    url:'http://localhost:3001/update',
                    data:{
                        Id:userId,
                        Name:u_name,
                        Email:u_email,
                        Phone:u_phone
                    }
                })
                setAlertType("info");
                setAlertMsg("Data Updated Successfully");
                setOpen(true);
            }

    function handleDelete(id){
        Axios({
            method: 'delete',
            url: `http://localhost:3001/delete/${id}`
          })
            readData();
            readData();
            setAlertType("error")
            setAlertMsg("Data deleted Successfully")
            setOpen(true);

    }
    
    return(
        <div className="container mt-4">
            <div className="row container-fluid justify-content-center">
                 <form className="col-auto mb-4" >
                    <Forminput 
                        labelName={"Name"} 
                        inputType={"text"} 
                        inputName={"user_name"} 
                        placeHolderValue={"Enter Your Name"}
                        val={user_name}
                        handleInput={handleOnchange}
                    />
                    <Forminput 
                        labelName={"Email Address"} 
                        inputType={"email"} 
                        inputName={"user_email"} 
                        val={user_email}
                        placeHolderValue={"Enter Your Email"}
                        handleInput={handleOnchange}
                    />
                    <Forminput 
                        labelName={"Phone"} 
                        inputType={"number"} 
                        inputName={"user_phone"} 
                        val={user_phone}
                        placeHolderValue={"Enter Your Phone Number"}
                        handleInput={handleOnchange}
                    />
                    {isUpdate ? <Button variant="contained" type="submit" color="primary" name="Update" onClick={handleUpdate}>Update</Button>:<Button variant="contained" type="submit" color="primary" name="save" onClick={handleSave}>Save</Button>}
                </form>
                
                
                
                <div className={callTouseStyle.root}>
                    <Collapse in={open}>
                        <Alert severity={alertType}
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                        {alertMsg}
                        </Alert>
                    </Collapse>
                </div>
               
              
                <div className="row justify-content-center">
                    <table className="table table-striped  mt-2">
                        <thead>
                            <tr>
                                <th>SNO</th>
                                <th>User_ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                                {userList.map((val,index)=>{
                                    return (
                                        <tr key={index}>
                                            
                                            <td>{index+1}</td>
                                            <td>{val._id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.phone}</td>
                                            <td><Button variant="contained"  color="primary" name="Edit" onClick={()=>{handleEdit(val._id)}}><EditIcon fontSize="small"/> EDIT</Button></td>
                                            <td><Button variant="contained"  color="secondary" name="Edit" onClick={()=>{handleDelete(val._id)}}><DeleteIcon fontSize="small"/>Delete</Button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;

