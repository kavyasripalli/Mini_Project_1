// Load stored data
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

// Populate Patient Dropdown
function loadPatients() {

    let patientDropdown = $("#appointmentPatient");
    patientDropdown.empty();

    patientDropdown.append(`<option value="">Select Patient</option>`);

    patients.forEach(function (patient) {

        patientDropdown.append(`
            <option value="${patient.id}">
                ${patient.name}
            </option>
        `);

    });

}


// Populate Doctor Dropdown
function loadDoctors() {

    let doctorDropdown = $("#appointmentDoctor");
    doctorDropdown.empty();

    doctorDropdown.append(`<option value="">Select Doctor</option>`);

    doctors.forEach(function (doctor) {

        doctorDropdown.append(`
            <option value="${doctor.id}">
                ${doctor.name}
            </option>
        `);

    });

}

function generateTimeSlots(doctorId) {

    let doctor = doctors.find(d => d.id == doctorId);

    let timeDropdown = $("#appointmentTime");
    timeDropdown.empty();

    timeDropdown.append(`<option value="">Select Time</option>`);

    if (!doctor) return;

    let start = parseInt(doctor.startTime.split(":")[0]);
    let end = parseInt(doctor.endTime.split(":")[0]);

    let selectedDate = $("#appointmentDate").val();

    for (let hour = start; hour < end; hour++) {

        let formattedHour = hour.toString().padStart(2, '0');

        let slot1 = `${formattedHour}:00`;
        let slot2 = `${formattedHour}:30`;

        let slot1Booked = appointments.find(a =>
            a.doctorId == doctorId &&
            a.date == selectedDate &&
            a.time == slot1
        );

        let slot2Booked = appointments.find(a =>
            a.doctorId == doctorId &&
            a.date == selectedDate &&
            a.time == slot2
        );

        if (!slot1Booked) {
            timeDropdown.append(`<option>${slot1}</option>`);
        }

        if (!slot2Booked) {
            timeDropdown.append(`<option>${slot2}</option>`);
        }

    }

}

function showDoctorSchedule(doctorId) {

    let doctor = doctors.find(d => d.id == doctorId);

    if (!doctor) return;

    let scheduleBox = $("#doctorSchedule");
    scheduleBox.empty();

    let start = parseInt(doctor.startTime.split(":")[0]);
    let end = parseInt(doctor.endTime.split(":")[0]);

    let selectedDate = $("#appointmentDate").val();

    scheduleBox.append("<label class='form-label'>Doctor Schedule</label><br>");

    for (let hour = start; hour < end; hour++) {

        let formattedHour = hour.toString().padStart(2, '0');

        let slot1 = `${formattedHour}:00`;
        let slot2 = `${formattedHour}:30`;

        let slot1Booked = appointments.find(a =>
            a.doctorId == doctorId &&
            a.date == selectedDate &&
            a.time == slot1
        );

        let slot2Booked = appointments.find(a =>
            a.doctorId == doctorId &&
            a.date == selectedDate &&
            a.time == slot2
        );

        if (slot1Booked) {
            scheduleBox.append(`<span class="slot-box slot-booked">${slot1}</span>`);
        } else {
            scheduleBox.append(`<span class="slot-box slot-available">${slot1}</span>`);
        }

        if (slot2Booked) {
            scheduleBox.append(`<span class="slot-box slot-booked">${slot2}</span>`);
        } else {
            scheduleBox.append(`<span class="slot-box slot-available">${slot2}</span>`);
        }

    }

}

$("#appointmentDoctor").change(function () {

    let doctorId = $(this).val();

    if (doctorId) {
        generateTimeSlots(doctorId);
        showDoctorSchedule(doctorId);
    }

});

$("#appointmentDate").change(function () {

    let doctorId = $("#appointmentDoctor").val();

    if (doctorId) {
        generateTimeSlots(doctorId);
        showDoctorSchedule(doctorId);
    }

});

// Reset modal when clicking "Book Appointment"
$("#addAppointmentBtn").click(function () {

    $("#appointmentModalTitle").text("Book Appointment");

    $("#appointmentForm")[0].reset();
    $("#appointmentId").val("");

    $("#doctorSchedule").empty();

});

// Save Appointment
$("#saveAppointmentBtn").click(function (e) {
    e.preventDefault();

    let form = document.getElementById("appointmentForm");

    if (!form.checkValidity()) {
        showMessage("Please complete all required fields.", "danger");
        return;
    }

    let patientId = $("#appointmentPatient").val();
    let doctorId = $("#appointmentDoctor").val();
    let date = $("#appointmentDate").val();
    let time = $("#appointmentTime").val().trim();
    let status = $("#appointmentStatus").val();

    let today = new Date().toISOString().split("T")[0];

    if (date < today) {
        showMessage("Cannot book appointments for past dates", "danger");
        return;
    }

    if (patientId === "" || doctorId === "" || date === "" || time === "") {
        showMessage("Please fill all required fields before saving the appointment", "danger");
        return;
    }

    // Prevent same patient booking two appointments at same time
    let appointmentId = $("#appointmentId").val();
    let patientDuplicate = appointments.find(function (appointment) {

        return (
            appointment.patientId == patientId &&
            appointment.date == date &&
            appointment.time.toLowerCase() == time.toLowerCase() &&
            appointment.id != appointmentId
        );

    });

    if (patientDuplicate) {
        showMessage("Patient already has an appointment at this time.", "danger");
        return;
    }

    // Prevent duplicate time slot for same doctor
    let duplicate = appointments.find(function (appointment) {

        return (
            appointment.doctorId == doctorId &&
            appointment.date == date &&
            appointment.time.toLowerCase() == time.toLowerCase() &&
            appointment.id != appointmentId // Exclude current appointment when editing
        );

    });

    if (duplicate) {
        showMessage("This doctor already has an appointment at this time.", "danger");
        return;
    }

    let doctor = doctors.find(d => d.id == doctorId);

    if (doctor) {

        let start = parseInt(doctor.startTime.split(":")[0]);
        let end = parseInt(doctor.endTime.split(":")[0]);

        let appointmentHour = parseInt(time.split(":")[0]);

        if (appointmentHour < start || appointmentHour >= end) {
            showMessage("Appointment time is outside doctor's available hours", "danger");
            return;
        }

    }

    if (appointmentId) {

        appointments = appointments.map(function (appointment) {

            if (appointment.id == appointmentId) {

                return {
                    id: appointment.id,
                    patientId: patientId,
                    doctorId: doctorId,
                    date: date,
                    time: time,
                    status: status
                };

            }

            return appointment;

        });

    } else {

        let newAppointment = {
            id: "APT-" + Date.now().toString().slice(-4),
            patientId: patientId,
            doctorId: doctorId,
            date: date,
            time: time,
            status: status
        };

        appointments.push(newAppointment);

    }


    localStorage.setItem("appointments", JSON.stringify(appointments));
    if (appointmentId) {
        showMessage("Appointment updated successfully");
    } else {
        showMessage("Appointment booked successfully");
    }

    $("#appointmentForm")[0].reset();

    let modal = bootstrap.Modal.getInstance(document.getElementById("appointmentModal"));
    modal.hide();

    displayAppointments();

});


// Display Appointments
function displayAppointments() {

    let tableBody = $("#appointmentTableBody");
    tableBody.empty();

    let updated = false;   // moved outside

    if (appointments.length === 0) {

        tableBody.append(`
            <tr>
                <td colspan="7" class="text-center">
                    <i class="bi bi-calendar-x" style="font-size:22px;"></i><br>
                    No appointments found
                </td>
            </tr>
        `);

        return;
    }

    appointments.forEach(function (appointment) {

        let patient = patients.find(p => p.id == appointment.patientId);
        let doctor = doctors.find(d => d.id == appointment.doctorId);

        let now = new Date();
        let appointmentDateTime = new Date(appointment.date + "T" + appointment.time);

        // AUTO COMPLETE FIX
        if (
            appointment.status === "Booked" &&
            appointmentDateTime.getTime() < now.getTime()
        ) {
            appointment.status = "Completed";
            updated = true;
        }

        let statusBadge = "";

        if (appointment.status === "Booked") {
            statusBadge = `<span class="badge bg-success">Booked</span>`;
        }
        else if (appointment.status === "Completed") {
            statusBadge = `<span class="badge bg-primary">Completed</span>`;
        }
        else {
            statusBadge = `<span class="badge bg-danger">Cancelled</span>`;
        }

        let disableEdit = appointment.status === "Completed" ? "disabled" : "";

        let today = new Date().toISOString().split("T")[0];
        let highlightClass = appointment.date === today ? "today-row" : "";
        tableBody.append(`
            <tr class="${highlightClass}">
                <td>${appointment.id}</td>
                <td>${patient ? patient.name : ""}</td>
                <td>${doctor ? doctor.name : ""}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-warning editAppointmentBtn"
                        data-id="${appointment.id}" ${disableEdit}>
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger deleteAppointmentBtn"
                        data-id="${appointment.id}">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `);

    });

    // Save only if updated
    if (updated) {
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }

}

function filterAppointments() {

    let searchText = $("#searchAppointment").val().toLowerCase();
    let statusFilter = $("#filterStatus").val();

    $("#appointmentTableBody tr").each(function () {

        let rowText = $(this).text().toLowerCase();
        let status = $(this).find("td:eq(5)").text();

        let matchSearch = rowText.indexOf(searchText) > -1;
        let matchStatus = statusFilter === "" || status.includes(statusFilter);

        if (matchSearch && matchStatus) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

}

// Delete Appointment
$(document).on("click", ".deleteAppointmentBtn", function () {

    let appointmentId = $(this).data("id");

    if (confirm("Are you sure you want to delete this appointment?")) {

        appointments = appointments.filter(function (appointment) {
            return appointment.id !== appointmentId;
        });

        localStorage.setItem("appointments", JSON.stringify(appointments));
        showMessage("Appointment deleted successfully", "danger");

        displayAppointments();

    }

});

// Edit Appointment
$(document).on("click", ".editAppointmentBtn", function () {

    if (!confirm("Do you want to edit this appointment?")) {
        return;
    }

    let appointmentId = $(this).data("id");

    let appointment = appointments.find(function (a) {
        return a.id === appointmentId;
    });

    // Fill form
    $("#appointmentId").val(appointment.id);
    $("#appointmentPatient").val(appointment.patientId);
    $("#appointmentDoctor").val(appointment.doctorId);
    generateTimeSlots(appointment.doctorId);
    showDoctorSchedule(appointment.doctorId);
    $("#appointmentDate").val(appointment.date);
    $("#appointmentTime").val(appointment.time);
    $("#appointmentStatus").val(appointment.status);

    // Open modal
    $("#appointmentModalTitle").text("Edit Appointment");
    let modal = new bootstrap.Modal(document.getElementById("appointmentModal"));
    modal.show();

});

$("#searchAppointment").on("keyup", function () {
    filterAppointments();
});

$("#filterStatus").on("change", function () {
    filterAppointments();
});

// Load page data
$(document).ready(function () {

    loadPatients();
    loadDoctors();
    displayAppointments();

    let today = new Date().toISOString().split("T")[0];
    $("#appointmentDate").attr("min", today);

    let params = new URLSearchParams(window.location.search);

    if (params.get("add") === "true") {
        $("#appointmentModalTitle").text("Book Appointment");

        let modal = new bootstrap.Modal(document.getElementById("appointmentModal"));
        modal.show();

    }

});