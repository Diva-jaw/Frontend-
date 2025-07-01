import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import SignIn2 from './components/auth/SignIn2';
import NewUser from './components/auth/NewUser';
import Profile from './components/auth/Profile';
import EmployersLogin from './pages/EmployersLogin';
import ContactPage from './pages/ContactPage';
import EmployersDashboard from './pages/EmployersDashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import EmployerForgotPassword from './components/auth/EmployerForgotPassword';
import JobBoard from './pages/JobBoard';
import EmployeeTestimonials from './pages/EmployeeTestimonials';
import LifeAtRFTSection from './components/sections/LifeAtRFTSection';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import type {} from 'react-router-dom';
import { MessageSquareDot, Send, CheckCircle2 } from 'lucide-react';
import { ToastProvider } from './components/ToastContext'; // Import ToastProvider
import { ThemeProvider } from './components/ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import { useAuth } from './components/AuthContext';

import HRDashboard from './pages/hrDashboard/HRDashboard';
import EnquiryDashboard from './pages/hrDashboard/enquiry/EnquiryDetail';
import CandidateDetail from './pages/hrDashboard/enquiry/CandidateDetail';
import PostJob from './pages/hrDashboard/jobPost/PostJob';
import JobDashboard from './pages/hrDashboard/jobPost/JobDashboard';
import SignIn from './pages/hrDashboard/SignIn';
import HRLayout from './pages/hrDashboard/HRLayout';
import JobView from './pages/hrDashboard/jobPost/JobView';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '👋 Hello! How can I help you today?' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (chatInput.trim() === '') return;
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    // Toast will be managed by useToast in child components
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Thank you for your message! Our team will get back to you soon.' },
      ]);
    }, 800);
    setChatInput('');
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
          <ToastProvider> {/* Wrap the app with ToastProvider */}
            <Router>
              <Header isScrolled={isScrolled} />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/enquiry" element={<ContactPage />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/life-at-rft" element={<LifeAtRFTSection />} />
                  <Route path="/signin" element={<SignIn2 />} />
                  <Route path="/signup" element={<NewUser />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/employers-login" element={<EmployersLogin />} />
                  <Route path="/employers-dashboard" element={<EmployersDashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/employer-forgot-password" element={<EmployerForgotPassword />} />
                  <Route path="/apply" element={<JobBoard />} />
                  <Route path="/job-board" element={<JobBoard />} />
                  <Route path="/employee-says" element={<EmployeeTestimonials />} />
                  {/* HR Dashboard Routes */}
                  <Route path="/hr/signin" element={<SignIn />} />
                  <Route path="/hr" element={<HRLayout><Outlet /></HRLayout>}>
                    <Route index element={<HRDashboard />} />
                    <Route path="enquiry" element={<EnquiryDashboard />} />
                    <Route path="candidate/:candidateId" element={<CandidateDetail />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="posted-job" element={<JobDashboard />} />
                    <Route path="posted-job/:id" element={<JobView />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </Router>
          </ToastProvider>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;