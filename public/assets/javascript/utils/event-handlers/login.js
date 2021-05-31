const btn = document.getElementById('login-btn');
const alertContainer = document.getElementById('alert-container');
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
async function signInFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const identifier = document.getElementById('email').getAttribute('data-ident');

    // alert errors
    // check for blank fields
    if (!email && !password) {
        alertUser('Fields cannot be blank!');
    } else if (!password) {
        alertUser('Password cannot be blank!');
    }else if (!email) {
        alertUser('Email cannot be blank!');
    }

    if (email && password) {

        // check email format, the server will check anyways but best to check here too
        // check password length, we need 8 characters
        if(password.length <=7){
            return alertUser('Passwords must be 8 characters')
        }
        // check email for valid formats
        if(!email.match(isEmail)){
            return alertUser('Please enter a valid email\n example@emample.com')
        }
        let url = '/api/users/login';
        if (identifier === 'owner') url = '/api/owner/login';
        // the /login route isn't working through this fetch, if you type it in the browser it works?
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response)
            .catch(e => console.log(e, "Error logging in"));

        if (response.ok) {
            const data = await response.json();
            const id = data.user.id;
            window.location.replace(`/dashboard/user/${id}`);
        } else if (response.status === 404) {
            alertUser("No User With That Email Exists");
        } else if (response.status === 400) {
            alertUser('Invalid Password!')
            passwordAlert.textContent = "Invalid Password"
        }


        // .then(d => {
        //     console.log(d)
        //     if (d) {
        //         window.location.replace('/user/')
        //     } else {
        //         alert('Server Error!\nPlease try again');
        //         window.location.reload()
        //     }
        // })

        // check the response status

    }
}
btn.addEventListener('click', signInFormHandler)

function alertUser(message) {
    // need alert message
    const msg = message

    // return message with div to dom
    alertContainer.innerHTML =
        `<div id ='alert' role="alert">
    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    Warning
    </div>
    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>${msg}</p>
    </div>
    </div> 
    `
    const alert = document.getElementById('alert');
    const script = document.createElement('script');
    script.textContent = `
    function removeAlert(){
        const alert = document.getElementById('alert');
    
        setTimeout(function(){
            alert.remove();
        },5000)
    }
    removeAlert();
    `
    alert.appendChild(script)
}
// alert function
/*
document.getElementById('messageAlert').setAttribute("style", "visibility:visible")
document.getElementById("blank-field-alert").innerText=response.statusText
setTimeout(function(){document.getElementById('messageAlert').setAttribute("style", "visibility:collapse")},4000)

*/
