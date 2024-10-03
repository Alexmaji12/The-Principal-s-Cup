
	const firebaseConfig = {
		apiKey: "AIzaSyBLc5JHSbwJFjx0kLvDziTK1F1bCoe8MMo",
		authDomain: "final-year-d05fa.firebaseapp.com",
		projectId: "final-year-d05fa",
		storageBucket: "final-year-d05fa.appspot.com",
		messagingSenderId: "837604640880",
		appId: "1:837604640880:web:63b23487f69eeb3852ccb5",
		measurementId: "G-JSTZJR8FDX"
	};
	
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
						// access athlete data

						var email = doc.data().email;
							var name = doc.data().name;
						
							var athletePosition = doc.data().position;
							var athleteHeight = doc.data().height;
							var athleteWeight = doc.data().weight;
							var athleteCountry = doc.data().country;
							var athleteAge = doc.data().age;
							var athletePhone = doc.data().phone;
		
							// Set user details on the dashboard
							var nameElement = document.getElementById('userName');
							if (nameElement != null) {
								nameElement.innerText = name; 
							}
		
							var countryElement = document.getElementById('userCountry');
							if (countryElement != null) {
								countryElement.innerText = athleteCountry;
							}

							var heightElement = document.getElementById('userHeight');
							if (heightElement != null) {
								heightElement.innerText = athleteHeight;
							}

							var weightElement = document.getElementById('userWeight');
							if (weightElement != null) {
								weightElement.innerText = athleteWeight;
							}

							var positionElement = document.getElementById('userPosition');
							if (positionElement != null) {
								positionElement.innerText = athletePosition;
							}

							var emailElement = document.getElementById('userEmail');
							if (emailElement != null) {
								emailElement.textContent = email;
							}
		
							var phoneElement = document.getElementById('userPhone');
							if (phoneElement != null) {
								phoneElement.innerText = athletePhone;
							}
		
							var ageElement = document.getElementById('userAge');
							if (ageElement != null) {
								ageElement.innerText = athleteAge;
							}
	
				
	
					} else if (role === "scout") {
							// Access scout user data
							var email = doc.data().email;
							var name = doc.data().scoutName;
							var scoutNationality = doc.data().scoutNationality;
							var scoutPhone = doc.data().scoutPhone;
							var scoutAge = doc.data().scoutAge;
							var choiceOfSports = doc.data().choiceOfSports;
		
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

							var choiceOfSportsElement = document.getElementById('choiceOfSports');
							if (choiceOfSportsElement != null) {
								choiceOfSportsElement.innerText = choiceOfSports;
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

			// Fetch athletes from Firestore
database.collection("users").where("role", "==", "athlete").get().then((querySnapshot) => {
    const athleteTableBody = document.querySelector("#athleteTable tbody"); // Targeting specific tbody
    athleteTableBody.innerHTML = ""; // Clear existing rows
    
    querySnapshot.forEach((doc) => {
        const athleteData = doc.data();
        const athleteRow = `
            <tr>
                <td>${athleteData.name || 'Not Available'}</td>
                <td>${athleteData.age || 'Not Available'}</td>
                <td>${athleteData.country || 'Not Available'}</td>
                <td>${athleteData.height || 'Not Available'}</td>
                <td>${athleteData.weight || 'Not Available'}</td>
                <td>${athleteData.position || 'Not Available'}</td>
                <td><a href="${athleteData.mediaLink || '#'}">Media Link</a></td>
                <td>${athleteData.dominantSkill || 'Not Available'}</td>
                <td>
                    <label class="badge badge-danger">
                        <a href="tel:${athleteData.phone || '#'}" style="color: white; font-weight: bolder;">
                            ${athleteData.phone ? athleteData.phone : 'Unavailable'}
                        </a>
                    </label>
                </td>
            </tr>
        `;
        athleteTableBody.insertAdjacentHTML('beforeend', athleteRow);
    });
}).catch((error) => {
    console.log("Error getting athletes: ", error);
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
