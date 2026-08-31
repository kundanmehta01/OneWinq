import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import VerifyOTP from "../pages/auth/VerifyOTP.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ProfileDashboard from "../pages/dashboard/ProfileDashboard.jsx";
import Settings from "../pages/dashboard/Settings.jsx";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import Profile from "../pages/profile/Profile.jsx";
import EditProfile from "../pages/profile/EditProfile.jsx";
import PublicProfile from "../pages/profile/PublicProfile.jsx";
import Cards from "../pages/cards/Cards.jsx";
import CreateCard from "../pages/cards/CreateCard.jsx";
import EditCard from "../pages/cards/EditCard.jsx";
import CardPreview from "../pages/cards/CardPreview.jsx";
import Connections from "../pages/connections/Connections.jsx";
import ConnectionRequests from "../pages/connections/ConnectionRequests.jsx";
import FindPeople from "../pages/connections/FindPeople.jsx";
import ConnectionProfile from "../pages/connections/ConnectionProfile.jsx";
import SearchResults from "../pages/discovery/SearchResults.jsx";
import ExploreUsers from "../pages/discovery/ExploreUsers.jsx";
import ExploreCards from "../pages/discovery/ExploreCards.jsx";
import Discovery from "../pages/discovery/Discovery.jsx";
import Messages from "../pages/messages/Messages.jsx";
import Feed from "../pages/engagement/Feed.jsx";
import Engagement from "../pages/engagement/Engagement.jsx";
import Analytics from "../pages/engagement/Analytics.jsx";
import Activity from "../pages/engagement/Activity.jsx";
import Visitors from "../pages/engagement/Visitors.jsx";
import Organizations from "../pages/organizations/Organizations.jsx";
import CreateOrganization from "../pages/organizations/CreateOrganization.jsx";
import OrganizationDetails from "../pages/organizations/OrganizationDetails.jsx";
import EditOrganization from "../pages/organizations/EditOrganization.jsx";
import Members from "../pages/organizations/Members.jsx";
import OrganizationSettings from "../pages/organizations/OrganizationSettings.jsx";
import { CardProvider } from "../context/CardContext.jsx";
import { ConnectionProvider } from "../context/ConnectionContext.jsx";
function Protected() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading your workspace…</div>;
  return user ? <AppShell /> : <Navigate to="/login" replace />;
}
function PublicOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}
function CardRoutes() {
  return (
    <CardProvider>
      <Outlet />
    </CardProvider>
  );
}
function ConnectionRoutes() {
  return (
    <ConnectionProvider>
      <Outlet />
    </ConnectionProvider>
  );
}
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/cards/:slug" element={<CardPreview />} />
      <Route path="/profiles/:slug" element={<PublicProfile />} />
      <Route
        path="/login"
        element={
          <PublicOnly>
            <Login />
          </PublicOnly>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnly>
            <Signup />
          </PublicOnly>
        }
      />
      <Route
        path="/verify"
        element={
          <PublicOnly>
            <VerifyOTP />
          </PublicOnly>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnly>
            <ForgotPassword />
          </PublicOnly>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicOnly>
            <ResetPassword />
          </PublicOnly>
        }
      />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route element={<CardRoutes />}>
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/create" element={<CreateCard />} />
          <Route path="/cards/edit" element={<EditCard />} />
        </Route>
        <Route element={<ConnectionRoutes />}>
          <Route path="/connections" element={<Connections />} />
          <Route path="/connections/requests" element={<ConnectionRequests />} />
          <Route path="/connections/find" element={<FindPeople />} />
          <Route path="/connections/profile/:slug" element={<ConnectionProfile />} />
        </Route>
        <Route path="/discover" element={<Discovery />} />
        <Route path="/discovery/search" element={<SearchResults />} />
        <Route path="/discovery/users" element={<ExploreUsers />} />
        <Route path="/discovery/cards" element={<ExploreCards />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/engagement/analytics" element={<Analytics />} />
        <Route path="/engagement/activity" element={<Activity />} />
        <Route path="/engagement/visitors" element={<Visitors />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/new" element={<CreateOrganization />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/organizations/:id/edit" element={<EditOrganization />} />
        <Route path="/organizations/:id/members" element={<Members />} />
        <Route path="/organizations/:id/settings" element={<OrganizationSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
