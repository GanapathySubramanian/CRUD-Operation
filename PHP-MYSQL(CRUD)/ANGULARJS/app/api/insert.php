<?php  
 //insert.php  
 $connect = mysqli_connect("localhost", "root", "", "crud");  
 $data = json_decode(file_get_contents("php://input"));  
 if ($data)
 {  
      $name = mysqli_real_escape_string($connect, $data->name);       
      $email = mysqli_real_escape_string($connect, $data->email);  
      $phone = mysqli_real_escape_string($connect, $data->phone);  
      
      $btn_name = mysqli_real_escape_string($connect, $data->btn_name);

      if($btn_name=='Save'){
          $query = "INSERT INTO data(`name`,`email`,`phone`) VALUES ('$name', '$email','$phone')";  
          mysqli_query($connect, $query);
          // if(mysqli_query($connect, $query))  
          // {  
          //      echo 'Data Inserted..';  
          // }  
          // else  
          // {  
          //      echo 'Error';  
          // }  
     }
      if($btn_name == 'Update')  
      {  
           $id = $data->id;  
           $query = "UPDATE data SET `name` = '$name', `email` = '$email',`phone`='$phone' WHERE `id` = '$id'";  
           mysqli_query($connect, $query);
          //  if(mysqli_query($connect, $query))  
          //  {  
          //       echo 'Data Updated...';  
          //  }  
          //  else  
          //  {  
          //       echo 'Error';  
          //  }  
      }  
      
 } else{
    echo '<script>alert("Errors")</script>'; 
 }
 ?>  