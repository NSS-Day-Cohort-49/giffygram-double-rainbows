import { getUsers, sendUsers } from "../data/provider.js"

export const newUserSignUp = () => {
	
	const users = getUsers()

	const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value
        const firstName = document.querySelector("input[name='first_name']").value
        const lastName = document.querySelector("input[name='last_name']").value

	const checkDuplicateEmail = users.find(user => user.email === email)

	if (checkDuplicateEmail){
		
		window.alert("This email already exist. Please log in")
		console.log("This email already exist. Please log in",checkDuplicateEmail, email, password, firstName,lastName)
	}
	else{

	const sendToAPI = {

		name: firstName,
		surname: lastName,
		email: email,
		password: password,
		profile_pic: "./images/generic_profile_pic.png"	
	}
       
	sendUsers(sendToAPI)
	}
}



export const newUserSignUpForm = () => {

	return `
	<div class="signUpForm">
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
                <fieldset>
                    <label for="first_name">First Name:</label>
                    <input type="first_name" name="first_name" placeholder="First Name" />
                </fieldset>
                <fieldset>
                    <label for="last_name">Last Name:</label>
                    <input type="last_name" name="last_name" placeholder="Last Name" />
                </fieldset>
           
		</form>
            <button id="submitSignUpButton">Sign Up</button>
        </div>
	
	
	
	`
}


document.addEventListener("click", (event) => {
	if (event.target.id === "submitSignUpButton"){
		newUserSignUp()
	}
})
