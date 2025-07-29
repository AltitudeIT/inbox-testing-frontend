import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { configureAxiosRequestInterceptors } from "./services/ServiceConfig";
import LayoutLogin from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  configureAxiosRequestInterceptors();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutLogin />}>
            <Route index path="/" element={<LoginPage />} />
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
