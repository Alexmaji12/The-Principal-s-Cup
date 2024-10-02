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
	``
	firebase.initializeApp(firebaseConfig);
	// Initialize Firebase
	const auth = firebase.auth();
	
	const database = firebase.firestore();
	
	var userID = firebase.auth().currentUser
	
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
	
			userID = user.uid;
	
			console.log("Logged In");
			console.log(userID);
	
			// Save authentication state to localStorage
			localStorage.setItem('user', JSON.stringify(user));
	
			database.collection("users").doc(userID).get().then(function (doc) {
				if (doc.exists) {
					console.log("Document data: ", doc.data());
	
					const userData = doc.data();
					var role = userData.role;
	
					if (role === "athlete") {
						// access users data
						// var email = doc.data().email;
						// var name = doc.data().scoutName;
						// var scoutNationality = doc.data().scoutNationality;
						// var phone = doc.data().scoutPhone;
						// var age = doc.data().scoutAge;
	
						// var name = document.getElementById('userName');
						// if (fullname != null) {
						// 	fullname.innerText = name;
						// }
	
						// var email = document.getElementById('userEmail');
						// if (userEmail != null) {
						// 	userEmail.textContent = email;
						// }
	
						// var nationality = document.getElementById('userNationality');
						// if (nationality != null) {
						// 	nationality.innerText = scoutNationality;
						// }
	
					} else if (role === "scout") {
							// Access scout user data
							var email = doc.data().email;
							var name = doc.data().scoutName;
							var scoutNationality = doc.data().scoutNationality;
							var scoutPhone = doc.data().scoutPhone;
							var scoutAge = doc.data().scoutAge;
		
							// Set user details on the dashboard
							var nameElement = document.getElementById('userName');
							if (nameElement != null) {
								nameElement.innerText = name; 
							}
		
							var emailElement = document.getElementById('userEmail');
							if (emailElement != null) {
								emailElement.textContent = email;
							}
		
							var nationalityElement = document.getElementById('userNationality');
							if (nationalityElement != null) {
								nationalityElement.innerText = scoutNationality;
							}
		
							var phoneElement = document.getElementById('userPhone');
							if (phoneElement != null) {
								phoneElement.innerText = scoutPhone;
							}
		
							var ageElement = document.getElementById('userAge');
							if (ageElement != null) {
								ageElement.innerText = scoutAge;
							}
	
						// 	const { scoutName, email, scoutNationality, scoutPhone, scoutAge } = userData;
	
						// document.getElementById('userName').innerText = scoutName || "N/A";
						// document.getElementById('userEmail').innerText = email || "N/A";
						// document.getElementById('userNationality').innerText = scoutNationality || "N/A";
						// document.getElementById('userPhone').innerText = scoutPhone || "N/A";
						// document.getElementById('userAge').innerText = scoutAge || "N/A";
					} else {
						console.log("nothing here")
					}
	
	
	
	
	
				}
	
			}).catch(function (error) {
				console.log("Error getting document:", error)
			});
	
	
			document.getElementById('signout').addEventListener('click', function () {
				auth.signOut().then(() => {
					console.log("User signed out successfully.");
					localStorage.removeItem('user'); // Remove auth state from storage
					window.location = "form-index.html";
				}).catch(error => {
					console.error("Error signing out: ", error);
				});
	
			});
	
			return;
	
		} else if (window.location.pathname !== 'login/login.html') {
			// Check if user authentication state is saved in localStorage
			const savedUser = localStorage.getItem('user');
			if (savedUser) {
				window.location.pathname = "dashboard.html";
			} else {
				window.location.pathname = "login/login.html";
			}
	
		}
	
	})
}
