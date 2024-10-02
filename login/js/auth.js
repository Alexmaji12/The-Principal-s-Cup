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
    var confirmPassword = document.getElementById('confirm-athlete-password').value;

    // Perform the check if they are the same
    if (password !== confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }

    // Create athlete data
    let name = document.getElementById('athlete-name').value;
    let email = document.getElementById('athlete-email').value;
let age = document.getElementById('athlete-age').value;
let phone = document.getElementById('athlete-phone').value;
let address = document.getElementById('athlete-address').value;
let gender = document.getElementById('athlete-gender').value;
let country = document.getElementById('athlete-country').value;
let height = document.getElementById('athlete-height').value;
let weight = document.getElementById('athlete-weight').value;
let position = document.getElementById('athlete-position').value;
let marital_status = document.getElementById('athlete-marital-status').value;
let next_of_kin = document.getElementById('athlete-next-of-kin').value;
let next_of_kin_phone = document.getElementById('athlete-next-of-kin-phone').value;
let next_of_kin_address = document.getElementById('athlete-next-of-kin-address').value;
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
          name: name,
          email: email,
          role: 'athlete',
          age: age,
          phone: phone,
          address: address,
          gender: gender,
          country: country,
          height: height,
          weight: weight,
          position: position,
          marital_status: marital_status,
          next_of_kin: next_of_kin,
          next_of_kin_phone: next_of_kin_phone,
          next_of_kin_address: next_of_kin_address,
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
let registerScout = document.getElementById('register-scout');
if (registerScout) {
  registerScout.addEventListener('click', (e) => {
    e.preventDefault();

        // Show the loading popup during registration
        document.getElementById('loadingPopup').style.display = 'block';

    // Get the values of the password and confirm password fields
    var password = document.getElementById('scout-password').value;
    var confirmPassword = document.getElementById('confirm-scout-password').value;

    // Perform the check if they are the same
    if (password !== confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }

    // Create scout data
    var email = document.getElementById('scout-email').value;
    let scoutName = document.getElementById('scout-name').value;
    let choiceOfSports = document.getElementById('scout-choice').value;
    let scoutPhone = document.getElementById('scout-phone').value;
    let scoutSex = document.getElementById('scout-sex').value;
    let scoutAge = document.getElementById('scout-age').value;
    let scoutNationality = document.getElementById('scout-nationality').value;
    let scoutAddress = document.getElementById('scout-address').value;

    // Create the user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Set the additional user information in the Firebase Firestore or Realtime Database
        var user = userCredential.user;
        console.log('User', user.email);
        console.log(user.uid);

        var userDocRef = firebase.firestore().collection('users').doc(user.uid);

        return userDocRef.set({
          scoutName: scoutName,
          email: email,
          role: 'scout',
          scoutAddress: scoutAddress,
          scoutSex: scoutSex,
          scoutAge: scoutAge,
          scoutPhone: scoutPhone,
          scoutNationality: scoutNationality,
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
          } else if (role === "scout") {
              window.location.href = ("../dashboard/scout-dashboard/template/index.html"); // Scout dashboard
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