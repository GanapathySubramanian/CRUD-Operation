app.controller("crudController",['$scope','$http',($scope, $http)=>{
    $scope.btn_name="Save";
    $scope.add_class='fade';
    // $scope.msg="checking controller..."

    $scope.saveData = ()=>{  
        if($scope.user_name == null)  
        {  
            $scope.add_class='alert-info';
            $scope.add_msg='Name is required';
            $scope.add_svg='#exclamation-triangle-fill'; 
        }  
        else if($scope.user_email == null)  
        {  
            $scope.add_class='alert-info';
            $scope.add_msg='Email is required';
            $scope.add_svg='#exclamation-triangle-fill';
        }  
        else if($scope.user_phone==null){
            $scope.add_class='alert-info';
            $scope.add_msg='Phone Number is required';
            $scope.add_svg='#exclamation-triangle-fill';
        }
        else  
        {  
            $http.post("api/insert.php",{'name':$scope.user_name, 'email':$scope.user_email,'phone':$scope.user_phone,'btn_name':$scope.btn_name,'id':$scope.id})
           .then(function success(response){
            //    alert(response.data);
               
            if($scope.btn_name=='Save'){
               $scope.add_class='alert-success';
               $scope.add_msg='Record has been saved';
               $scope.add_svg='#check-circle-fill';
            }
            else{
               $scope.add_class='alert-info';
               $scope.add_msg='Record has been updated';
               $scope.add_svg='#exclamation-triangle-fill';
            }
            $scope.firstname = null;  
            $scope.lastname = null;  
            $scope.btn_name = "Save"; 
             $scope.displayData();   
               
           })
        }
    }
     $scope.displayData=()=>{
         $http.get("api/select.php")
         .then(function success(response){
               $scope.users=response.data;
         });
     }


     $scope.updateData=(id,name,email,phone)=>{
        $scope.id=id;
        $scope.user_name=name;
        $scope.user_email=email;
        $scope.user_phone=phone;
        $scope.btn_name = "Update";
      }
      
      $scope.deleteData = function(id){  
        //    if(confirm("Are you sure you want to delete this data ?"))  
        //    {  
                $http.post("api/delete.php", {'id':id})  
                .then(function success(response){  
                    //  alert(response.data);  
                    $scope.displayData();

                    $scope.add_class='alert-danger';
                    $scope.add_msg='Record has been deleted';
                    $scope.add_svg='#exclamation-triangle-fill';
 
                });  
        //    }  
        //    else  
        //    {  
        //         return false;  
        //    }  
      }  

}]);