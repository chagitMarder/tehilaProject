// import {deletePatient} from "./fetchFunctions";


const BASE_URL = "http://localhost:3000"; // Assuming your backend is running on localhost:3000


document.addEventListener('DOMContentLoaded', function () {
    getAll()
    // graph();
});



//show a specific patient on click on the patients name from the list
function showPatient(patient) {    
    const patientDetails = `
    <strong>Email:</strong>   ${patient.email}<br>
    <strong>First Name:</strong>    ${patient.firstName}<br>
    <strong>Last Name:</strong>    ${patient.lastName}<br>
    <strong>ID:</strong>    ${patient.id}<br>
    <strong>Recovery Date:</strong>    ${new Date(patient.recoveryDate).toLocaleDateString()}<br>
    <strong>Sick Date:</strong>    ${new Date(patient.sickDate).toLocaleDateString()}<br>
    <strong>Vaccine Details:</strong><br>
                    ${patient.vaccineDate && patient.vaccineDate.vArray.length > 0 ? patient.vaccineDate.vArray.map(vaccine => `
    <span>     </span> Date:    ${new Date(vaccine.vDate).toLocaleDateString()}, Manufacturer: ${vaccine.vManufacturer}<br>
    `).join('') : 'No vaccine details available'}<br>
    <strong>Address:</strong>    ${patient.address.city+','} ${patient.address.street+','} ${patient.address.houseNumber}<br>
    <strong>Date of Birth:</strong>    ${patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not specified'}<br>
    <strong>Phone Number:</strong>    ${patient.phoneNumber ? patient.phoneNumber : 'Not specified'}<br>
    <strong>Celolar Phone Number:</strong>    ${patient.celolarPhoneNumber ? patient.celolarPhoneNumber : 'Not specified'}<br>
    `;
    document.getElementById('current-patient-details').innerHTML = `
        <p>${patientDetails}</p>
        <button id="delete-patient-btn">Delete Patient</button>
        <button id="update-patient-btn">Update Patient</button>
    `;    
    // Add event listener to the delete button
    document.getElementById('delete-patient-btn').addEventListener('click', () => {
        deletePatient(patient.id, patient.firstName);
    });
    document.getElementById('update-patient-btn').addEventListener('click', () => {
        showUpdateForm(patient);
    });    
}



//opens a form with all the requried fields. the relevant fields are filled with the patients details.
function showUpdateForm(patient) {
    document.getElementById('update-patient-form').style.display = 'block';
    document.getElementById('email2').value = patient.email;
    document.getElementById('firstName2').value = patient.firstName;
    document.getElementById('lastName2').value = patient.lastName;
    document.getElementById('id2').value = patient.id;
    document.getElementById('recoveryDate2').value = patient.recoveryDate2 ? new Date(patient.recoveryDate2).toISOString().split('T')[0] : '';
    document.getElementById('sickDate2').value = patient.sickDate ? new Date(patient.sickDate).toISOString().split('T')[0] : '';
    patient.vaccineDate.vArray.map(vaccine => {
        document.getElementById('vaccineDate2').value = vaccine.vDate ? new Date(vaccine.vDate).toISOString().split('T')[0] : '';;
        document.getElementById('vaccineManu2').value = vaccine.vManufacturer;
    })
    document.getElementById('addressCity2').value = patient.address.city;  
    document.getElementById('addressStreet2').value = patient.address.street;
    document.getElementById('addressCity2').value = patient.address.city;    
    document.getElementById('addressHouseNumber2').value = patient.address.houseNumber;
    document.getElementById('dateOfBirth2').value = patient.dateOfBirth;  
    document.getElementById('phoneNumber2').value = patient.phoneNumber;    
    document.getElementById('celolarPhoneNumber2').value = patient.celolarPhoneNumber;  
}





//on clike on the save button in the update form, it updates the details and send them to the function
document.getElementById('update-save-btn').addEventListener('click', function () {
    const email = document.getElementById('email2').value;
    const firstName = document.getElementById('firstName2').value;
    const lastName = document.getElementById('lastName2').value;
    const id = document.getElementById('id2').value;
    const recoveryDate = document.getElementById('recoveryDate2').value;
    const sickDate = document.getElementById('sickDate2').value;
    const vaccineDate = document.getElementById('vaccineDate2').value;
    const vaccineManufacturer = document.getElementById('vaccineManu2').value;
    const city = document.getElementById('addressCity2').value;
    const street = document.getElementById('addressStreet2').value;
    const houseNumber = document.getElementById('addressHouseNumber2').value;
    const dateOfBirth = document.getElementById('dateOfBirth2').value;
    const phoneNumber = document.getElementById('phoneNumber2').value;
    const celolarPhoneNumber = document.getElementById('celolarPhoneNumber2').value;
    
    const updatedPatientData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        id: id,
        recoveryDate: recoveryDate,
        sickDate: sickDate,
        vaccineDate: {
            vArray: [{
                vDate: vaccineDate,
                vManufacturer: vaccineManufacturer
            }]
        },
         address: {
            city: city,
            street: street,
            houseNumber: houseNumber
        },
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        celolarPhoneNumber: celolarPhoneNumber
    };
    while (!validation(updatedPatientData))  {            
        return
    }
    updatePatient(updatedPatientData)
    document.getElementById('update-patient-form').style.display = 'none';
    document.getElementById('current-patient-details').innerHTML = "";
});



// does the same thing - for the details in the new patient form
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-patient-btn').addEventListener('click', function () {
        document.getElementById('new-patient-form').style.display = 'block';
    });

    document.getElementById('save-patient-btn').addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const id = document.getElementById('id').value;
        const recoveryDate = document.getElementById('recoveryDate').value;
        const sickDate = document.getElementById('sickDate').value;
        const vaccineDate = document.getElementById('vaccineDate').value;
        const vaccineManufacturer = document.getElementById('vaccineManu').value;
        const city = document.getElementById('addressCity').value;
        const street = document.getElementById('addressStreet').value;
        const houseNumber = document.getElementById('addressHouseNumber').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const celolarPhoneNumber = document.getElementById('celolarPhoneNumber').value;
        const saveButton = document.getElementById('save-patient-btn');

        const newPatient = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            id: id,
            recoveryDate: recoveryDate,
            sickDate: sickDate,
            vaccineDate: {
                vArray: [{
                    vDate: vaccineDate,
                    vManufacturer: vaccineManufacturer
                }]
            },
             address: {
                city: city,
                street: street,
                houseNumber: houseNumber
            },
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            celolarPhoneNumber: celolarPhoneNumber
        };
        while (!validation(newPatient))  {            
            return
        }
        addPatient(newPatient);
        document.getElementById('new-patient-form').style.display = 'none';
        document.getElementById('patients').innerHTML = '';
    });
});




//sends the details of the new patients to the database with "post"
function addPatient(patientData) {
    fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
           body: JSON.stringify(patientData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Patient added successfully');
            getAll();
        } else {
            console.error('Failed to add patient');
        }
    })
    .catch(error => console.error('Error adding patient:', error));
    getAll();
}



//updates the details of the patient in the database with "patch"
function updatePatient (patientData) {
    fetch(`${BASE_URL}/${patientData.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(patientData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Patient updated successfully');
            getAll();
            //showPatient(patientData);
        } else {
            console.error('Failed to update patient');
        }
    })
    .catch(error => console.error('Error updating patient:', error));
   
}



// deletes the patient from the database with "delete"
const deletePatient = async (patientId, patientName) => {
    await fetch(`${BASE_URL}/${patientId}`, {
        method: 'DELETE'
    })
    .then(response => {
        
        if (response.ok) {
            console.log('Patient deleted successfully');
            document.getElementById('current-patient-details').style.display = 'none';
            // const deletedPatientElement = document.getElementById(`patient-${patientName}`);
            getAll();
        } else {
            console.error('Failed to delete patient');
        }
    })
    .catch(error => console.error('Error deleting patient:', error));
    // getAll();
}



// gets all the patients from the database
const getAll = () => {
    console.log("i am here");
        document.getElementById('patients').innerText = '';
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(patients => {            
            const patientsList = document.getElementById('patients');
            console.log("o" + patientsList.innerText);
            
            patients.forEach(patient => {
                console.log(patient);                
                const li = document.createElement('li');
                li.textContent = patient.firstName;
                li.onclick = () => showPatient(patient);
                patientsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching patients:', error));
}



document.addEventListener('DOMContentLoaded', function () {
    // Get vaccine input elements and the add button
    const vaccineContainer = document.getElementById('new-patient-form');
    const addVaccineButton = document.getElementById('add-vaccine-btn');
    const vaccineDateInput = document.getElementById('vaccineDate');
    const vaccineManuInput = document.getElementById('vaccineManu');

    // Track the number of added vaccine fields
    let vaccineCount = 1;

    // Function to check if the limit is reached
    function checkLimit() {
        if (vaccineCount >= 4) {
            addVaccineButton.style.display = 'none';
        } else {
            addVaccineButton.style.display = 'block';
        }
    }

    // Function to add vaccine input fields
    function addVaccineFields() {
        // Check if the limit is reached
        if (vaccineCount > 3) {
            return;
        }

        // Create new vaccine input fields
        const newVaccineDateInput = document.createElement('input');
        newVaccineDateInput.type = 'date';
        newVaccineDateInput.id = `vaccineDate+${vaccineCount}`;
        newVaccineDateInput.placeholder = 'תאריך חיסון';

        const newVaccineManuInput = document.createElement('input');
        newVaccineManuInput.type = 'text';
        newVaccineManuInput.id = `vaccineManu+${vaccineCount}`;
        newVaccineManuInput.placeholder = 'יצרן חיסון';

        // Append new vaccine input fields to the form
        vaccineContainer.insertBefore(newVaccineDateInput, addVaccineButton);
        vaccineContainer.insertBefore(newVaccineManuInput, addVaccineButton);

        // Update event listeners for new vaccine input fields
        newVaccineDateInput.addEventListener('input', checkVaccineFields);
        newVaccineManuInput.addEventListener('input', checkVaccineFields);

        // Increment the count
        vaccineCount++;
        checkLimit();
    }

    // Event listener for the "Add Vaccine" button
    addVaccineButton.addEventListener('click', addVaccineFields);

    // Event listeners for the initial vaccine input fields
    vaccineDateInput.addEventListener('input', checkVaccineFields);
    vaccineManuInput.addEventListener('input', checkVaccineFields);

    // Function to check if both vaccine fields are filled
    function checkVaccineFields() {
        const vaccineDate = vaccineDateInput.value;
        const vaccineManu = vaccineManuInput.value;
        if (vaccineDate && vaccineManu) {
            addVaccineButton.style.display = 'block';
        } else {
            addVaccineButton.style.display = 'none';
        }
    }

    // Add event listener for saving patient
    document.getElementById('save-patient-btn').addEventListener('click', function () {
        // Your save logic here
    });
});



const validation = (patient) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const email = patient.email
    // Event listener for save button click
        if (!emailRegex.test(email)) {
            alert('Invalid email address!');
            return false 
        }  

        if (!patient.id){
            alert('id is required');
            return false;
        }
        if (!patient.firstName){
            alert('first name is required');
            return false;
        }

        return true;
}



const homePage = () => {
    getAll();
    document.getElementById('update-patient-form').style.display = 'none';
    document.getElementById('new-patient-form').style.display = 'none';    
}




