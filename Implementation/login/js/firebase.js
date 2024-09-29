
//   const firebaseConfig = {
//     apiKey: "AIzaSyBLc5JHSbwJFjx0kLvDziTK1F1bCoe8MMo",
//     authDomain: "final-year-d05fa.firebaseapp.com",
//     projectId: "final-year-d05fa",
//     storageBucket: "final-year-d05fa.appspot.com",
//     messagingSenderId: "837604640880",
//     appId: "1:837604640880:web:63b23487f69eeb3852ccb5",
//     measurementId: "G-JSTZJR8FDX"
//   };

// firebase.initializeApp(firebaseConfig);
//   // Initialize Firebase
//   const auth = firebase.auth();

//   const database = firebase.firestore();

//   var userID = firebase.auth().currentUser

//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
    
//     userID = user.uid;

//     console.log("Logged In");
//     console.log(userID);

//         // Save authentication state to localStorage
//         localStorage.setItem('user', JSON.stringify(user));

//      database.collection("users").doc(userID).get().then(function(doc) {
//     if(doc.exists) {
//         console.log("Document data: ", doc.data());

//         // access users data
//         var email = doc.data().email;
//         var name = doc.data().fullname;

//     var fullname = document.getElementById('userName');
//     if (fullname != null) {
//       fullname.innerText = name;
//     }

//     var userEmail = document.getElementById('userEmail');
//     if (userEmail != null ) {
//       userEmail.textContent = email;
//     }

//     var statusMessageDiv = document.getElementById('statusMessage');
// if (status === true) {
//     statusMessageDiv.innerHTML = '<div class="alert alert-success"><p>Your Grant Application has been Approved</p></div>';
// } else {
//     statusMessageDiv.innerHTML = '<div class="alert alert-warning"><p>Your Grant Application is Pending Approval</p></div>';
// }
  

//     } else {
//     console.log("nothing here")
//   }
    
// }).catch(function(error) {
//     console.log("Error getting document:", error)
// });  


//  document.getElementById('signout').addEventListener('click', function(){
//   auth.signOut().then(() => {
//     console.log("User signed out successfully.");
//     localStorage.removeItem('user'); // Remove auth state from storage
//     window.location = "form-index.html";
//   }).catch(error => {
//     console.error("Error signing out: ", error);
//   });

// });

// return;
    
//   } else if (window.location.pathname !== 'login/login.html') {
//     // Check if user authentication state is saved in localStorage
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       window.location.pathname = "dashboard.html";
//     } else {
//       window.location.pathname = "login/login.html";
//     }
   
//   }

// })