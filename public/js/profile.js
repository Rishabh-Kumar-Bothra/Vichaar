function updateLikes(ele,_id){
    ele.className += "disable-click";
    $.post("/post/likes",{
        id: _id
    },(data)=>{
        if(data == "success"){
            window.location.reload(true);
        }
    })
}

function deletePost(_id,user){
    $.ajax({
        type:'DELETE',
        url: '/profile/post',
        data: {id:_id,username:user},
        success: function(data){
            if(data == "success"){
                window.location.reload(true);
            }
        },
        error: function(err){
            console.error(err);
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
                    <div class="h5 m-0">${user}</div>
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
                        <a class="dropdown-item" href="#" onclick="deletePost('${id,user}')">Delete</a>
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
    console.log(userData);
    // displaying follow and unfollow numbers
    $("#followers").text(userData.user.followers.length);
    $("#followings").text(userData.user.followings.length);

    // Handling button visibility
    if(userData.self.username == userData.user.username){
        $("#follow").hide();
        $("#unfollow").hide();
    }
    else{
        $("#change").hide();
        let follow = false;

        for(x in userData.user.followers){
            if(userData.user.followers[x].username == userData.self.username)
                follow = true;
        }

        if(follow)
            $("#follow").hide();
        else
            $("#unfollow").hide();
    }
    let data = userData.post;
    for(x in data){
        $("#appendHere").append(makePosts(data[x].user,data[x].body,data[x].likes,data[x].title,data[x]._id));
    }
    for(let x in userData.user.followers){
        $("#followerList").append(makeLists(userData.user.followers[x].username));
    }
    for(let x in userData.user.followings){
        $("#followingList").append(makeLists(userData.user.followings[x].username));
    }

    // initially hiding list
    $("#followerList").toggleClass("hidden");
    $("#followingList").toggleClass("hidden");


    $("#followers").click(function(){
        console.log("follow");
        $("#followerList").toggleClass("hidden");
        
    })

    $("#followings").click(function(){
        console.log("following");
        $("#followingList").toggleClass("show")
        
    })

    $("#follow").click(()=>{
        $.post("/profile/follow",{
            username: userData.user.username,
            _id: userData.user._id,
        },(data)=>{
            console.log(data);
            if(data == "success"){
                window.location.reload(true);
            }
        })
    })
    
    $("#unfollow").click(()=>{
        $.post("/profile/unfollow",{
            username: userData.user.username,
            _id:userData.user._id,
        },(data)=>{
            console.log(data);  
            if(data == "success"){
                window.location.reload(true);
            }
        })
    })

    $("#edit").click(()=>{
        let newName = $("#newName").val();
        console.log("edit clicked!",newName);
        if(newName == '' || newName == undefined){
            $(".error").text("input fields can not be empty!");
            return;
        }
        $.post("/profile/update",{
            name: newName,

        },(data)=>{
            console.log(data);
            if(data == "success"){
                window.location.reload(true);
            }
        })
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