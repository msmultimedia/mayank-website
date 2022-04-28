const firebaseConfig = {
    apiKey: "AIzaSyCfefIDPCtjNH4sHqGXLFen-asHZFMOFRI",
    authDomain: "kwitter3-c72c0.firebaseapp.com",
    databaseURL: "https://kwitter3-c72c0-default-rtdb.firebaseio.com",
    projectId: "kwitter3-c72c0",
    storageBucket: "kwitter3-c72c0.appspot.com",
    messagingSenderId: "1098740704787",
    appId: "1:1098740704787:web:a8dcdde98110fb292341e6"
  };
firebase.initializeApp(firebaseConfig);
var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");





function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
   
}
function send(){
   msg=document.getElementById("msg").value;
  
  firebase.database().ref(room_name).push({
      name: user_name,
      message: msg,
      like:0
    });
}

function getData() { 
  firebase.database().ref("/"+room_name).on('value', function(snapshot) 
{  document.getElementById("output").innerHTML = ""; 
 snapshot.forEach(function(childSnapshot)
 { childKey  = childSnapshot.key; childData = childSnapshot.val();
   if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
   console.log (firebase_message_id); 
   console.log(message_data);
  
   name = message_data['name'];
   message = message_data['message'];
   like = message_data['like'];
   
   name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></img>";
   message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
   like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
  span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>"
  
  row = name_with_tag + message_with_tag + like_button + span_with_tag;
  document.getElementById("output").innerHTML += row;
}
 });
});
}
getData();

function updateLike(message_id){
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes)+1;
firebase.database().ref(room_name).child(message_id).update({
  like : updated_likes  
});
}
