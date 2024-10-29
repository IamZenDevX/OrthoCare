# OrthoCare
An online portal letting orthopedic patients monitor their development, virtually see doctors, obtain recommended physical therapy programs.

- **Required Modules**:
    - Video Exercise Database.
    - follows ranges of motion and pain scales..
    - Remote guidance inside virtual conferencing settings.
    - developed calendar.
    - Notes intended for patients or doctors.

<h2 align="left">Tools Used:</h2>

![Zendevx Technology](https://github.com/user-attachments/assets/36c979fe-929e-44a4-8958-9c15dc466e35)


<h2 align="left">Testing Tools Used:</h2>

![PostMan Github](https://github.com/user-attachments/assets/3381c639-715f-40b9-85d3-08384553ee12)


<h2 align="left">Library:</h2>

- bcryptjs
- connect-mongo
- body-parser
- cors
- dotenv
- express
- express-session
- express-validator
- jsonwebtoken
- mongoose
- nodemon
- validator
- http-errors
- nodemailer
- uuid

<h2 align="left">Development Scope</h2>
    
  To develop OrthoCare, a digital platform for orthopedic patients, here is a detailed breakdown of the database structure and module functionalities.
    

<h2 align="left">1. Database Structure</h2>

The platform will require a relational database to manage patient data, doctor information, appointments, exercises, and consultations. Below is a proposed database structure with the key tables.

### **Tables**:

---

### a) **Users**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| user_id | INT (PK) | Unique user identifier |
| name | String | User's full name |
| email | String | User's email address |
| password | Password | Encrypted password |
| role | ENUM('Patient', 'Doctor', 'Admin') | User role in the system |
| phone | String | Contact number |
| date_of_birth | DATE | Date of birth for age tracking |
| address | String | User's residential address |
| profile_picture | String | Profile image URL |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last updated timestamp |

---

### b) **Doctors**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| doctor_id | String | Unique identifier for doctors |
| user_id | String | Link to the Users table |
| specialization | String | Doctor's area of specialization (e.g., orthopedics) |
| license_number | String | Medical license number |
| experience_years | Number | Number of years of experience |
| bio | String | Short bio of the doctor |
| availability | JSON | Doctor's availability for consultations (e.g., time slots, days) |

---

### c) **Patients**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| patient_id | String | Unique patient identifier |
| user_id | String | Link to the Users table |
| medical_history | String | Patient's medical history (injuries, surgeries, etc.) |
| current_condition | String | Current orthopedic condition (e.g., ACL tear) |
| assigned_doctor | String | Link to the Doctors table (doctor assigned to the patient) |

---

### d) **Exercises**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| exercise_id | String | Unique identifier for exercises |
| title | String | Exercise title (e.g., "Knee Stretch") |
| description | String | Detailed description of the exercise |
| video_url | String | Link to the video demonstrating the exercise |
| difficulty_level | ENUM('Easy', 'Moderate', 'Hard') | Difficulty level of the exercise |
| target_area | String | Body part targeted (e.g., knee, shoulder) |
| duration_minutes | String | Estimated time for exercise (in minutes) |
| repetitions | String | Number of recommended repetitions |

---

### e) **Patient Exercises**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| patient_exercise_id | String | Unique identifier |
| patient_id | String | Link to the Patients table |
| exercise_id | String | Link to the Exercises table |
| assigned_by | String | Doctor who assigned the exercise (link to Doctors table) |
| start_date | DATE | Start date for the exercise program |
| end_date | DATE | End date for the exercise program |
| status | ENUM('Ongoing', 'Completed', 'Missed') | Current status of the exercise |
| progress | String | Patient’s comments on the progress (pain levels, range of motion) |

---

### f) **Appointments**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| appointment_id | String | Unique identifier for appointments |
| patient_id | String | Link to the Patients table |
| doctor_id | String | Link to the Doctors table |
| appointment_date | DATETIME | Date and time of the appointment |
| consultation_mode | ENUM('Video', 'In-Person') | Mode of consultation (video or in-person) |
| status | ENUM('Scheduled', 'Completed', 'Cancelled') | Current status of the appointment |
| appointment_end_date | DATETIME |  |

---

### g) **Consultations**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| consultation_id | String | Unique identifier for consultations |
| patient_id | String | Link to the Patients table |
| doctor_id | String | Link to the Doctors table |
| appointment_id | String | Link to the Appointments table |
| notes | String | Doctor's notes from the consultation |
| prescriptions | String | Prescriptions or recommendations post-consultation |
| video_recording | String | Video recording link (if recorded) |

---

### h) **Messages**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| message_id | String | Unique message identifier |
| sender_id | String | User ID of the message sender |
| receiver_id | String | User ID of the message receiver |
| message | String | Content of the message |
| timestamp | TIMESTAMP | Message sent timestamp |
---
<h2 align="left"> 2. Module Functionalities</h2>


### a) **Exercise Video Library**

For clients, this section provides easily available orthopedic workouts. Doctors can give specific exercises for their patients and follow video instructions.

- **Key Features**:
    - Search and filter under actual part, difficulty, etc.
    - embedded from organizations providing video hosting (including YouTube, Vimeo)
    - The doctor assigned a patient whose behavior
    - Track allocated projects using start and finish dates.
    - Completing tests and monitoring development

---

### b) **Progress Tracker**

Patients can track their healing using this gadget. Patients enter range of motion, frequency of completed exercise, degree of pain. Review of this material lets doctors adjust their course of treatment.

- **Key Features**:
    - range of motion; more precisely flexion and extension; patient generated
    - Track degree of pain 0–10 scale
    - Track your exercises either daily or monthly.
    - Graphical reports for medical practitioners keeping track on development
    - System of patient comments or concerns distribution.
    - Automated patient reminders to track development

---

### c) **Remote Consultation (Video Calls)**

This module helps clinicians to assess patient healing and provide advice without personally visiting by means of remote video conferences between patients and doctors.

- **Key Features**:
    - safe webRTC for Zoom API video conferencing integration
    - arrange conferences online.
    - File dissemination, more especially reports, x-rays, in-session chat tool for decision to record meetings for upcoming usage
    - End-to- end encrypted promises perfect communication.

---

### d) **Appointment Scheduling**

This function allows patients' assigned orthopedic specialist to schedule online or in-person conferences.

- **Key Features**:
    - See rapid doctor accessibility.
    - Create a schedule and book of meetings.
    - Notes and warnings when approaching meetings
    - Resuling and cancelation instruments
    - Medical histories and notes about patients

---

### e) **Doctor-Patient Messaging**

a safe messaging system allowing asynchronous debate between doctors and patients about course of treatment, exercise programs, or follow-up queries.

- **Key Features**:
    - Patients text their assigned physician.
    - prescriptions, test results, file sharing, or otherwise
    - Instant alerts for recently arrived messages
    - Search power and message historical performance
    - HIPAA Compliance Based on Safe Data Encryption


---

<h2 align="left"> 3. Development Considerations</h2>

- **Security**: All patient and doctor interactions (appointments, consultations, messaging) must be HIPAA-compliant, ensuring the protection of sensitive health data.
- **Scalability**: The app should support large numbers of patients and doctors, especially when incorporating video consultations, requiring efficient server scaling.
- **API Integration**: Integration with video conferencing APIs (e.g., Zoom, WebRTC) and possibly external exercise databases for a rich library of guided therapy.
- **Push Notifications**
  
<h2 align="left">🔗 Video Links:</h2>

[Checkout the  Development Video Using ZenDevX](https://www.notion.so/OrthoCare-106890cc57a3807583d7c153e8340ba3?pvs=21)

<h2 align="left">Development with ZenDevx:</h2>

<a href="https://www.zendevx.com/" target="blank"><img align="center" src="https://github.com/user-attachments/assets/7dd7220f-e83c-4490-9ac2-beab3bcf8c35" alt="ZenDevX" height="auto" width="auto" /></a>



<h2 align="left">🐦 Connect with me:</h2>
         
 
<p align="left">

<a href="https://www.linkedin.com/company/zendevx/" target="blank"><img align="center" src="https://github.com/user-attachments/assets/9a6080ca-4265-43e5-8652-9454651970a9" alt="ZenDevX" height="50" width="50" /></a>
<a href="https://www.youtube.com/@zendevx" target="blank"><img align="center" src="https://github.com/user-attachments/assets/1beefdd6-fa17-49c9-bde7-e8f30f539b96" alt="ZenDevX" height="50" width="50" /></a>
<a href="#" target="blank"><img align="center" src="https://github.com/user-attachments/assets/f1eeb865-3d23-407a-9a2b-d76b4e85c6dd" alt="ZenDevX" height="50" width="50" /></a>
</p>


I hope you like the project. Thanks for reading :)
