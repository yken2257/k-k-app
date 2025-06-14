### **Application Requirements Document**

#### **1. Overview**

*   **Application Name:** k and k app
*   **Purpose:** A closed, private web application designed to streamline daily life and improve information sharing for a couple/partners.
*   **Users:** Two pre-authorized users only.

#### **2. Functional Requirements**

##### **2.1. User Authentication**
*   **FR-1.1 (User Registration):** The system shall prevent new user registration from any email addresses other than the two specified ones (configured via environment variables). Authentication will be handled via Google OAuth or email/password.
*   **FR-1.2 (Login/Logout):** Users must be able to log in and log out using their credentials.
*   **FR-1.3 (Access Control):** Unauthenticated users shall not be able to access any application features. Each piece of data can only be viewed and manipulated by its creator or designated partner (automatically determined as the other user in the 2-user system).

##### **2.2. Expense Management**
*   **FR-2.1 (Record Expense):** A user shall be able to record an expense with the following details:
    *   Date (When)
    *   Description (What)
    *   Amount (How much) - *in Japanese Yen (¥)*
    *   Store Name (Where) - *Optional*
    *   Payer (Who paid)
*   **FR-2.2 (Edit/Delete Expense):** Users shall be able to edit and delete their recorded expenses.
*   **FR-2.3 (Monthly View):** The system shall display a list of expenses on a per-month basis, with the ability to navigate between months. Expenses shall be sorted by date in descending order (newest first).
*   **FR-2.4 (Settlement Function):** For a selected month, the system shall calculate and display the total expenses, the per-person share, and who owes whom how much for settlement (calculating the difference between what each person paid and their fair share).

##### **2.3. To-Do List**
*   **FR-3.1 (Category Management):** Users shall be able to create and manage categories for To-Do items (e.g., "Shopping," "Trip Prep"). Categories are shared between both users.
*   **FR-3.2 (Create Task):** A user shall be able to create a task with the following details:
    *   Task description
    *   Category
    *   Assignee (Self / Partner / Both)
    *   Due Date - *Optional*
    *   Creator (recorded automatically)
*   **FR-3.3 (Display Task):** Tasks shall be displayed in a list, grouped by category, showing the assignee, due date, and completion status. Tasks shall be sorted by due date (earliest first), with tasks without due dates appearing last.
*   **FR-3.4 (Update/Delete Task):** Users shall be able to toggle the completion status of a task and edit or delete existing tasks. Any user can delete any task regardless of who created it.

##### **2.4. Schedule Sharing**
*   **FR-4.1 (Record Event):** A user shall be able to record a schedule/event with the following details:
    *   Event Title
    *   Start Time & Date (in JST timezone)
    *   End Time & Date (in JST timezone)
    *   Event Type (Shared / Individual)
    *   Location - *Optional*
    *   Description - *Optional*
*   **FR-4.2 (Calendar Display):** The system shall display all events on a shared calendar (monthly or weekly view). "Shared" and "Individual" events must be visually distinguishable (e.g., by color).
*   **FR-4.3 (Event Manipulation):** Users shall be able to edit and delete recorded events. Individual events can only be edited/deleted by their creator, while Shared events can be edited/deleted by both users. The system shall allow users to intuitively add new events by selecting a date on the calendar.

##### **2.5. User Interface**
*   **FR-5.1 (Navigation):** The application shall provide a bottom tab navigation bar optimized for mobile use, allowing users to switch between the main features (Expense Management, To-Do List, Schedule Sharing, and potentially other sections).

#### **3. Non-Functional Requirements**

*   **NFR-1 (Platform):** The application must be optimized for use on smartphones. It should be installable on a smartphone's home screen as a Progressive Web App (PWA).
*   **NFR-2 (Security):** While deployed on the internet, application access must be strictly limited to the two authenticated users. Data must be protected from unauthorized access (e.g., via Row-Level Security).
*   **NFR-3 (Performance):** Page loads and data updates should be fast and responsive, providing a smooth user experience.
*   **NFR-4 (Technology Stack):**
    *   **Frontend/Framework:** Next.js (App Router)
    *   **Database/Backend:** Supabase
    *   **Authentication:** Supabase Auth
    *   **Hosting:** Vercel
*   **NFR-5 (Notifications):** Push notifications and in-app notifications are not required for the initial version.
*   **NFR-6 (Offline Support):** Basic offline functionality through PWA caching is sufficient. Full offline data synchronization is not required for the initial version.