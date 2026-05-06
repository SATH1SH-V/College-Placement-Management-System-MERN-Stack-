import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import UpcomingDrives from "./pages/UpcomingDrives";
import PastDrives from "./pages/PastDrives";
import PlacedStudents from "./pages/PlacedStudents";
import CompanyList from "./pages/CompanyList";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddCompany from "./components/admin/forms/AddCompany";
import AddDrive from "./components/admin/forms/AddDrive";
import AddStudent from "./components/admin/forms/AddStudent";
import UploadStudents from "./components/admin/forms/UploadStudents";
import { Toaster } from 'react-hot-toast';
import Footer from './components/layout/Footer';
import "./index.css";

function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
          },
        }}
      />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<UpcomingDrives />} />
          <Route path="/past" element={<PastDrives />} />
          <Route path="/placed" element={<PlacedStudents />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<div className="text-center mt-4" style={{color: 'var(--text-secondary)'}}><h3>Select an option above to get started.</h3></div>} />
            <Route path="dashboard" element={<div className="text-center mt-4" style={{color: 'var(--text-secondary)'}}><h3>Dashboard Stats Loading...</h3></div>} />
          </Route>
          <Route path="/admin/add-company" element={<AddCompany />} />
          <Route path="/admin/add-drive" element={<AddDrive />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/upload-students" element={<UploadStudents />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;