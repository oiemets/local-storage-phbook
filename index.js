const contactsBtn = document.querySelector('#contactsBtn');
const addContactBtn = document.querySelector('#addContactBtn');
const logInBtn = document.querySelector('#logInBtn');
const signInBtn = document.querySelector('#signInBtn');
const logOutBtn = document.querySelector('#logOutBtn');

const addNewContactForm = document.querySelector('#addNewContactForm');
const addFirstname = document.querySelector('#addFirstname');
const addLastname = document.querySelector('#addLastname');
const addPhone = document.querySelector('#addPhone');
const addEmail = document.querySelector('#addEmail');

const logInForm = document.querySelector('#logInForm');
const logEmail = document.querySelector('#logEmail');
const logPass = document.querySelector('#logPass');

const contactsTable = document.querySelector('#contactsTable');
const contactsTableTbody = document.querySelector('#contactsTable tbody');

const signInForm = document.querySelector('#signInForm');
const signFirstname = document.querySelector('#signFirstname');
const signLastname = document.querySelector('#signLastname');
const signEmail = document.querySelector('#signEmail');
const signPass = document.querySelector('#signPass');

const currentUser = document.querySelector('#currentUser');

const alert = document.querySelector('#alert');

startin();

contactsBtn.onclick = () => {
    contactsRendering();
};

addContactBtn.onclick = () => {
    displayToggler(addNewContactForm);
};

logInBtn.onclick = () => {
    displayToggler(logInForm);
};

signInBtn.onclick = () => {
    displayToggler(signInForm);
};

logOutBtn.onclick = () => {
    let current = JSON.parse(localStorage.getItem('current'));
    let storage = JSON.parse(localStorage.getItem('storage'));
    storage.push(current);
    localStorage.setItem('storage', JSON.stringify(storage));
    localStorage.removeItem('current');
    startin();
}

addNewContactForm.onsubmit = (e) => {
    e.preventDefault();
    let userUpdate = getCurrentUser();
    let userUpdatePhBook = userUpdate.phonebook;
    userUpdatePhBook.push(new Contact(addFirstname.value, addLastname.value, addPhone.value, addEmail.value));
    localStorage.setItem('current', JSON.stringify(userUpdate));
    [addFirstname, addLastname, addPhone, addEmail].forEach((i) => {i.value = ''});
}

logInForm.onsubmit = (e) => {
    e.preventDefault();
        let storage = JSON.parse(localStorage.getItem('storage'));
        if(storage === null) {
            throwAlert();
            setTimeout( () => displayToggler(signInForm),3000 ); 
        } else {
            let user = storage.find( (user) => {
                return user.email === logEmail.value && user.password === logPass.value;
            });
            if(user){
                localStorage.setItem('current', JSON.stringify(user));
                let updatedStorage = storage.filter( (item) => {
                    return item !== user;
                });
                localStorage.setItem('storage', JSON.stringify(updatedStorage));
                currentUser.innerHTML = getCurrentUser().email;
                logOutBtn.style.display = 'block';
                contactsRendering();
            } else {
                throwAlert();
                setTimeout( () => displayToggler(signInForm),3000 );
            }
        }
        logEmail.value = '';
        logPass.value = '';
    };

signInForm.onsubmit = () => {
    addUser(new User(signFirstname.value, signLastname.value, signEmail.value, signPass.value));
};