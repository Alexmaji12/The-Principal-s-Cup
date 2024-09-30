function initializeApp() {
  const firebaseConfig = {
    apiKey: "AIzaSyBLc5JHSbwJFjx0kLvDziTK1F1bCoe8MMo",
    authDomain: "final-year-d05fa.firebaseapp.com",
    projectId: "final-year-d05fa",
    storageBucket: "final-year-d05fa.appspot.com",
    messagingSenderId: "837604640880",
    appId: "1:837604640880:web:63b23487f69eeb3852ccb5",
    measurementId: "G-JSTZJR8FDX"
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  const auth = firebase.auth();

// Athlete Registration function
let registerAthlete = document.getElementById('register-athlete');
if (registerAthlete) {
  registerAthlete.addEventListener('click', (e) => {
    e.preventDefault();

        // Show the loading popup during registration
        document.getElementById('loadingPopup').style.display = 'block';

    // Get the values of the password and confirm password fields
    var password = document.getElementById('athlete-password').value;
    var confirmPassword = document.getElementById('confirm-athelete-password').value;

    // Perform the check if they are the same
    if (password !== confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }

    // Create athlete data
    var email = document.getElementById('athlete-email').value;
    let fullname = document.getElementById('athlete-firstname').value + " " +
    document.getElementById('athlete-lastname').value;
let dob = document.getElementById('athlete-dob').value;
let phone = document.getElementById('athlete-phone').value;
let address = document.getElementById('athlete-address').value;
let gender = document.getElementById('athlete-gender').value;
let marital_status = document.getElementById('athlete-marital-status').value;
let next_of_kin = document.getElementById('athlete-next-of-kin').value;
let next_of_kin_phone = document.getElementById('athlete-next-of-kin-phone').value;
let next_of_kin_email = document.getElementById('athlete-next-of-kin-email').value;
let sport_preference = document.getElementById('athlete-sport-preference').value;

    // Create the user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Set the additional user information in the Firebase Firestore or Realtime Database
        var user = userCredential.user;
        console.log('User', user.email);
        console.log(user.uid);

        var userDocRef = firebase.firestore().collection('users').doc(user.uid);

        return userDocRef.set({
          fullname: fullname,
          email: email,
          role: 'athlete',
          dob: dob,
          phone: phone,
          address: address,
          gender: gender,
          email: email,
          marital_status: marital_status,
          next_of_kin: next_of_kin,
          next_of_kin_email: next_of_kin_email,
          next_of_kin_phone: next_of_kin_phone,
          sport_preference: sport_preference
        });
      })
      .then(() => {
        console.log('Athlete data saved.');
        
        // Save authentication state to localStorage
        localStorage.setItem('user', JSON.stringify(auth.currentUser));
          // After successful registration
        // Hide the loading popup
        document.getElementById('loadingPopup').style.display = 'none';
        // Redirect to the dashboard after successful registration
        window.location.href= ("../dashboard/athelete-dashboard/template/index.html");
      })
      .catch((error) => {
        console.error('Error registering athlete:', error);
        alert(error);

        document.getElementById('loadingPopup').style.display = 'none';

      });
  });
}

// Team Registration function
let registerTeam = document.getElementById('register-team');
if (registerTeam) {
  registerTeam.addEventListener('click', (e) => {
    e.preventDefault();

        // Show the loading popup during registration
        document.getElementById('loadingPopup').style.display = 'block';

    // Get the values of the password and confirm password fields
    var password = document.getElementById('team-password').value;
    var confirmPassword = document.getElementById('confirm-team-password').value;

    // Perform the check if they are the same
    if (password !== confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }

    // Create team data
    var email = document.getElementById('team-email').value;
    let teamName = document.getElementById('team-name').value;
    let choiceOfSports = document.getElementById('team-choice').value;
    let teamPhone = document.getElementById('team-phone').value;
    let teamAddress = document.getElementById('team-address').value;
    let teamNumber = document.getElementById('team-number').value;
    let teamCoach = document.getElementById('team-coach').value;

    // Create the user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Set the additional user information in the Firebase Firestore or Realtime Database
        var user = userCredential.user;
        console.log('User', user.email);
        console.log(user.uid);

        var userDocRef = firebase.firestore().collection('users').doc(user.uid);

        return userDocRef.set({
          teamName: teamName,
          email: email,
          role: 'team',
          teamAddress: teamAddress,
          teamCoach: teamCoach,
          teamPhone: teamPhone,
          teamNumber: teamName,
        choiceOfSports: choiceOfSports
        });
      })
      .then(() => {
        console.log('Athlete data saved.');
        
        // Save authentication state to localStorage
        localStorage.setItem('user', JSON.stringify(auth.currentUser));
          // After successful registration
        // Hide the loading popup
        document.getElementById('loadingPopup').style.display = 'none';
        // Redirect to the dashboard after successful registration
        window.location.href = ("../dashboard/scout-dashboard/template/index.html");
      })
      .catch((error) => {
        console.error('Error registering team:', error);
        alert(error);

        document.getElementById('loadingPopup').style.display = 'none';

      });
  });
}

  // Sign in function
  let loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Login button clicked");

         // Show the loading popup during registration
         document.getElementById('loadingPopup').style.display = 'block';


      var email = document.getElementById("login-email").value;
      var password = document.getElementById("login-password").value;

      console.log(email);
      console.log(password);

      auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        var user = userCredential.user;
        var userId = user.uid;
        
        return firebase.firestore().collection("users").doc(userId).get().then((doc) => {
          if (doc.exists) {

            // Hide the loading popup
        document.getElementById('loadingPopup').style.display = 'none';


            const userData = doc.data();
            const role = userData.role;

            if (role === "athlete") {
              window.location.href = ("../dashboard/athelete-dashboard/template/index.html"); // Athlete dashboard
          } else if (role === "team") {
              window.location.href = ("../dashboard/scout-dashboard/template/index.html"); // Team dashboard
          } else {
              alert("No role assigned to this user.");
          }
          } else {
            alert("No such user")
          }
        });
        
        
      }).catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        document.getElementById('loadingPopup').style.display = 'none';

      });
    });
  }
}

// Call the initializeApp function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeApp);