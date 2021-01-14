var users;
var erorrContainer=document.querySelector('.error-container')
var formContainer=document.querySelector('.form-container')
var allInputs=document.querySelectorAll('input')
var test=null

var container=document.getElementById('signIn-container')
var nameInput=document.getElementById('name')
var emailInput=document.getElementById('email')
var passwordInput=document.getElementById('password')
var signUpButton=document.getElementById('signup')

var emailSignInInput=document.getElementById('email-signIn')
var passwordSignInInput=document.getElementById('password-signIn')
var signInButton=document.getElementById('signIn')

var user =document.getElementById('user')
var logOutButton=document.getElementById('logOut')


if(JSON.parse(localStorage.getItem('storageUsers'))==null){
    
    users=[]
    
}else{

    users=JSON.parse(localStorage.getItem('storageUsers'))

}




if(logOutButton){
    /////////////////
    var email =localStorage.getItem('userEmail')
    var theUsers=JSON.parse(localStorage.getItem('storageUsers'))
    var theName=''
    for(i=0;i<theUsers.length;i++){
        if(email === theUsers[i].email){
            theName=theUsers[i].name
        }
    } 
    formContainer.innerHTML=`<h1>welcome ${theName}</h1>`
    logOutButton.addEventListener('click',function(){
       logOut()
    })
}


if(signUpButton){

    emailInput.addEventListener('keyup',function(){
        if(emailUsed()){
            signUpValidationFail('the email is already used')
        }else if(!validAsEmail()){
            signUpValidationFail('enter a valid email')
        }else{
            signUpValidationSuccess()
        }
    })

    

    signUpButton.addEventListener('click',function(){
        if(emailUsed()){
            signUpValidationFail('the email is already used')
        }else if(anyInputIsEmpty()){
            signUpValidationFail('all inputs are required')
        }else if(!validAsEmail()){
            signUpValidationFail('enter a valid email')
        }else{
            signUpValidationSuccess()
            registration()
        }
        
    })

}

if(signInButton){

    emailSignInInput.addEventListener('keyup',function(){
        if(EmailLoginIsCorrect()){
            signInValidationSuccess()
            passwordSignInInput.addEventListener('keyup',function(){
                for(i=0;i<users.length;i++){
                    if(emailSignInInput.value===users[i].email){
                        if(passwordSignInInput.value===users[i].password){
                            signInValidationSuccess()
                        }else{
                            signInValidationFail('password fail')
                        }
                    }
                }
            })
        }else{
            signInValidationFail('email fail')
        }
    })

    signInButton.addEventListener('click',function(){

        emptyInputsCheck()
        
        for(i=0;i<users.length;i++){
            if(emailSignInInput.value===users[i].email){
                if(passwordSignInInput.value===users[i].password){
                    signInValidationSuccess()
                }else{
                    signInValidationFail('password fail')
                }
            }
        }

        if(test){
            handleLoginSuccess()
        }
    
    })

}

function registration(){
   if(test){

    var user={
        name:nameInput.value,
        email:emailInput.value,
        password:passwordInput.value
    }
    users.push(user)
    localStorage.setItem('storageUsers',JSON.stringify(users))
    
    window.location.href = "home.html"
    localStorage.setItem('userEmail',emailInput.value)

   }
}

function EmailLoginIsCorrect(){

    for(i=0;i<users.length;i++){
        if(emailSignInInput.value===users[i].email){
            return true
        }
    }

}



function emailUsed(){

    for(i=0;i<users.length;i++){
        if(emailInput.value===users[i].email){
            return true
        }
    }

}

function handleLoginSuccess(){

window.location.href = "home.html"

localStorage.setItem('userEmail',emailSignInInput.value)

}

function logOut(){
    localStorage.removeItem("userName");
    window.location.href = "index.html"
}

function anyInputIsEmpty(){
 return emailInput.value==='' || passwordInput.value==='' || nameInput.value===''
}

function signInValidationSuccess(){
    erorrContainer.innerText=''
    signInButton.disabled=false
    test=true
}

function signInValidationFail(msg){
    erorrContainer.innerText=msg
    signInButton.disabled=true
    test=false
}

function emptyInputsCheck(){
    if(emailSignInInput.value==='' || passwordSignInInput.value===''){
        signInValidationFail('all inputs are required')
    }else{
        signInValidationSuccess('')
    }
}

function signUpValidationSuccess(){
    erorrContainer.innerText=''
    signUpButton.disabled=false
    test=true
}

function signUpValidationFail(msg){
    erorrContainer.innerText=msg
    signUpButton.disabled=true
    test=false
}

function validAsEmail(){
    var emailRegex=/^[A-Za-z0-9]{1,10}\@[A-Za-z]{1,10}\.[A-Za-z]{2,10}$/
    if(emailRegex.test(emailInput.value)){
        return true
    }
}

