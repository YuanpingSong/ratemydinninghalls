

let avgRate;
let rateForm;
let rateInput;

let submitButton;


let database;
let storage;

let ratesRef;

let provider;

let saveRate = (eve) => {
  eve.preventDefault();
  console.log(rateInput.value)
 // Check that the user entered a message and is signed in.
 if (!isNaN(rateInput.value) && (rateInput.value >= '0') && (rateInput.value <= '5')) {
   // Add a new message entry to the Firebase Database.
   ratesRef.push({
     text: rateInput.value
   }).then(() => {
     // Clear message text field and SEND button state.
     resetInput(rateInput);
     toggleButton();
   }).catch((error) => {
     console.error('Error writing new message to Firebase Database', error);
   });
 }
};

let loadRate = () => {
 // Reference to the /messages/ database path.
 ratesRef = database.ref('ucla-dining-rate');
 // Make sure we remove all previous listeners.
 ratesRef.off();
 let rate = 0;
 let counter = 1;

 // Loads the last 20 messages and listen for new ones.
 let updateRate = (data) => {
   let val = data.val();
   rate = (parseInt(val.text) + rate)/counter;
   counter++;
 };

 ratesRef.limitToLast(100).on('child_added', updateRate);
 ratesRef.limitToLast(100).on('child_changed', updateRate);


};

let resetInput = (element) => {
 element.value = '';
};

let toggleButton = () => {
 if (rateInput.value) {
   submitButton.removeAttribute('disabled');
 } else {
   submitButton.setAttribute('disabled', 'true');
 }
};

let initFirebase = () => {
 // Shortcuts to Firebase SDK features.
 auth = firebase.auth();
 database = firebase.database();
 storage = firebase.storage();
 
};

let init = () => {
 //messageList = document.getElementById('messages');
 rateForm = document.getElementById('rate-form');
 rateInput = document.getElementById('rate');
 submitButton = document.getElementById('submit');
 userPic = document.getElementById('user-pic');

 // Saves message on form submit.
 rateForm.addEventListener('submit', saveRate);

 // Toggle for the button.
 rateInput.addEventListener('keyup', toggleButton);
 rateInput.addEventListener('change', toggleButton);

 initFirebase();
}

init();