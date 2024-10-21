# OrthoCare
A digital platform for orthopedic patients to receive guided physical therapy exercises, monitor their recovery progress, and consult with orthopedic specialists remotely.

- **Required Modules**:
    - Exercise video library
    - Progress tracker (range of motion, pain levels)
    - Remote consultation via video calls
    - Appointment scheduling
    - Doctor-patient messaging

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
    

### 1. **Database Structure**

The platform will require a relational database to manage patient data, doctor information, appointments, exercises, and consultations. Below is a proposed database structure with the key tables.

### **Tables**:

---

### a) **Users**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `user_id` | INT (PK) | Unique user identifier |
| `name` | String | User's full name |
| `email` | String | User's email address |
| `password` | Password | Encrypted password |
| `role` | ENUM('Patient', 'Doctor', 'Admin') | User role in the system |
| `phone` | String | Contact number |
| `date_of_birth` | DATE | Date of birth for age tracking |
| `address` | String | User's residential address |
| `profile_picture` | String | Profile image URL |
| `created_at` | TIMESTAMP | Account creation timestamp |
| `updated_at` | TIMESTAMP | Last updated timestamp |

---

### b) **Doctors**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `doctor_id` | String | Unique identifier for doctors |
| `user_id` | String | Link to the Users table |
| `specialization` | String | Doctor's area of specialization (e.g., orthopedics) |
| `license_number` | String | Medical license number |
| `experience_years` | Number | Number of years of experience |
| `bio` | String | Short bio of the doctor |
| `availability` | JSON | Doctor's availability for consultations (e.g., time slots, days) |

---

### c) **Patients**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `patient_id` | String | Unique patient identifier |
| `user_id` | String | Link to the Users table |
| `medical_history` | String | Patient's medical history (injuries, surgeries, etc.) |
| `current_condition` | String | Current orthopedic condition (e.g., ACL tear) |
| `assigned_doctor` | String | Link to the Doctors table (doctor assigned to the patient) |

---

### d) **Exercises**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `exercise_id` | String | Unique identifier for exercises |
| `title` | String | Exercise title (e.g., "Knee Stretch") |
| `description` | String | Detailed description of the exercise |
| `video_url` | String | Link to the video demonstrating the exercise |
| `difficulty_level` | ENUM('Easy', 'Moderate', 'Hard') | Difficulty level of the exercise |
| `target_area` | String | Body part targeted (e.g., knee, shoulder) |
| `duration_minutes` | String | Estimated time for exercise (in minutes) |
| `repetitions` | String | Number of recommended repetitions |

---

### e) **Patient Exercises**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `patient_exercise_id` | String | Unique identifier |
| `patient_id` | String | Link to the Patients table |
| `exercise_id` | String | Link to the Exercises table |
| `assigned_by` | String | Doctor who assigned the exercise (link to Doctors table) |
| `start_date` | DATE | Start date for the exercise program |
| `end_date` | DATE | End date for the exercise program |
| `status` | ENUM('Ongoing', 'Completed', 'Missed') | Current status of the exercise |
| `progress` | String | Patient’s comments on the progress (pain levels, range of motion) |

---

### f) **Appointments**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `appointment_id` | String | Unique identifier for appointments |
| `patient_id` | String | Link to the Patients table |
| `doctor_id` | String | Link to the Doctors table |
| `appointment_date` | DATETIME | Date and time of the appointment |
| `consultation_mode` | ENUM('Video', 'In-Person') | Mode of consultation (video or in-person) |
| `status` | ENUM('Scheduled', 'Completed', 'Cancelled') | Current status of the appointment |
| `appointment_end_date` | DATETIME |  |

---

### g) **Consultations**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `consultation_id` | String | Unique identifier for consultations |
| `patient_id` | String | Link to the Patients table |
| `doctor_id` | String | Link to the Doctors table |
| `appointment_id` | String | Link to the Appointments table |
| `notes` | String | Doctor's notes from the consultation |
| `prescriptions` | String | Prescriptions or recommendations post-consultation |
| `video_recording` | String | Video recording link (if recorded) |

---



### h) **Messages**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `message_id` | String | Unique message identifier |
| `sender_id` | String | User ID of the message sender |
| `receiver_id` | String | User ID of the message receiver |
| `message` | String | Content of the message |
| `timestamp` | TIMESTAMP | Message sent timestamp |

### 2. **Module Functionalities**

### a) **Exercise Video Library**

This module provides a searchable library of orthopedic exercises for patients. Doctors can assign specific exercises to patients, and patients can follow video instructions.

- **Key Features**:
    - Exercise search and filtering (by difficulty, body part, etc.)
    - Video tutorials embedded from video hosting services (e.g., YouTube, Vimeo)
    - Doctor assignment of exercises to patients
    - Track assigned exercises with start and end dates
    - Completion status and progress tracking for exercises

---

### b) **Progress Tracker**

This module helps patients track their recovery progress. Patients can log their range of motion, pain levels, and exercise completion. Doctors can review this data to adjust treatment plans.

- **Key Features**:
    - Range of motion (e.g., flexion, extension) input by the patient
    - Pain level tracker (0-10 scale)
    - Daily/weekly exercise completion tracker
    - Graphical reports for doctors to monitor progress
    - Feedback system where patients can share comments or concerns
    - Automated reminders for patients to update their progress

---

### c) **Remote Consultation (Video Calls)**

This module enables remote video consultations between patients and doctors, allowing doctors to assess patient recovery and provide guidance without in-person visits.

- **Key Features**:
    - Secure video conferencing integration (e.g., WebRTC, Zoom API)
    - Appointment scheduling for video consultations
    - In-session chat feature for file sharing (e.g., reports, x-rays)
    - Option to record consultations for future reference
    - End-to-end encryption for secure communication

---

### d) **Appointment Scheduling**

This module allows patients to schedule appointments with their assigned orthopedic specialist for either in-person or remote consultations.

- **Key Features**:
    - View doctor’s availability in real-time
    - Book and reschedule appointments
    - Notifications and reminders for upcoming appointments
    - Cancellation and rescheduling functionality
    - Appointment history for patients and doctors

---

### e) **Doctor-Patient Messaging**

A secure messaging system allowing doctors and patients to communicate asynchronously about exercise plans, treatment options, or follow-up questions.

- **Key Features**:
    - Direct messaging between patients and their assigned doctor
    - File sharing (e.g., prescriptions, test results)
    - Real-time notifications for new messages
    - Message history and search functionality
    - Secure data encryption for HIPAA compliance

---

### 3. **Development Considerations**

- **Security**: All patient and doctor interactions (appointments, consultations, messaging) must be HIPAA-compliant, ensuring the protection of sensitive health data.
- **Scalability**: The app should support large numbers of patients and doctors, especially when incorporating video consultations, requiring efficient server scaling.
- **API Integration**: Integration with video conferencing APIs (e.g., Zoom, WebRTC) and possibly external exercise databases for a rich library of guided therapy.
- **Push Notifications**
