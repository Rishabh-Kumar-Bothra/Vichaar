function updateLikes(ele,_id){
    console.log("id: ",_id);
    ele.className += "disable-click";
    $.post("/post/likes",{
        id: _id
    },(data)=>{
        if(data == "success"){
            window.location.reload(true);
        }
    })
}

function makeLists(user){
    return(`<li class="list-group-item" onclick="window.location.href='/profile/${user}'">${user}</li>
    `)
}

function makePosts(user,body,likes,title,id){
    return(`<div class="card gedf-card">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
                <div class="mr-2">
                    <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                </div>
                <div class="ml-2">
                    <div class="h5 m-0" onclick="window.location.href='/profile/${user}'">${user}</div>
                    <!-- <div class="h7 text-muted">Rishabh Kumar Bothra</div> -->
                </div>
            </div>
            <div>
                <div class="dropdown">
                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                        <div class="h6 dropdown-header">Configuration</div>
                        <a class="dropdown-item" href="#">Hide</a>
                        <a class="dropdown-item" href="#">Report</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="card-body">
        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>&nbsp;10 min ago</div>
        <a class="card-link" href="#">
            <h5 class="card-title">${title}</h5>
        </a>

        <p class="card-text">
            ${body}
        </p>
    </div>
    <div class="card-footer">
        <a href="#" class="card-link" onclick="updateLikes(this,'${id}')">${likes} <i class="fa fa-gittip"></i> Likes</a>
        <a href="" class="card-link"><i class="fa fa-comment"></i> Comment</a>
        <a href="" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
    </div>
</div><br>`);
}
$(document).ready(()=>{
    console.log("explore is loaded!");
    let userData;

    $.get("/user/details",(data)=>{
        console.log(data);
        userData = data;
        $("#username").text(data.username);
        $("#name").text(data.name);
        $("#followers").text(data.followers.length);
        $("#followings").text(data.followings.length);
    })

    $.get("/post/all",(data)=>{
        // console.log("data: ",data);
        for(let x in data){
            $("#appendHere").append(makePosts(data[x].user,data[x].body,data[x].likes,data[x].title,data[x]._id));
            // console.log(data[x].user,data[x].body,data[x].likes);
        }
    })

    $("#username").click(()=>{
        let username = $("#username").text();
        window.location.href = `/profile/${username}`;
    })

    $("#followers").click(()=>{
        $("#followerList").empty();
        $("#followingList").hide();
        for(let x in userData.followers){
            $("#followerList").append(makeLists(userData.followers[x].username));
        }
    })

    $("#followings").click(()=>{
        $("#followingList").hide();
        $("#followerList").empty();
        for(let x in userData.followings){
            $("#followingList").append(makeLists(userData.followings[x].username));
        }
    })

    $("#share").click(()=>{
        let message = $("#message").val();
        // console.log("message: ",message);
        if(message){
            $.post("/user/newPost",
            {
                message:message,
            },(data)=>{
                // console.log(data);
                if(data == "success"){
                    $("#messsage").val('');
                    window.location.reload(true);
                }
                else{
                    alert("Error while publishing post!")
                }
            })
        }
    })

    $("#logout").click(()=>{
        $.get("/login/logout",(data)=>{
            if(data == "logout"){
                window.location.href = "/login";
            }
            else{
                alert("LogOut failed!");
            }
        })
    })

    
})