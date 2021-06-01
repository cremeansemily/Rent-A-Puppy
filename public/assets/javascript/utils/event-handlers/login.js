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
    } else if (!email) {
        alertUser('Email cannot be blank!');
    }
    if (email && password) {
        // check email format, the server will check anyways but best to check here too
        // check password length, we need 8 characters
        if (password.length <= 7) {
            return alertUser('Passwords must be 8 characters')
        }
        // check email for valid formats
        if (!email.match(isEmail)) {
            return alertUser('Please enter a valid email\n example@emample.com')
        }
        // check for owner/user logins
        // console.log(location.host)

        let url;
        if (identifier === 'owner') {
            url =   '/api/owners/login'
        }
        else { url =   '/api/users/login' };
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

            if (identifier === 'user') {
                // const id = data.user.id;
                const redirect = btn.getAttribute('data-redir');
                if(redirect === null){
                    window.location.replace(`/user/home`);
                }else{
                    window.location.replace(redirect);
                }
                
                
            } else {
                const id = data.owner.id;
                window.location.replace(`/dashboard/owner/${id}`);
            }

        } else if (response.status === 404) {
            alertUser("No User With That Email Exists");
        } else if (response.status === 400) {
            alertUser('Invalid Password!')
        }


    }
}
btn.addEventListener('click', signInFormHandler)



