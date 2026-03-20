# Healthcare Appointment & Patient Management System

## Project Overview

The **Healthcare Appointment & Patient Management System** is a frontend-based web application designed to help small healthcare clinics manage patients, doctors, and appointments efficiently.

The system replaces traditional manual register-based management with a structured digital interface. It allows clinic administrators to maintain patient records, manage doctor availability, and schedule appointments while preventing conflicts and duplicate bookings.

This project demonstrates how clinic workflows can be simulated using frontend technologies without a backend server by utilizing **LocalStorage** for data persistence.

---

## Key Features

### Patient Management

* Add new patient records
* Edit existing patient details
* Delete patient records
* Search patients by **name or phone number**
* Form validation for required fields
* Auto-generated Patient ID
* Medical notes support

### Doctor Management

* Add new doctors
* Edit doctor information
* Delete doctors
* Search doctors by **name or specialization**
* Doctor availability scheduling
* Prevent deleting doctors with existing appointments
* Auto-generated Doctor ID

### Appointment Management

* Book new appointments
* Edit existing appointments
* Delete appointments
* Filter appointments by **status**
* Search appointments by **patient, doctor, or date**
* Automatic time slot generation based on doctor availability
* Status tracking (Booked, Completed, Cancelled)

### Appointment Validations

The system implements several real-world scheduling rules:

* Prevents **double booking for the same doctor**
* Prevents **patients from booking two appointments at the same time**
* Ensures appointment time falls within **doctor working hours**
* Prevents booking appointments for **past dates**
* Automatically updates appointment status to **Completed** when the time passes

---

## Dashboard Features

The application includes an interactive dashboard providing an overview of the clinic's activity.

### Dashboard Statistics

* Total Patients
* Total Doctors
* Total Appointments
* Today's Appointments

### Analytics Charts

Implemented using **Chart.js**

* **Appointments Per Doctor**
* **Appointment Status Distribution**

### Additional Dashboard Information

* Upcoming appointments for the current day
* Recently scheduled appointments
* Quick navigation buttons for adding patients, doctors, and appointments

---

## User Interface Features

* Responsive layout using **Bootstrap**
* Sidebar navigation for dashboard pages
* Modal-based forms for data entry
* Toast notifications for user feedback
* Search and filtering functionality
* Status badges for appointment tracking
* Interactive charts and analytics
* Clean and structured UI design

---

## Technologies Used

The application is built using the following technologies:

* **HTML5**
* **CSS3**
* **Bootstrap 5**
* **JavaScript (ES6)**
* **jQuery**
* **Chart.js**
* **LocalStorage**

---

## Project Structure

```
Healthcare-Appointment-System
│
├── index.html
├── patients.html
├── doctors.html
├── appointments.html
│
├── css
│   └── styles.css
│
├── js
│   ├── common.js
│   ├── index.js
│   ├── patients.js
│   ├── doctors.js
│   └── appointments.js
│
└── README.md
```

---

## Data Storage

All data is stored locally using **LocalStorage**, allowing the application to retain data across browser refreshes.

Stored Data Includes:

* Patient Records
* Doctor Information
* Appointment Schedules

This approach allows the application to simulate a database-driven system without requiring a backend server.

---

## How the System Works

1. The administrator first adds **patient records** and **doctor details**.
2. Each doctor is assigned **working hours**.
3. When booking an appointment:

   * Available time slots are automatically generated based on doctor availability.
   * Booked slots are removed from the dropdown.
4. The system validates appointment rules before saving.
5. The dashboard updates automatically to reflect the latest statistics and charts.

---

## Conclusion

The **Healthcare Appointment & Patient Management System** demonstrates how clinic operations such as patient registration, doctor scheduling, and appointment booking can be efficiently managed using modern frontend technologies.

By combining **JavaScript logic, interactive UI design, and browser storage**, this project simulates a complete clinic management workflow while enforcing real-world scheduling constraints.

This project highlights the use of **structured UI design, validation logic, and data visualization** to build an efficient and user-friendly healthcare management interface.

---
