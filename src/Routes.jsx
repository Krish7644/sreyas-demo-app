import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import DashboardScreen from "pages/dashboard-screen";
import ServiceManagementScreen from "pages/service-management-screen";
import CommunityFeedScreen from "pages/community-feed-screen";
import CommunicationHubScreen from "pages/communication-hub-screen";
import AuthenticationScreen from "pages/authentication-screen";
import SadhanaTrackingScreen from "pages/sadhana-tracking-screen";
import EventsYatrasScreen from "pages/events-yatras-screen";
import ProfileSettingsScreen from "pages/profile-settings-screen";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ServiceManagementScreen />} />
        <Route path="/dashboard-screen" element={<DashboardScreen />} />
        <Route path="/service-management-screen" element={<ServiceManagementScreen />} />
        <Route path="/community-feed-screen" element={<CommunityFeedScreen />} />
        <Route path="/communication-hub-screen" element={<CommunicationHubScreen />} />
        <Route path="/authentication-screen" element={<AuthenticationScreen />} />
        <Route path="/sadhana-tracking-screen" element={<SadhanaTrackingScreen />} />
        <Route path="/events-yatras-screen" element={<EventsYatrasScreen />} />
        <Route path="/profile-settings-screen" element={<ProfileSettingsScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;