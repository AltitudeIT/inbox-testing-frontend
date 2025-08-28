import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { configureAxiosRequestInterceptors } from "./services/ServiceConfig";
import LayoutLogin from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import LayoutDashboard from "./components/Layout/DashboardLayout/LayoutDashboard";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TestgroupPage from "./pages/TestgroupPage/TestgroupPage";
import InboxTestingPage from "./pages/InboxTesting/InboxTesting";
import SubscriberBreakdownPage from "./pages/SubscriberBreakdown/SubscriberBreakdown";
import InboxTestingDetailsPage from "./pages/InboxTesting/InboxTestingDetails/InboxTestingDetailsPage";
import ProfileDetailsPage from "./pages/ProfileDetails/ProfileDetailsPage";
import ProfileLayout from "./components/Layout/ProfileLayout/ProfileLayout";
import IntegrationsPage from "./pages/ProfileDetails/Integrations/IntegrationsPage";

function App() {
  configureAxiosRequestInterceptors();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutLogin />}>
            <Route index path="/" element={<LoginPage />} />
          </Route>
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inbox-testing" element={<InboxTestingPage />} />
            <Route path="/test-group" element={<TestgroupPage />} />
            <Route
              path="/subscriber-breakdown"
              element={<SubscriberBreakdownPage />}
            />
            <Route
              path="/inbox-testing/details/1"
              element={<InboxTestingDetailsPage />}
            />
            <Route element={<ProfileLayout />}>
              <Route path="/profile" element={<ProfileDetailsPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
