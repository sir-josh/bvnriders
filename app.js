//Init Rave class
const rave = new RaveGateWay;

//Add event listener to continue button
document.querySelector('#submit-btn').addEventListener('click', function(e){
    let firstname = document.getElementById('firstname'),
         lastname = document.getElementById('lastname'),
         dob = document.getElementById('dob'),
         phone = document.getElementById('phone');
         
     
    //get user bvn value
    const userBVN = document.getElementById('bvn');
    //get feedback element
    const feedback = document.getElementById('feedback');

    //Check to see if the input is not empty
    if(userBVN.value != ''){
        document.getElementById('loader').style.display = 'block';

        //make http call to flutterwave api through rave.js class
        rave.getUser(userBVN.value)
            .then(result => {
                //Check the response status of the fetch call and validity of the user input
                if(result.status === 'success' && userBVN.value.length === 11){
                    //Give necessary feedback to the user if the BVN is valid
                    if(userBVN.classList.contains('is-invalid') || !(userBVN.classList.contains('is-valid')) ){
                        document.getElementById('loader').style.display = 'none';
                        userBVN.classList.remove('is-invalid');
                        userBVN.className += ' is-valid';
                        feedback.innerHTML = "Valid BVN!";
                    }
                    
                    setTimeout(function(){
                        document.querySelector('.form-field').style.display = 'none';
                        //Display user details after 2.5 secs
                        if(document.querySelector('#card').parentElement.classList.contains('col-md-6')){
                            document.querySelector('#card').parentElement.className = 'col-md-9 mx-auto mt-3 pt-5';
                            document.querySelector('#card').style.display = 'block';
                        }
                    },2500);
                    console.log(result.data);
                     firstname.setAttribute('placeholder',result.data.first_name);
                     lastname.setAttribute('placeholder',result.data.last_name);
                     dob.setAttribute('placeholder',result.data.date_of_birth);
                     phone.setAttribute('placeholder',result.data.phone_number);
                                      
                }else{
                   //Give necessary feedback if the BVN is not valid and let it disappear after 3 secs
                    if((userBVN.classList.contains('is-valid')) || (feedback.classList.contains('valid-feedback'))){
                        userBVN.classList.remove('is-valid');
                        userBVN.className += ' is-invalid';
                        feedback.classList.remove('valid-feeback');
                        feedback.className = 'invalid-feedback';
                        feedback.innerHTML = "Invalid entry and please retry again with correct bvn";
                        document.getElementById('loader').style.display = 'none'; 
                    }   
                    setTimeout(function(){
                        document.getElementById('feedback').classList.remove('invalid-feedback');
                        document.getElementById('feedback').className ='valid-feedback';
                        userBVN.classList.remove('is-invalid');
                        feedback.innerHTML = "";
                    },3000);
                }
            });
    }else{
        //This Checks for empty input and prompt the user to insert BVN 
        userBVN.className += ' is-invalid';
        feedback.classList.remove('valid-feeback');
        feedback.className = 'invalid-feedback';
        feedback.innerHTML = "Please insert your BVN";
        
        setTimeout(function(){
            document.getElementById('feedback').classList.remove('invalid-feedback');
            document.getElementById('feedback').className ='valid-feedback';
            userBVN.classList.remove('is-invalid');
            feedback.innerHTML = "";
        },2000);
    }

    e.preventDefault();
})