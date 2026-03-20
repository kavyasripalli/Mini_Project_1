# 🏥 Healthcare Appointment & Patient Management System

## Project Overview

The **Healthcare Appointment & Patient Management System** is a frontend-based web application designed to help small healthcare clinics manage patients, doctors, and appointments efficiently.

The system replaces traditional manual register-based management with a structured digital interface. It allows clinic administrators to maintain patient records, manage doctor availability, and schedule appointments while preventing conflicts and duplicate bookings.

This project demonstrates how clinic workflows can be simulated using frontend technologies without a backend server by utilizing **LocalStorage** for data persistence.

---

## Key Features

### Patient Management

* Add new patient records
* Medical notes support
  
<img width="1366" height="768" alt="Screenshot (100)" src="https://github.com/user-attachments/assets/58b991e8-20a4-4762-a73a-fd366aec79a4" />

<img width="1366" height="768" alt="Screenshot (106)" src="https://github.com/user-attachments/assets/2d29b4cb-497e-41ea-a7b7-f4552ddc59f6" />

* Edit existing patient details

<img width="1366" height="768" alt="Screenshot (101)" src="https://github.com/user-attachments/assets/402afd6b-2774-426a-8945-c5fac5d72e30" />

<img width="1366" height="768" alt="Screenshot (105)" src="https://github.com/user-attachments/assets/7d4e07fb-f2cd-4e92-b657-745cd1273d32" />

* Delete patient records

<img width="1366" height="768" alt="Screenshot (102)" src="https://github.com/user-attachments/assets/a65b2829-00c2-46da-8cb6-f42c7da866c7" />

<img width="1366" height="768" alt="Screenshot (104)" src="https://github.com/user-attachments/assets/54b0cad9-bed4-4a78-9484-d34fa217f9bb" />

* Search patients by **name or phone number**

<img width="1366" height="768" alt="Screenshot (107)" src="https://github.com/user-attachments/assets/da000216-ed59-4c55-b7aa-c2e45b058687" />

* Form validation for required fields

<img width="1366" height="768" alt="Screenshot (108)" src="https://github.com/user-attachments/assets/b396a350-f726-41d3-83eb-13e725cbf1e6" />

* Auto-generated Patient ID

<img width="1366" height="768" alt="Screenshot (109)" src="https://github.com/user-attachments/assets/1eaa2392-165a-4e4c-ab64-0f855d95ae78" />


### Doctor Management

* Add new doctors

<img width="1366" height="768" alt="Screenshot (110)" src="https://github.com/user-attachments/assets/f4110157-5f8c-4601-ae08-ec2cee869ed2" />

<img width="1366" height="768" alt="Screenshot (111)" src="https://github.com/user-attachments/assets/d3b2a76c-508d-4e86-8bec-e1907254f7b2" />

* Edit doctor information

<img width="1366" height="768" alt="Screenshot (112)" src="https://github.com/user-attachments/assets/e8907100-1328-4ab7-b0b8-579ccbbe5ce6" />

<img width="1366" height="768" alt="Screenshot (113)" src="https://github.com/user-attachments/assets/d3383006-2810-479c-962e-5bd8a29da852" />

* Delete doctors

<img width="1366" height="768" alt="Screenshot (114)" src="https://github.com/user-attachments/assets/fb31d429-f45e-4aad-92fc-6921a38dd6a7" />

<img width="1366" height="768" alt="Screenshot (115)" src="https://github.com/user-attachments/assets/3815fc86-9992-4860-92a0-7973ec020037" />

* Search doctors by **name or specialization**

<img width="1366" height="768" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/e6a131c5-06bd-4750-9c9b-71440b69093f" />

* Doctor availability scheduling
* Prevent deleting doctors with existing appointments

<img width="1366" height="768" alt="Screenshot (119)" src="https://github.com/user-attachments/assets/ccbdfc5f-1e94-4c16-bec2-6e9764d272a2" />

* Auto-generated Doctor ID

<img width="1366" height="768" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/b437d092-051d-4774-94bf-33bccc050f38" />

### Appointment Management

* Book new appointments

<img width="1366" height="768" alt="Screenshot (117)" src="https://github.com/user-attachments/assets/df3ee54a-05c2-476b-8c95-103ef7206f1f" />

<img width="1366" height="768" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/65d281b5-5f27-48c1-ad54-bdd9754d8dbf" />

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
