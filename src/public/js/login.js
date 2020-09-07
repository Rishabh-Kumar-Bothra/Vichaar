
$(document).ready(()=>{
    console.log("login page loaded !");

    $("#login").click(()=>{
        console.log("button clicked!")
        $(".error").empty();
        let username = $("#username").val();
        let password = $("#password").val();

        if(!username || !password){
            $(".error").text("fields can not be empty");
            // alert("Fields can not be empty !");
        }
        else{
            $.post("/login",
            {
                username:username,
                password:password,
            },
            (data)=>{
                console.log("data: ",data);
                if(data == "success"){
                    window.location.href = '/';
                }
                else if(data){
                    $(".error").text(data);
                }
                else{
                    window.location.href = '/login'
                }
            })
        }
    })
})