<?php  
 //delete.php  
 $connect = mysqli_connect("localhost", "root", "", "crud");  
 $data = json_decode(file_get_contents("php://input"));  
 if($data)  
 {  
      $id = $data->id;  
      $query = "DELETE FROM `data` WHERE id='$id'";  
      mysqli_query($connect, $query);
//       if(mysqli_query($connect, $query))  
//       {  
//            echo 'Data Deleted';  
//       }  
//       else  
//       {  
//            echo 'Error';  
//       }  
 }  
 ?>  
