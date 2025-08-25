import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Projects from './pages/Projectpage';
import Projectdetails from './pages/ProjectDetails';
import Craretprojects from './Pages/Createprojectpage';
import Issues from './pages/Issuespage';
import Createissues from './pages/CreateIssuepage';
import Updateissues from './pages/UpdateIssuepage';
import Login from './Pages/Loginpage';
import Register from './pages/Registerpage';
import UpdateProject from './Pages/UpdateProject';
import ProtectedRoute from './Components/Protectedroute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectdetails/:id" element={<Projectdetails />} />
          <Route path="/create" element={<Craretprojects />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/createissues" element={<Createissues />} />
          <Route path="/updateissues/:id" element={<Updateissues />} />
          <Route path="/updateproject/:id" element={<UpdateProject />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
