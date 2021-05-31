const btn = document.getElementById('signup-btn');
const alertContainer = document.getElementById('alert-container');
const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let ownername;
let username;
let url;
async function signInFormHandler(event) {
    const identifier = document.getElementById('email').getAttribute('data-ident');
    event.preventDefault();
    if (identifier === 'owner') {
        url = '/api/owners';
        ownername = document.getElementById('ownerName').value.trim();
        user = ownername;
    } else {
        url = '/api/users';
        username = document.getElementById('userName').value.trim();
        user = username;

    }
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();


    // alert errors
    // check for blank fields
    if (!email && !password && !user) {
        alertUser('Fields cannot be blank!');
    } else if (!password) {
        alertUser('Password cannot be blank!');
    } else if (!email) {
        alertUser('Email cannot be blank!');
    } else if (!user) {
        let alert;
        identifier === 'user' ? alert = 'Username' : alert = 'Ownername';
        alertUser(`${alert} cannot be blank!`);
    }
    if (email && password && user) {
        // check email format, the server will check anyways but best to check here too
        // check password length, we need 8 characters
        if (password.length <= 7) {
            return alertUser('Passwords must be 8 characters')
        }
        // check email for valid formats
        if (!email.match(isEmail)) {
            return alertUser('Please enter a valid email\n example@emample.com')
        }
        if (user.length <= 4) {
            return alertUser("Usernames must be at least 5 characters!");
        }
        // check for owner/user logins

        // the /login route isn't working through this fetch, if you type it in the browser it works?
        if (ownername) {
            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify({
                    ownername,
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response)
                .catch(e => console.log(e, "Error logging in"));
            if (response.ok) {
                const data = await response.json();
                const id = data.owner.id;
                console.log(req.session);
                window.location.replace(`/dashboard/owner/${id}`);
            } else {
                // if bad response send message from server to user
                const d = await response.json();
                return alertUser(d);
            }



        } else if (username) {
            const userResponse = await fetch(url, {
                method: 'post',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(userResponse => userResponse)
                .catch(e => console.log(e, "Error logging in"));
            if (userResponse.ok) {
                const data = await userResponse.json();
                const id = data.user.id;
                window.location.replace(`/dashboard/user/${id}`);
            } else {
                // if bad response send message from server to user
                const d = await userResponse.json();
                return alertUser(d);
            }

        }
    }
}
btn.addEventListener('click', signInFormHandler)



