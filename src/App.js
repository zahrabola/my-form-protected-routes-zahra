import "./App.css";
import Login from "./Component/Login";
import Register from "./Component/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import LinkPage from "./Component/LinkPage";
import Unauthorised from "./Component/Unauthorised";
import Home from "./Component/Home";
import Editor from "./Component/Editor";
import Admin from "./Component/Admin";
import Lounge from "./Component/Lounge";
import Missing from "./Component/Missing";
import RequireAuth from "./Component/RequireAuth"; // routes require



const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorised" element={<Unauthorised />} />

 
          {/* Protected Routes */}
     
          <Route element={<RequireAuth allowedRoles={[2001]}/>}>
          <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984]}/>}>
          <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[5150]}/>}>
          <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/*catch all  */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
/* <h1> React JS Form Validation | Axios User Registration Form Submit</h1>  
    <Register /> 

    <p>React User Login and Authentication with Axios  2nd - youtube video  </p>
   <Login />
   */

  // important - relating to routing 
///https://github.com/LuminousIT/auth-protected-route/tree/master 
//https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4 