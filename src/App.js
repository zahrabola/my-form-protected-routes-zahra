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
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor/>} />
        <Route path="admin" element={<Admin />} />
        <Route path="lounge" element={<Lounge />} />

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
