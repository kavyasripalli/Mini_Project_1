// Store patients in an array
let patients = JSON.parse(localStorage.getItem("patients")) || [];

$("#addPatientBtn").click(function () {
    $("#patientModalTitle").text("Add Patient");

    $("#patientForm")[0].reset();
    $("#patientId").val("");

});

// Save Patient Button Click
$("#savePatientBtn").click(function () {

    // Get form values
    let name = $("#patientName").val().trim();
    let age = $("#patientAge").val();
    let gender = $("#patientGender").val();
    let phone = $("#patientPhone").val().trim();
    let email = $("#patientEmail").val().trim();
    let notes = $("#patientNotes").val().trim();

    // Simple validation
    let form = document.getElementById("patientForm");

    if (!form.checkValidity()) {
        showMessage("Please fill all required fields correctly", "danger");
        return;
    }

    // Generate Patient ID
    let patientId = $("#patientId").val();

    if (patientId) {

        // Update existing patient
        patients = patients.map(function (patient) {

            if (patient.id == patientId) {

                return {
                    id: patient.id,
                    name: name,
                    age: age,
                    gender: gender,
                    phone: phone,
                    email: email,
                    notes: notes
                };

            }

            return patient;

        });

    } else {

        // Create new patient
        let newPatient = {
            id: "PAT-" + Date.now().toString().slice(-4),
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            email: email,
            notes: notes
        };

        patients.push(newPatient);

    }

    // Save to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));
    if (patientId) {
        showMessage("Patient information updated successfully");
    } else {
        showMessage("Patient information added successfully");
    }

    // Clear form
    $("#patientForm")[0].reset();

    // Close modal
    let modal = bootstrap.Modal.getInstance(document.getElementById("patientModal"));
    modal.hide();

    // Refresh table
    displayPatients();

});


// Display Patients in Table
function displayPatients() {

    let tableBody = $("#patientTableBody");
    tableBody.empty();

    if (patients.length === 0) {

        tableBody.append(`
            <tr>
                <td colspan="7" class="text-center text-muted">
                    <i class="bi bi-person-x" style="font-size:22px;"></i><br>
                    No patients found
                </td>
            </tr>
        `);

        return;
    }


    patients.forEach(function (patient) {

        let row = `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.email}</td>
                <td>
                    <button 
                        class="btn btn-sm btn-warning editBtn"
                        data-id="${patient.id}"
                    >
                        <i class="bi bi-pencil"></i> Edit
                    </button>

                    <button 
                        class="btn btn-sm btn-danger deleteBtn"
                        data-id="${patient.id}"
                    >
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>

            </tr>
        `;

        tableBody.append(row);

    });

}

// Delete Patient
$(document).on("click", ".deleteBtn", function () {

    let patientId = $(this).data("id");

    // Get appointments from localStorage
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Check if patient has appointments
    let patientHasAppointments = appointments.find(function(a){
        return a.patientId == patientId;
    });

    if (patientHasAppointments) {
        showMessage("Cannot delete patient with existing appointments", "danger");
        return;
    }

    if (confirm("Are you sure you want to delete this patient?")) {

        patients = patients.filter(function (patient) {
            return patient.id !== patientId;
        });

        localStorage.setItem("patients", JSON.stringify(patients));
        showMessage("Patient deleted successfully", "danger");

        displayPatients();
    }

});

// Edit Patient
$(document).on("click", ".editBtn", function () {

    let patientId = $(this).data("id");

    let patient = patients.find(function (p) {
        return p.id === patientId;
    });

    // Fill form with patient data
    $("#patientId").val(patient.id);
    $("#patientName").val(patient.name);
    $("#patientAge").val(patient.age);
    $("#patientGender").val(patient.gender);
    $("#patientPhone").val(patient.phone);
    $("#patientEmail").val(patient.email);
    $("#patientNotes").val(patient.notes);

    // Open modal
    $("#patientModalTitle").text("Edit Patient");
    let modal = new bootstrap.Modal(document.getElementById("patientModal"));
    modal.show();

});

// Search Patient
$("#searchPatient").on("keyup", function () {

    let searchText = $(this).val().toLowerCase();

    let filteredPatients = patients.filter(function (patient) {

        return (
            patient.name.toLowerCase().includes(searchText) ||
            patient.phone.includes(searchText)
        );

    });

    renderFilteredPatients(filteredPatients);

});

function renderFilteredPatients(filteredPatients) {

    let tableBody = $("#patientTableBody");
    tableBody.empty();

    filteredPatients.forEach(function (patient) {

        let row = `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.email}</td>
                <td>
                    <button 
                        class="btn btn-sm btn-warning editBtn"
                        data-id="${patient.id}"
                    >
                        Edit
                    </button>

                    <button 
                        class="btn btn-sm btn-danger deleteBtn"
                        data-id="${patient.id}"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.append(row);

    });

}

// Load patients when page loads
$(document).ready(function () {

    displayPatients();

    let params = new URLSearchParams(window.location.search);

    if (params.get("add") === "true") {

        let modal = new bootstrap.Modal(document.getElementById("patientModal"));
        modal.show();

    }

});