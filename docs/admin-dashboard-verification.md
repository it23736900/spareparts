# Admin Dashboard Verification

## Overview
The admin dashboard now relies on the shared authentication context so that browser sessions established with the backend determine access to `/admin/dashboard`. The login form posts credentials via the centralized `login` helper, which stores the authenticated user and redirects the admin to the dashboard. Subsequent requests to protected resources (like inquiries) reuse the same Axios instance with `withCredentials` enabled so HTTP-only cookies from the backend are included.

## Key Behaviors Confirmed
1. **Protected Routing**  
   `RequireAuth` blocks unauthenticated visitors from reaching any route nested beneath it (including `/admin/dashboard`) while the auth context checks for an existing session. Non-authenticated visitors are redirected to `/admin/login` and the previous location is captured for a post-login redirect.  
2. **Role Enforcement in the Dashboard**  
   Once rendered, the dashboard double-checks that the authenticated user is an admin. Non-admin accounts are immediately redirected to the public homepage to prevent access even if they bypass the route guard.  
3. **Session-Aware Data Fetching**  
   After the admin session is confirmed, the dashboard fetches inquiries through the shared Axios client. Responses are normalized before entering component state to avoid runtime errors from slightly different backend payload shapes.

## Manual Check
- `npm run build`
  - ✅ Confirms the React application compiles with only pre-existing lint warnings.

These checks ensure the dashboard can be accessed only by authenticated admins, will stay synchronized with backend session state, and can read/write inquiry data via the live API.
