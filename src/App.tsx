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
