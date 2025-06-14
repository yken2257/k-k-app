
### **Overall Development Roadmap**

#### **Technology Stack Summary**
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React (icons)
- **Backend/Database**: Supabase (PostgreSQL + Auth + Storage)
- **Date Handling**: date-fns
- **Calendar**: react-big-calendar or FullCalendar
- **PWA**: next-pwa
- **Deployment**: Vercel
- **Development Tools**: Biome (linting/formatting), TypeScript

#### **Phase 0: Foundation Setup (Groundwork)**

1.  **Environment Setup**
    *   Create devcontainer settings 
    *   Create a new Next.js project using `create-next-app` (TypeScript, Tailwind CSS, App Router).
    *   Install and configure Biome for linting and formatting.
    *   Install additional dependencies: UI library (shadcn/ui), date handling (date-fns), icons (lucide-react).
    *   Set up project structure and folder organization.
    *   Push the code to the GitHub repository.
    *   Create accounts for Supabase and Vercel.
2.  **Establish Deployment Cycle**
    *   Connect the Next.js project to Vercel to set up automatic deployment.
    *   Confirm that pushing a small change automatically deploys it to the production environment.
3.  **Implement Authentication**
    *   Create a Supabase project and set the environment variables in the Next.js project.
    *   Install Supabase client libraries (`@supabase/supabase-js`, `@supabase/ssr`).
    *   Enable the Google Auth provider in Supabase Auth.
    *   Set up Supabase client configuration and middleware for Next.js App Router.
    *   Implement login/logout functionality in Next.js and verify it works.
4.  **Verify DB Connection and CRUD**
    *   Create a temporary `notes` table in Supabase for testing.
    *   **Crucial:** Configure Row-Level Security (RLS) policies to ensure users can only manipulate their own data.
    *   Using Server Actions, implement basic CRUD (Create, Read, Update, Delete) operations for the `notes` table and verify they work.
5.  **Restrict User Registration**
    *   Implement a Supabase DB function and trigger to block new user sign-ups from unauthorized email addresses.
    *   Set up environment variables for authorized email addresses.
6.  **Create Profiles Table and Setup**
    *   Create the `profiles` table linked to `auth.users`.
    *   Set up RLS policies for profiles.
    *   Implement automatic profile creation on user signup.

#### **Phase 1: Expense Management Feature**

7.  **DB Schema Design (Expenses)**
    *   Create an `expenses` table in Supabase (columns: date, description, amount (in JPY), store_name (optional), paid_by_user_id, created_by_user_id, etc.).
    *   Set up RLS policies for this table to allow both users to view and edit all expenses.
8.  **Implement Expense Entry UI**
    *   Create a form component to input expense details with form validation.
    *   Implement a Server Action to add the data to the `expenses` table upon form submission.
    *   Add proper error handling and user feedback.
9.  **Implement Expense List & Settlement Feature**
    *   Create a page to display a list of expenses, filterable by month, sorted by date (newest first).
    *   On the same page, implement the logic to calculate total expenses, per-person share, and settlement amount (difference between what each person paid and their fair share).

#### **Phase 2: To-Do List Feature**

10. **DB Schema Design (To-Dos)**
    *   Create `todo_categories` and `todos` tables in Supabase (todos: description, category_id, assignee (Self/Partner/Both), due_date (optional), completed, created_by_user_id).
    *   Set up RLS policies to allow both users to view, edit, and delete all tasks and categories (shared system).
11. **Implement Category Management UI**
    *   Create a simple UI to add and manage To-Do categories.
12. **Implement To-Do List UI**
    *   Create a form to add new tasks (content, due date, assignee).
    *   Display the To-Do list, grouped by category, sorted by due date (earliest first, tasks without due dates last).
    *   Implement functionality to toggle the completion status via a checkbox and update the database accordingly.
    *   Allow any user to edit/delete any task regardless of creator.

#### **Phase 3: Schedule Sharing Feature**

13. **DB Schema Design (Schedules)**
    *   Create a `schedules` table in Supabase (columns: title, start_time, end_time (JST timezone), event_type (Shared/Individual), location (optional), description (optional), created_by_user_id).
    *   Set up RLS policies: both users can view all events, Individual events can only be edited/deleted by creator, Shared events can be edited/deleted by both users.
14. **Integrate a Calendar UI**
    *   Introduce a calendar library like `react-big-calendar` or `FullCalendar` into the Next.js project.
    *   Configure calendar for mobile responsiveness and JST timezone.
15. **Implement Event Display and CRUD**
    *   Fetch event data from the database and display it on the calendar.
    *   Use color-coding to distinguish between "shared events" and "individual events."
    *   Implement a feature to create new events by clicking on a date (e.g., in a modal) and saving them via a Server Action.
    *   Allow users to view, edit, and delete existing events by clicking on them.

#### **Phase 4: Navigation and Mobile Optimization**

16. **Implement Bottom Tab Navigation**
    *   Create a mobile-optimized bottom tab navigation bar to switch between Expense Management, To-Do List, Schedule Sharing sections.
    *   Ensure proper routing and active state indication.

#### **Phase 5: Final Touches**

17. **UI/UX Improvements**
    *   Refine the overall design using Tailwind CSS or a UI library (e.g., shadcn/ui).
    *   Adjust the layout for a better mobile experience (responsive design).
    *   Ensure all lists are properly sorted according to specifications.
    *   Add loading states, error handling, and user feedback throughout the app.
18. **PWA (Progressive Web App) Implementation**
    *   Integrate a library like `next-pwa`.
    *   Configure the `manifest.json` file and icons to allow installation on a smartphone's home screen.
    *   Implement basic offline caching (no advanced offline data sync required).
19. **Final Testing and Fine-Tuning**
    *   Use the application together for a few days to find bugs and usability issues.
    *   Make final adjustments based on feedback.
    *   Verify all authentication restrictions and RLS policies work correctly.
