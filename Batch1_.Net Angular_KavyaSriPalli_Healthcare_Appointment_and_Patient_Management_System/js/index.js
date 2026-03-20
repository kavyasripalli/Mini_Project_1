// Load stored data
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function loadDashboardStats() {

    function animateCount(element, target) {

        // If target is 0, show immediately
        if (target === 0) {
            $(element).text(0);
            return;
        }

        let count = 0;

        let interval = setInterval(function () {

            count++;

            $(element).text(count);

            if (count >= target) {
                clearInterval(interval);
            }

        }, 40);

    }

    let today = new Date().toLocaleDateString("en-CA");

    let todayAppointments = appointments.filter(function(a){

        return (
            a.date === today &&
            a.status === "Booked"
        );

    });

    animateCount("#totalPatients", patients.length);
    animateCount("#totalDoctors", doctors.length);
    animateCount("#totalAppointments", appointments.length);
    animateCount("#todayAppointments", todayAppointments.length);

}

function loadRecentAppointments() {

    let table = $("#recentAppointments");
    table.empty();

    let recent = appointments.slice(-5).reverse();

    if (recent.length === 0) {
        table.append(`
            <tr>
                <td colspan="4" class="text-center text-muted">
                    No recent appointments
                </td>
            </tr>
        `);
        return;
    }

    recent.forEach(function (a) {

        let patient = patients.find(p => p.id == a.patientId);
        let doctor = doctors.find(d => d.id == a.doctorId);

        table.append(`
            <tr>
                <td>${patient ? patient.name : ""}</td>
                <td>${doctor ? doctor.name : ""}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
            </tr>
        `);
    });

}

function loadAppointmentsChart() {

    let doctorCounts = {};

    appointments.forEach(function(a){

        let doctor = doctors.find(d => d.id == a.doctorId);

        if(!doctor) return;

        if(!doctorCounts[doctor.name]){
            doctorCounts[doctor.name] = 0;
        }

        doctorCounts[doctor.name]++;

    });

    let labels = Object.keys(doctorCounts);
    let data = Object.values(doctorCounts);

    if (labels.length === 0) {
        labels = ["No Data"];
        data = [0];
    }

    let ctx = document.getElementById("appointmentsChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Appointments",
                data: data,
                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#dc3545",
                    "#ffc107",
                    "#6f42c1",
                    "#20c997"
                ],
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Doctor Appointment Distribution",
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

}

function loadStatusChart() {

    let booked = 0;
    let completed = 0;
    let cancelled = 0;

    appointments.forEach(function(a){

        if(a.status === "Booked"){
            booked++;
        }
        else if(a.status === "Completed"){
            completed++;
        }
        else if(a.status === "Cancelled"){
            cancelled++;
        }

    });

    let ctx = document.getElementById("statusChart");

    new Chart(ctx, {

        type: "doughnut",

        data: {
            labels: ["Booked", "Completed", "Cancelled"],
            datasets: [{
                data: [booked, completed, cancelled],
                backgroundColor: [
                    "#198754",
                    "#0d6efd",
                    "#dc3545"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }

    });

}

function loadTodaySchedule(){

    let list = $("#todaySchedule");
    list.empty();

    let today = new Date().toLocaleDateString("en-CA");
    let now = new Date();

    let todayAppointments = appointments.filter(function(a){

        let appointmentDateTime = new Date(a.date + "T" + a.time);

        return (
            a.date === today &&
            a.status === "Booked" &&
            appointmentDateTime > now
        );

    });

    if(todayAppointments.length === 0){
        list.append(`<li class="list-group-item text-muted">No upcoming appointments today</li>`);
        return;
    }

    todayAppointments.forEach(function(a){

        let patient = patients.find(p=>p.id==a.patientId);
        let doctor = doctors.find(d=>d.id==a.doctorId);

        list.append(`
            <li class="list-group-item">
                <strong>${a.time}</strong> - ${patient ? patient.name : ""} with Dr. ${doctor ? doctor.name : ""}
            </li>
        `);

    });

}

$(document).ready(function () {

    loadDashboardStats();
    loadRecentAppointments();
    loadAppointmentsChart();
    loadStatusChart();
    loadTodaySchedule();

});

// Auto refresh dashboard when data changes
window.addEventListener("storage", function () {

    // Reload latest data
    patients = JSON.parse(localStorage.getItem("patients")) || [];
    doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Refresh dashboard
    loadDashboardStats();
    loadRecentAppointments();
    loadAppointmentsChart();
    loadStatusChart();
    loadTodaySchedule();

    // Reload chart safely
    document.getElementById("appointmentsChart").remove();
    $(".chart-card canvas").parent().append('<canvas id="appointmentsChart" height="120"></canvas>');
    loadAppointmentsChart();

});