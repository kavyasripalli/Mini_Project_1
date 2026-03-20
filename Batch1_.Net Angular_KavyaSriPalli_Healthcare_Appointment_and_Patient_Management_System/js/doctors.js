// Store doctors in array
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

$("#addDoctorBtn").click(function () {
    $("#doctorModalTitle").text("Add Doctor");

    $("#doctorForm")[0].reset();
    $("#doctorId").val("");

});


// Save Doctor
$("#saveDoctorBtn").click(function () {

    let name = $("#doctorName").val().trim();
    let specialization = $("#doctorSpecialization").val();
    let startTime = $("#doctorStartTime").val();
    let endTime = $("#doctorEndTime").val();
    let form = document.getElementById("doctorForm");
    if (!form.checkValidity()) {
        showMessage("Please fill all required fields correctly", "danger");
        return;
    }
    if(startTime >= endTime){
        showMessage("End time must be greater than start time", "danger");
        return;
    }

    let doctorId = $("#doctorId").val();

    if (doctorId) {

        // Update doctor
        doctors = doctors.map(function (doctor) {

            if (doctor.id == doctorId) {

                return {
                    id: doctor.id,
                    name: name,
                    specialization: specialization,
                    startTime: startTime,
                    endTime: endTime
                };

            }

            return doctor;

        });

    } else {

        // Add new doctor
        let newDoctor = {
            id: "DOC-" + Date.now().toString().slice(-4),
            name: name,
            specialization: specialization,
            startTime: startTime,
            endTime: endTime
        };

        doctors.push(newDoctor);

    }

    localStorage.setItem("doctors", JSON.stringify(doctors));
    if (doctorId) {
        showMessage("Doctor information updated successfully");
    } else {
        showMessage("Doctor information added successfully");
    }

    $("#doctorForm")[0].reset();
    $("#doctorId").val("");

    let modal = bootstrap.Modal.getInstance(document.getElementById("doctorModal"));
    modal.hide();

    displayDoctors();

});


// Display Doctors
function displayDoctors() {

    let tableBody = $("#doctorTableBody");
    tableBody.empty();

    if (doctors.length === 0) {

        tableBody.append(`
            <tr>
                <td colspan="5" class="text-center">
                    <i class="bi bi-person-x" style="font-size:22px;"></i><br> No doctors found
                </td>
            </tr>
        `);

        return;
    }


    doctors.forEach(function (doctor) {

        let row = `
            <tr>
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>
                    <span class="badge bg-primary">
                        ${doctor.specialization}
                    </span>
                </td>
                <td>
                    <i class="bi bi-clock"></i>
                    ${doctor.startTime} - ${doctor.endTime}
                </td>
                <td>

                    <button
                        class="btn btn-sm btn-warning editDoctorBtn"
                        data-id="${doctor.id}"
                    >
                        <i class="bi bi-pencil"></i> Edit
                    </button>

                    <button
                        class="btn btn-sm btn-danger deleteDoctorBtn"
                        data-id="${doctor.id}"
                    >
                        <i class="bi bi-trash"></i> Delete
                    </button>

                </td>
            </tr>
        `;

        tableBody.append(row);

    });

}

// Delete Doctor
$(document).on("click", ".deleteDoctorBtn", function () {

    let doctorId = $(this).data("id");

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let doctorHasAppointments = appointments.find(function(a){
        return a.doctorId == doctorId;
    });

    if (doctorHasAppointments) {
        showMessage("Cannot delete doctor with existing appointments", "danger");
        return;
    }

    if (confirm("Are you sure you want to delete this doctor?")) {

        doctors = doctors.filter(function (doctor) {
            return doctor.id !== doctorId;
        });

        localStorage.setItem("doctors", JSON.stringify(doctors));
        showMessage("Doctor deleted successfully", "danger");

        displayDoctors();
    }

});

// Edit Doctor
$(document).on("click", ".editDoctorBtn", function () {

    let doctorId = $(this).data("id");

    let doctor = doctors.find(function (d) {
        return d.id === doctorId;
    });

    // Fill form with doctor data
    $("#doctorId").val(doctor.id);
    $("#doctorName").val(doctor.name);
    $("#doctorSpecialization").val(doctor.specialization);
    $("#doctorStartTime").val(doctor.startTime);
    $("#doctorEndTime").val(doctor.endTime);

    // Open modal
    $("#doctorModalTitle").text("Edit Doctor");
    let modal = new bootstrap.Modal(document.getElementById("doctorModal"));
    modal.show();

});

// Search Doctor
$("#searchDoctor").on("keyup", function () {

    let searchText = $(this).val().toLowerCase();

    let filteredDoctors = doctors.filter(function (doctor) {

        return (
            doctor.name.toLowerCase().includes(searchText) ||
            doctor.specialization.toLowerCase().includes(searchText)
        );

    });

    renderFilteredDoctors(filteredDoctors);

});

function renderFilteredDoctors(filteredDoctors) {

    let tableBody = $("#doctorTableBody");
    tableBody.empty();

    filteredDoctors.forEach(function (doctor) {

        let row = `
            <tr>
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>
                    <span class="badge bg-primary">
                        ${doctor.specialization}
                    </span>
                </td>
                <td>
                    <i class="bi bi-clock"></i>
                    ${doctor.startTime} - ${doctor.endTime}
                </td>
                <td>
                    <button class="btn btn-sm btn-warning editDoctorBtn" data-id="${doctor.id}">
                        <i class="bi bi-pencil"></i> Edit
                    </button>

                    <button class="btn btn-sm btn-danger deleteDoctorBtn" data-id="${doctor.id}">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.append(row);

    });

}

// Load doctors when page loads
$(document).ready(function () {

    displayDoctors();

    let params = new URLSearchParams(window.location.search);

    if (params.get("add") === "true") {

        let modal = new bootstrap.Modal(document.getElementById("doctorModal"));
        modal.show();

    }

});