Healthcare Appointment & Patient Management System
Project Overview

The Healthcare Appointment & Patient Management System is a frontend-based web application designed to help small healthcare clinics manage patients, doctors, and appointments efficiently.
The system replaces manual register-based management with a structured digital interface, reducing appointment conflicts and improving patient record management.

This application is built using HTML, CSS, JavaScript, jQuery, Bootstrap, and LocalStorage to simulate a complete clinic management workflow without requiring a backend.

Features
1. Patient Management

Add new patient records

Edit existing patient details

Delete patient records

Search patients by name or phone number

Form validation for required fields

Prevent deleting patients who have scheduled appointments

Fields

Patient ID (auto-generated)

Name

Age

Gender

Phone Number

Email

Medical Notes

2. Doctor Management

Add new doctors

Edit doctor details

Delete doctors

Search doctors by name or specialization

Prevent deleting doctors who have existing appointments

Doctor availability scheduling

Fields

Doctor ID (auto-generated)

Name

Specialization

Start Time

End Time

3. Appointment Management

Book appointments

Edit appointment details

Cancel appointments

Delete appointments

Filter appointments by status

Search appointments by patient, doctor, or date

Automatic slot generation based on doctor availability

Validations

Prevent duplicate booking for the same doctor at the same time

Prevent the same patient from booking multiple doctors at the same time

Prevent booking outside doctor availability hours

Prevent booking appointments in the past

Fields

Appointment ID (auto-generated)

Patient

Doctor

Date

Time Slot

Status (Booked / Completed / Cancelled)

Dashboard Features

The system includes a dashboard that provides quick insights.

Dashboard Cards

Total Patients

Total Doctors

Total Appointments

Today's Appointments

Charts

Appointments per Doctor

Appointment Status Distribution

Additional Dashboard Features

Recent Appointments list

Upcoming appointments for the current day

Interactive analytics using Chart.js

UI/UX Features

Responsive layout for desktop and tablet

Navbar and sidebar navigation

Modal-based forms

Search and filtering options

Toast notifications for system messages

Status badges for appointment tracking

Hover animations and modern dashboard cards

Technologies Used

HTML5

CSS3

Bootstrap 5

JavaScript (ES6)

jQuery

Chart.js

LocalStorage

Project Structure
Healthcare-Management-System
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
Data Storage

All data is stored using LocalStorage, which allows the system to persist information across page reloads.

Stored Data:

Patients

Doctors

Appointments

Key Functional Logic

The system includes several real-world scheduling constraints:

Doctors cannot have multiple appointments at the same time

Patients cannot book two appointments at the same time

Appointments must fall within doctor working hours

Past appointments automatically update their status to Completed

Future Improvements

Potential enhancements for the system:

Backend integration using Node.js or Django

Database support (MySQL / MongoDB)

Authentication for clinic staff

Email or SMS appointment notifications

Advanced analytics dashboard

Patient medical history tracking

Conclusion

This project demonstrates how a healthcare appointment system can be implemented using frontend technologies.
It simulates real clinic workflows including scheduling logic, validation rules, and dashboard analytics.

The system improves clinic efficiency by providing a structured way to manage patients, doctors, and appointments through an intuitive user interface.