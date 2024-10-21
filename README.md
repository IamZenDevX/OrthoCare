# OrthoCare
A digital platform for orthopedic patients to receive guided physical therapy exercises, monitor their recovery progress, and consult with orthopedic specialists remotely.

- **Required Modules**:
    - Exercise video library
    - Progress tracker (range of motion, pain levels)
    - Remote consultation via video calls
    - Appointment scheduling
    - Doctor-patient messaging
- Development Scope
    
    To develop **OrthoCare**, a digital platform for orthopedic patients, here is a detailed breakdown of the **database structure** and **module functionalities**.
    

### 1. **Database Structure**

The platform will require a relational database to manage patient data, doctor information, appointments, exercises, and consultations. Below is a proposed database structure with the key tables.

### **Tables**:

---

### a) **Users** (for both patients and doctors) (sign up,forgot pass,login validate,update profile)

| **Field Name** | **Type** | **Description** |  |
| --- | --- | --- | --- |
| `user_id` | INT (PK) | Unique user identifier |  |
| `name` | VARCHAR(255) | User's full name |  |
| `email` | VARCHAR(255) | User's email address |  |
| `password` | VARCHAR(255) | Encrypted password | not update  |
| `role` | ENUM('Patient', 'Doctor', 'Admin') | User role in the system | if doctor entry in doctor db ,not update |
| `phone` | VARCHAR(20) | Contact number |  |
| `date_of_birth` | DATE | Date of birth for age tracking |  |
| `address` | VARCHAR(255) | User's residential address |  |
| `profile_picture` | VARCHAR(255) | Profile image URL |  |
| `created_at` | TIMESTAMP | Account creation timestamp |  |
| `updated_at` | TIMESTAMP | Last updated timestamp |  |

---

### b) **Doctors(crud,list)**

| **Field Name** | **Type** | **Description** |  |
| --- | --- | --- | --- |
| `doctor_id` | INT (PK) | Unique identifier for doctors |  |
| `user_id` | INT (FK) | Link to the Users table |  |
| `specialization` | VARCHAR(255) | Doctor's area of specialization (e.g., orthopedics) | yes |
| `license_number` | VARCHAR(100) | Medical license number | yes |
| `experience_years` | INT | Number of years of experience | yes,1 to 5 range |
| `bio` | TEXT | Short bio of the doctor | contains |
| `availability` | JSON | Doctor's availability for consultations (e.g., time slots, days) | day and time slot |

---

### c) **Patients(crud,list,doctor assign,get assign doctor,get patient list by doctor id)**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `patient_id` | INT (PK) | Unique patient identifier |
| `user_id` | INT (FK) | Link to the Users table |
| `medical_history` | TEXT | Patient's medical history (injuries, surgeries, etc.) |
| `current_condition` | VARCHAR(255) | Current orthopedic condition (e.g., ACL tear) |
| `assigned_doctor` | INT (FK) | Link to the Doctors table (doctor assigned to the patient) |

---

### d) **Exercises(crud ,list)**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `exercise_id` | INT (PK) | Unique identifier for exercises |
| `title` | VARCHAR(255) | Exercise title (e.g., "Knee Stretch") |
| `description` | TEXT | Detailed description of the exercise |
| `video_url` | VARCHAR(255) | Link to the video demonstrating the exercise |
| `difficulty_level` | ENUM('Easy', 'Moderate', 'Hard') | Difficulty level of the exercise |
| `target_area` | VARCHAR(255) | Body part targeted (e.g., knee, shoulder) |
| `duration_minutes` | INT | Estimated time for exercise (in minutes) |
| `repetitions` | INT | Number of recommended repetitions |

---

### e) **Patient Exercises (create,get,list,update status,update progress**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `patient_exercise_id` | INT (PK) | Unique identifier |
| `patient_id` | INT (FK) | Link to the Patients table |
| `exercise_id` | INT (FK) | Link to the Exercises table |
| `assigned_by` | INT (FK) | Doctor who assigned the exercise (link to Doctors table) |
| `start_date` | DATE | Start date for the exercise program |
| `end_date` | DATE | End date for the exercise program |
| `status` | ENUM('Ongoing', 'Completed', 'Missed') | Current status of the exercise |
| `progress` | TEXT | Patient’s comments on the progress (pain levels, range of motion) |

---

### f) **Appointments (create app , ask appointment slot time)**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `appointment_id` | INT (PK) | Unique identifier for appointments |
| `patient_id` | INT (FK) | Link to the Patients table |
| `doctor_id` | INT (FK) | Link to the Doctors table |
| `appointment_date` | DATETIME | Date and time of the appointment |
| `consultation_mode` | ENUM('Video', 'In-Person') | Mode of consultation (video or in-person) |
| `status` | ENUM('Scheduled', 'Completed', 'Cancelled') | Current status of the appointment |
| `appointment_end_date` |  |  |

---

### g) **Consultations(crud ,list by 3 id)**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `consultation_id` | INT (PK) | Unique identifier for consultations |
| `patient_id` | INT (FK) | Link to the Patients table |
| `doctor_id` | INT (FK) | Link to the Doctors table |
| `appointment_id` | INT (FK) | Link to the Appointments table |
| `notes` | TEXT | Doctor's notes from the consultation |
| `prescriptions` | TEXT | Prescriptions or recommendations post-consultation |
| `video_recording` | VARCHAR(255) | Video recording link (if recorded) |

---

### h) **Messages (crud ,list by sender id OR receiver id)**

| **Field Name** | **Type** | **Description** |
| --- | --- | --- |
| `message_id` | INT (PK) | Unique message identifier |
| `sender_id` | INT (FK) | User ID of the message sender |
| `receiver_id` | INT (FK) | User ID of the message receiver |
| `message` | TEXT | Content of the message |
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
