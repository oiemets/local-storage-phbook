class User {
    constructor(firstname, lastname, email, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phonebook = [];
    }
};

class Contact {
    constructor(firstname, lastname, phone, email){
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
    }
};

function displayToggler(v) {
    [addNewContactForm, logInForm, signInForm, contactsTable]
    .forEach( (i) => {
        if(i === v) {
            i.style.display = '';
        } else {
            i.style.display = 'none';
        }
    })
};

function addUser(user) {
    if(!localStorage.getItem('storage')) {
        localStorage.setItem('storage', '[]');
    }
    let storage = JSON.parse(localStorage.getItem('storage'));
    storage.push(user);
    localStorage.setItem('storage', JSON.stringify(storage));
};

function throwAlert() {
    displayToggler();
    alert.classList.add('alert', 'alert-danger');
    alert.innerText = 'User not found. Please, sign in first!';
    setTimeout( () => {
        alert.classList.remove('alert', 'alert-danger');
        alert.innerText = '';
        }, 3000 )
};
    
function getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('current'));
    if(currentUser){
        return currentUser;
    } 
};

function contactsRendering() {
    displayToggler(contactsTable);
    if(getCurrentUser()){
        let currentUserPhBook = getCurrentUser().phonebook;
    contactsTableTbody.innerHTML = currentUserPhBook.map( (user, index) => {
        return `<tr>
                    <th scope="row">${++index}</th>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                </tr>`
                }).join(''); 
    }
};

function startin(){
    if(localStorage.getItem('current')) {
        contactsRendering();
        currentUser.innerHTML = getCurrentUser().email;
        logOutBtn.style.display = '';
    } else {
        displayToggler(logInForm);
        currentUser.innerHTML = '';
        logOutBtn.style.display = 'none';
    }
};



