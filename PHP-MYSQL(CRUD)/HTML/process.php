<?php

    session_start();
    
    $connect=mysqli_connect('localhost','root','','crud') or die(mysqli_error($connect)) ;
    $name='';$phone='';$email='';$update=false;
    
    // $mysqli=new mysqli('localhost','root','','crud') or die(mysqli_error($mysqli));

//==========================================================create======================================================
    if(isset($_POST['save'])){

        $name=$_POST['user_name'];
        $email=$_POST['user_email'];
        $phone=$_POST['user_phone'];

        // $mysqli->query("Insert into data (name,email,phone) VALUES('$name','$email','$phone')") or die($mysqli->error);

        $query1="insert into data(name,email,phone) VALUES ('$name','$email','$phone')";
		mysqli_query($connect,$query1);

        $_SESSION['msg']='Record has been saved';
        $_SESSION['msg_class']='success';
        $_SESSION['svg']='<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>';
        
        header('location:index.php');

    }

//==========================================================delete======================================================
    if(isset($_GET['delete'])){

        $id=$_GET['delete'];

        // $mysqli->query("DELETE FROM data WHERE id='$id'")or die($mysqli->error);

        $query2="DELETE FROM data WHERE id='$id'";
        mysqli_query($connect,$query2);

        $_SESSION['msg']='Record has been deleted';
        $_SESSION['msg_class']='danger';
        $_SESSION['svg']='<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>';
        
        header('location:index.php');
    }


//==========================================================update======================================================
    if(isset($_GET['edit'])){

        $id=$_GET['edit'];
        $update=true;
        $query3 = "select * from data where id='$id'";

	    $result = mysqli_query($connect, $query3);

	    $num = mysqli_num_rows($result);
        if($num==1)
	    {
            $row=$result->fetch_array();
            $name=$row['name'];
            $email=$row['email'];
            $phone=$row['phone'];
        }

    }

    if(isset($_POST['update'])){
        $id=$_POST['id'];
        $name=$_POST['user_name'];
        $email=$_POST['user_email'];
        $phone=$_POST['user_phone'];

        // $connect->query("") or die(mysqli_error($connect->error));

        
        $query4="UPDATE data SET name='$name',email='$email',phone='$phone' WHERE id='$id'";
        mysqli_query($connect,$query4);

        $_SESSION['msg']='Record has been Updated';
        $_SESSION['msg_class']='info';
        $_SESSION['svg']='<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>';
                    
        header('location:index.php');
    }

    if(isset($_GET['cancel'])){
        session_destroy();
        header('location:index.php');
    }
?>
