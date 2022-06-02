//Declate views 
let loading_Display = document.getElementById('loading-Display');
let loginDisplay = document.getElementById('login-section');
let pagePrincipalDisplay = document.getElementById('principalPage');
let principalPage = document.getElementById('principalPage');
let userCard = document.getElementsByClassName('userCard');

//Declarate Sub-views 
let font_form_register = document.getElementById('font-form-register');
let font_form_login = document.getElementById('font-form-login');
//Link registor-login 

const showWindow = () => {
    if (font_form_login.classList.contains('displayFlex')) {
        font_form_login.classList.remove('displayFlex');
        font_form_register.classList.add('displayFlex');
        return;
    }else if(font_form_register.classList.contains('displayFlex')){
        font_form_register.classList.remove('displayFlex');
        font_form_login.classList.add('displayFlex');
        return;
    }
}

document.getElementById('link-register').addEventListener('click', showWindow);
document.getElementById('link-login').addEventListener('click', showWindow);

//SweetAlert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
//Creating users 

//Class USER
class users {
    //Constructor de ususarios 
    constructor(nroDocumento, firstName, lastName, email, password) {
        this.nroDocumento = nroDocumento;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    };
}
let USERS = [];

const createUser = () => {
    //Obtenemos valores de los inputs html
    let NDS = document.getElementById('input-documentNumber').value;
    let FNS = document.getElementById('input-firstName').value;
    let LNS = document.getElementById('input-lastName').value;
    let ES = document.getElementById('input-email-register').value;
    let PS = document.getElementById('input-password-register').value;
    let CPS = document.getElementById('input-confirmPassword').value;

    //Validamos que todo esté correcto
    for (let i = 0; i < USERS.length || USERS.length == 0; i++) {
        if (NDS.length == 0 || FNS.length == 0 || LNS.length == 0 || ES.length == 0 || PS.length == 0 || CPS.length == 0) {
            Toast.fire({
                icon: 'error',
                title: 'Register Error, You have empty fields'
            })
            break;  
        }else if(USERS.length == 0||(NDS != USERS[i].nroDocumento)) {
            if((i == USERS.length-1 || USERS.length == 0) && PS == CPS){
                let newUser = new users(NDS, FNS, LNS, ES, PS);
                USERS.push(newUser);
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
                localStorage.setItem(USERS.length+1, JSON.stringify(newUser));
                break;
            }else if( PS != CPS){
                Toast.fire({
                    icon: 'error',
                    title: 'Register Error, The passwords are not the same'
                })
                break;  
            }
        }else if((NDS == USERS[i].nroDocumento)){
            Toast.fire({
                icon: 'error',
                title: 'Register Error, The user is already registered'
            })
            break;  
        };

        
        
    };
    
};

//Obtener datos de la base de datos 
const dataBase = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let user = JSON.parse(data);

        USERS.push(user);
    };
};

//Change loading display for page principal display
const changePage = () => {
    loading_Display.classList.remove('displayBlock');
    pagePrincipalDisplay.classList.add('displayFlex');
};

//Mostrar datos 

const showData = () => {
    if (principalPage.classList.contains('displayFlex')) {
        
        let usersContainer = document.getElementById('usersContainer');
        let fragment = document.createDocumentFragment();
        for (let elemento of USERS) {
            let newDiv = document.createElement('div');
            let newImg = document.createElement('img');
            let newH4 = document.createElement('h4');
            let newP = document.createElement('p');
            newImg.setAttribute('src', '/img/img-3.jpeg');
            newImg.setAttribute('alt', 'imgPerfil');
            newH4.innerHTML = `${elemento.firstName}  ${elemento.lastName}`;
            newP.innerHTML = `${elemento.nroDocumento}`;
            newDiv.classList.add('userCard');
            newDiv.appendChild(newImg);
            newDiv.appendChild(newH4);
            newDiv.appendChild(newP);

            fragment.appendChild(newDiv);
        };
    
        usersContainer.appendChild(fragment);

    };

};

//Login function 
const loginFunction = ()=> {
    let ES = document.getElementById('input-email-login').value;
    let PS = document.getElementById('input-password-login').value;

    for (let i = 0; i < USERS.length; i++) {
        if (ES == USERS[i].email && PS == USERS[i].password) {
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
            let showLoadingScreen = setTimeout(()=>{
                loading_Display.classList.add('displayBlock');
                loginDisplay.classList.remove('displayFlex');
            },4000);
            let showPagePrincipal = setTimeout(changePage, 8000);
            let showDataDisplay = setTimeout(showData, 8100);
            sessionStorage.setItem('logueado', true);
            break;
           
        }else if(ES.length == 0 || PS.length == 0) {
            Toast.fire({
                icon: 'error',
                title: 'Login Error, You have empty fields'
            })
            break;  
        }else if(ES != USERS[i].email || PS != USERS[i].password){
            if (i == USERS.length-1) {
                Toast.fire({
                    icon: 'error',
                    title: "Login Error, Your credentials don't match"
                })
                break; 
            };
        }
        
    }
}

//verify of the user login 

const verify = () => {
    if (sessionStorage.getItem('logueado') == 'true') {
        loginDisplay.classList.remove('displayFlex');
        pagePrincipalDisplay.classList.add('displayFlex');
    };
};

//Close sesion

const closeSesion = () => {
    sessionStorage.removeItem('logueado');
}

//Create User - Page Principal

const createUserPG = () => {
    (async() => {
        const { value: formValues } = await Swal.fire({
            title: 'Register User',
            html:
            '<div class="formregister-container align-items-center overflow-scroll">'+
                '<form>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="number" placeholder="Document Number" id="swal-input1" class="form-control input-Login" required>'+
                        '<label for="swal-input1">Document Number</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-user"></i></span>'+
                    '</div>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="text" placeholder="First Name" id="swal-input2" class="form-control input-Login" required>'+
                        '<label for="swal-input2">First Name</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-user"></i></span>'+
                    '</div>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="text" placeholder="Last Name" id="swal-input3" class="form-control input-Login" required>'+
                        '<label for="swal-input3">Last Name</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-user"></i></span>'+
                    '</div>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="email" placeholder="Email" id="swal-input4" class="form-control input-Login" required>'+
                        '<label for="swal-input4">Email</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-at"></i></span>'+
                    '</div>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="password" placeholder="Password" id="swal-input5" class="form-control input-Login" required>'+
                        '<label for="swal-input5">Password</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>'+
                    '</div>'+
                    '<div class="register-input-container form-floating">'+
                        '<input type="password" placeholder="Password" id="swal-input6" class="form-control input-Login" required>'+
                        '<label for="swal-input6">Confirm Password</label>'+
                        '<span class="input-group-text spanText" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>'+
                    '</div>'+
                '</form>'+
            '</div>',
              
            focusConfirm: false,
            preConfirm: () => {
                let NDS = document.getElementById('swal-input1').value;
                let FNS = document.getElementById('swal-input2').value;
                let LNS = document.getElementById('swal-input3').value;
                let ES = document.getElementById('swal-input4').value;
                let PS = document.getElementById('swal-input5').value;
                let CPS = document.getElementById('swal-input6').value;

                //Validamos que todo esté correcto
                for (let i = 0; i < USERS.length || USERS.length == 0; i++) {
                    if (NDS.length == 0 || FNS.length == 0 || LNS.length == 0 || ES.length == 0 || PS.length == 0 || CPS.length == 0) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Register Error, You have empty fields'
                        })
                        break;  
                    }else if(USERS.length == 0||(NDS != USERS[i].nroDocumento)) {
                        if((i == USERS.length-1 || USERS.length == 0) && PS == CPS){
                            let newUser = new users(NDS, FNS, LNS, ES, PS);
                            USERS.push(newUser);
                            Toast.fire({
                                icon: 'success',
                                title: 'Signed in successfully'
                            })
                            localStorage.setItem(USERS.length+1, JSON.stringify(newUser));
                            document.location.reload();
                            break;
                        }else if( PS != CPS){
                            Toast.fire({
                                icon: 'error',
                                title: 'Register Error, The passwords are not the same'
                            })
                            break;  
                        }
                    }else if((NDS == USERS[i].nroDocumento)){
                        Toast.fire({
                            icon: 'error',
                            title: 'Register Error, The user is already registered'
                        })
                        break;  
                    }; 
                };
            }
        });
    })();
}

//Show data details


//Call function 
document.getElementById('btn-register').addEventListener('click', createUser);
document.addEventListener('load', dataBase());
document.addEventListener('load', verify());
document.addEventListener('load', showData());
document.getElementById('btn-login').addEventListener('click', loginFunction);
document.getElementById('btn-close').addEventListener('click', closeSesion);
document.getElementById('btnAdd').addEventListener('click', createUserPG);
for (let elemento of userCard) {
    elemento.addEventListener('click', showDataDetails);
}
