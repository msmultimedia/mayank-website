
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
  user_name=localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";
  
  function addRoom(){
      
      room_name = document.getElementById("room_name").value;
      console.log(room_name)
      localStorage.setItem("room_name",room_name);
      
      firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
      });
      
     window.location="kwitter_page.html";

  
  }  

  function getData() { 
      firebase.database().ref("/").on('value', function(snapshot) { 
        document.getElementById("output").innerHTML = "";
          snapshot.forEach(function(childSnapshot) { 
            childKey  = childSnapshot.key;
          Room_names = childKey;
          console.log("Room Name - " + Room_names);
         row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
         document.getElementById("output").innerHTML += row;
       });
     });
    
    }
    
    getData();
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";




}
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location="kwitter_page.html";

}

