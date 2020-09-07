
$(document).ready(()=>{
    $('#signup').click(function(){

        $(".error").empty();
        let name = $("#name").val();
        let email = $("#email").val();
        let username = $("#username").val();
        let password = $("#password").val();

        if(password != $("#confirm-password").val()){
            console.log(password);
            console.log($("#confirm-password").val());
            $(".error").text("Passwords must be same !")
            // alert("passwords aren't same !");
        }
        else if(!name || !email || !username || !password){
            $(".error").text("fields can not be empty")
            // alert("Fields can not be empty !");
        }
        else{
            $.post("/signup",
            {
                name: name,
                email: email,
                username: username,
                password: password
            },
            (data)=>{
                console.log("data: ",data);
                if(data == "success"){
                    window.location.href = '/login';
                }
                else if(data){
                    $(".error").text(data);
                }
                else{
                    $(".error").text("Error while signup !")
                }
            })
        }
    })
})