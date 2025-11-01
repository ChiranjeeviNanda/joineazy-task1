# Joineazy Task 1: Assignment & Review Dashboard

A responsive, role-based dashboard application for managing and tracking student assignment submissions, built as a frontend task for Joineazy.

## Live Demo

You can view the live deployment of this project here:
**[joineazy-task1-two.vercel.app](https://joineazy-task1-two.vercel.app/)**

---

## Project Overview

This application fulfills the requirements for **Task 1 – Frontend: Assignment & Review Dashboard**. It provides two distinct, role-based interfaces: one for **Students** to manage submissions, and one for **Admins (Professors)** to track student progress.

### Core Features

* **Role-Based Views:**
    * **Student View:** Displays a list of their assignments and current submission status.
    * **Admin View:** Displays assignments they created and a list of students' submission progress for each.
* **Submission Flow (Student):** Implements a double-verification process for confirming assignment submission status.
* **Progress Tracking (Admin):** Visualizes student submission status (Submitted/Pending) using progress bars on the assignment details screen.
* **Light/Dark Theme:** Includes a theme toggle to switch between light and dark modes for user preference.
* **Mobile Responsiveness:** Fully functional and visually optimized across desktop and mobile devices.
* **Data Isolation:** Ensures students only see their own data and admins only see data related to assignments they manage.

### Technical Features

* **Modern Frontend Stack:** Utilizes React and Vite for a fast development experience.
* **Tailwind CSS:** Used for utility-first styling and ensuring full responsiveness.
* **Mock Data:** All user and assignment data is simulated locally using JSON or JavaScript objects (as a backend is not required).
* **UI Components:** Leverages daisyUI components for a clean, consistent, and quick-to-implement user interface.

---

## Screenshots

A collection of screenshots showcasing the application's key views and responsiveness.

## 📸 Screenshots

A collection of screenshots demonstrating the application's key views, responsiveness across devices, and theme variations.

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/59960d79-5536-45de-aebe-a739ca6fde10" width="300" alt="Admin Dashboard - Desktop Light Theme" />
        <br />
        <sub><b>Admin Dashboard (Desktop - Light Theme)</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/e3bddd3d-8ec5-4e17-a285-69757a31a782" width="300" alt="Student Dashboard - Desktop Light Theme" />
        <br />
        <sub><b>Student Dashboard (Desktop - Light Theme)</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/f30c4c9e-b175-4e14-a1f2-626553ca9edf" width="300" alt="Admin Progress View - Desktop Dark Theme" />
        <br />
        <sub><b>Admin Progress (Desktop - Dark Theme)</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/9d78d0bf-cfc0-48ff-829f-9820284c6038" width="200" alt="Student Dashboard - Mobile Light Theme" />
        <br />
        <sub><b>Student Dashboard (Mobile - Light Theme)</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/41375d4a-21a3-465b-8307-e5354327e488" width="200" alt="Admin Dashboard - Mobile Dark Theme" />
        <br />
        <sub><b>Admin Dashboard (Mobile - Dark Theme)</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/f710091b-3933-4af7-b868-62f8772fae50" width="200" alt="Login Page - Mobile" />
        <br />
        <sub><b>Login Page (Mobile)</b></sub>
      </td>
    </tr>
  </table>
</div>

---

## Tech Stack & Dependencies

The project is built using the required stack and key dependencies listed in `package.json`:

### Key Technologies
| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React** | Component-based UI development. |
| **Build Tool** | **Vite** | Fast bundling, HMR, and project tooling. |
| **Styling** | **Tailwind CSS** | Utility-first CSS for responsive design. |
| **UI Library** | **daisyUI** | Tailwind CSS component library for modern, accessible components. |
| **Routing** | **react-router-dom** | Declarative routing for navigation between the dashboard and assignment details. |
| **Icons** | **lucide-react** | Lightweight and customizable SVG icon library. |

---

## Architecture Overview

### Folder Structure

The project follows a component-based architecture within the standard React/Vite structure:
```
joineazy-task1/
├── App.jsx
├── index.css                    // Global styles, including Tailwind setup and theme configuration
├── main.jsx
├── public/
│   └── vite-logo.svg
└── src/
    ├── assets/                  // Static files like images or icons.
    ├── components/
    │   ├── admin/               // Components for the Admin user interface.
    │   ├── common/              // Reusable components shared across all parts of the application.
    │   └── student/             // Components for the Student user interface.
    ├── context/                 // Houses the application's central state management provider.
    ├── data/                    // Contains the simulated data for the application.
    ├── hooks/                   // Custom React hooks for logic reuse.
    ├── pages/                   // Top-level components representing full views or screens.
    └── utils/                   // Stores global utility functions and constants.
```

### Component Structure and Design Decisions

* **Centralized State (Context API):** State, including user **role** and all assignment data, is managed centrally by **`AppContext.jsx`**. The **`useAppContext.js`** hook provides clean access to this global state across all components.
* **Role-Based View Separation:** The **`DashboardPage.jsx`** component handles conditional rendering, directing the user to either the **`AdminDashboardPage`** or **`StudentDashboardPage`** based on their role, maintaining a clean top-level routing structure.
* **Component Isolation:** Logic and UI components are strictly organized into folders (`admin/`, `student/`, `common/`). This ensures clear separation for complex features like the Admin's **`CreateAssignmentModal`** and the Student's double-verification **`SubmissionModal`**.
* **Mock Data Source:** All application data is simulated and stored locally in **`mockData.js`**, fulfilling the requirement to operate without a backend.
* **Mobile Responsiveness:** The design utilizes **Tailwind CSS** and **daisyUI** to ensure the entire dashboard is fully **responsive** and optimized for seamless viewing across all mobile and desktop screen sizes.

---

## Project Setup Instructions

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### Installation and Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ChiranjeeviNanda/joineazy-task1.git](https://github.com/ChiranjeeviNanda/joineazy-task1.git)
    cd joineazy-task1
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application locally:**
    ```bash
    npm run dev
    ```
    The application will start in development mode, typically at `http://localhost:5173`.

### Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with HMR. |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs the configured ESLint rules for code quality. |

---

## Author

**[@ChiranjeeviNanda](https://github.com/ChiranjeeviNanda)**

---
