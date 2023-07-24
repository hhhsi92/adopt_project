import "./common/common.css";
import "./components/form/form.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalStyles from "./common/GlobalStyles";
import ScrollToTop from "./common/scrollToTop";
import { CookiesProvider } from "react-cookie";

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/sidebar";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import AuthCheck from "./pages/auth/components/authCheck";


function App() {
  const location = useLocation();

  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(location.pathname.includes("auth"));
  }, [location]);

  return (
    <CookiesProvider>
      <ScrollToTop />
      <GlobalStyles />
      <ToastContainer autoClose={2000} />

      {isAuthPage ? (
        <Outlet />
      ) : (
        <>
          {/* <AuthCheck /> */}
          <Topbar />
          <div className="container">
            {/* <Sidebar /> */}
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </CookiesProvider>
  );
}

export default App;
