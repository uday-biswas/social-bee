import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/pages/Dashboard";
import Error from "./component/pages/ErrorPage";
import ForgotPassword from "./component/pages/ForgotPassword";
import Header from "./component/common/Header";
import HomePage from "./component/pages/HomePage";
import Footer from "./component/common/Footer";
import Login from "./component/pages/Login";
import PrivateRoute from "./component/core/auth/PrivateRoute";
import Settings from "./component/core/dashboard/settings";
import Signup from "./component/pages/Signup";
import UpdatePassword from "./component/pages/UpdatePassword";
import VerifyEmail from "./component/pages/VerifyEmail";
import PostScreen from "./component/pages/PostScreen";

function App() {
  return (
    <div
        className="bg-richblack-900 w-screen 
       mx-auto flex flex-col px-2 "
      >
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/update-password/:id" element={<UpdatePassword />} />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* add account type validations */}
            <Route path="/dashboard/posts" element={<PostScreen />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
  );
}

export default App;
