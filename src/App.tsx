import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Careers from "./pages/Careers";
import SignIn2 from "./components/auth/SignIn2";
import NewUser from "./components/auth/NewUser";
import Profile from "./components/auth/Profile";
import EmployersLogin from "./pages/EmployersLogin";
import ContactPage from "./pages/ContactPage";
import EmployersDashboard from "./pages/EmployersDashboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import EmployerForgotPassword from "./components/auth/EmployerForgotPassword";
import JobBoard from "./pages/JobBoard";
import EmployeeTestimonials from "./pages/EmployeeTestimonials";
import LifeAtRFTSection from "./components/sections/LifeAtRFTSection";
import MDUPage from "./pages/MDU";
import CRDPage from "./pages/CRD";
import AllCourses from "./pages/AllCourses";
import CoursesDropdown from "./components/layout/CoursesDropdown";
import DataScienceLevels from "./components/sections/DataScienceLevels";
import DataScienceLevel1 from "./pages/DataScienceLevel1";
import DataScienceLevel2 from "./pages/DataScienceLevel2";
import DataScienceLevel3 from "./pages/DataScienceLevel3";
import AIMLLevel1 from "./pages/AIMLLevel1";
import AIMLLevel2 from "./pages/AIMLLevel2";
import AIMLLevel3 from "./pages/AIMLLevel3";
import WebDevelopmentEssentials from "./pages/WebDevelopmentEssentials";
import ReactJSDetails from "./pages/ReactJSDetails";
import AngularDetails from "./pages/AngularDetails";
import TailwindDetails from "./pages/TailwindDetails";
import ReactNativeDetails from "./pages/ReactNativeDetails"; 
import FlutterDetails from "./pages/FlutterDetails";
import SwiftDetails from "./pages/SwiftDetails";
import ProfileDashboard from "./pages/ProfileDashboard";
import NodeExpressDetails from "./pages/NodeExpressDetails";
import JavaSpringDetails from "./pages/JavaSpringDetails";
import PythonDjangoDetails from "./pages/PythonDjangoDetails";
import GoGinDetails from "./pages/GoGinDetails";
import DartServerDetails from "./pages/DartServerDetails";
import PythonFlaskFastAPIDetails from "./pages/PythonFlaskFastAPIDetails";
import JavaKotlinBackendDetails from "./pages/JavaKotlinBackendDetails";
import DigitalMarketingLevel1 from "./pages/DigitalMarketingLevel1";
import DigitalMarketingLevel2 from "./pages/DigitalMarketingLevel2";
import DigitalMarketingLevel3 from "./pages/DigitalMarketingLevel3";
import SalesMarketingLevel1 from "./pages/SalesMarketingLevel1";
import SalesMarketingLevel2 from "./pages/SalesMarketingLevel2";
import SalesMarketingLevel3 from "./pages/SalesMarketingLevel3";
import WebUIDesignLevel1 from "./pages/WebUIDesignLevel1";
import WebUIDesignLevel2 from "./pages/WebUIDesignLevel2";
import WebUIDesignLevel3 from "./pages/WebUIDesignLevel3";
import GraphicVideoDesignLevel1 from "./pages/GraphicVideoDesignLevel1";
import GraphicVideoDesignLevel2 from "./pages/GraphicVideoDesignLevel2";
import GraphicVideoDesignLevel3 from "./pages/GraphicVideoDesignLevel3";
import MechanicalCADLevel1 from "./pages/MechanicalCADLevel1";
import MechanicalCADLevel2 from "./pages/MechanicalCADLevel2";
import MechanicalCADLevel3 from "./pages/MechanicalCADLevel3";
import ProductManagementLevel1 from "./pages/ProductManagementLevel1";
import ProductManagementLevel2 from "./pages/ProductManagementLevel2";
import ProductManagementLevel3 from "./pages/ProductManagementLevel3";
import FullStackCourses from "./pages/FullStackCourses";
import MarketingCourses from "./pages/MarketingCourses";
import DesignCourses from "./pages/DesignCourses";
import ProductManagementCourses from "./pages/ProductManagementCourses";
import DataScienceCourses from "./pages/DataScienceCourses";


import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ToastProvider } from "./components/ToastContext";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import HRDashboard from "./pages/hrDashboard/HRDashboard";
import EnquiryDashboard from "./pages/hrDashboard/enquiry/EnquiryDetail";
import CandidateDetail from "./pages/hrDashboard/enquiry/CandidateDetail";
import PostJob from "./pages/hrDashboard/jobPost/PostJob";
import JobDashboard from "./pages/hrDashboard/jobPost/JobDashboard";
import SignIn from "./pages/hrDashboard/SignIn";
import HRLayout from "./pages/hrDashboard/HRLayout";
import JobView from "./pages/hrDashboard/jobPost/JobView";
import ApplyJobPage from "./pages/ApplyJobPage";
import ApplicationManagementDashboard from "./pages/hrDashboard/ApplicationManagementDashboard";
import EngineeringApplications from "./pages/hrDashboard/EngineeringApplications";
import DesignApplications from "./pages/hrDashboard/DesignApplications";
import MarketingApplications from "./pages/hrDashboard/MarketingApplications";
import SalesApplications from "./pages/hrDashboard/SalesApplications";
import HRApplications from "./pages/hrDashboard/HRApplications";
import FinanceApplications from "./pages/hrDashboard/FinanceApplications";
import OperationsApplications from "./pages/hrDashboard/OperationsApplications";
import AppliedForms from "./pages/hrDashboard/AppliedForms";
import AppliedCourses from "./pages/hrDashboard/AppliedCourses";
import CourseLevels from "./pages/hrDashboard/CourseLevels";
import CourseApplications from "./pages/hrDashboard/CourseApplications";
import ModuleCategories from "./pages/hrDashboard/ModuleCategories";
import DesignCategoryLevels from "./pages/hrDashboard/DesignCategoryLevels";
import DepartmentHiringProcess from "./pages/hrDashboard/DepartmentHiringProcess";
import StepAppliedFormsList from "./pages/hrDashboard/StepAppliedFormsList";
import UserProfilePopup from "./components/auth/UserProfilePopup";
import JavaAndroidDetails from "./pages/JavaAndroidDetails";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I help you today?" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = () => {
    if (chatInput.trim() === "") return;
    setChatMessages([...chatMessages, { from: "user", text: chatInput }]);
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Thank you for your message! Our team will get back to you soon." },
      ]);
    }, 800);
    setChatInput("");
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
          <ToastProvider>
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
                  <Route path="/profile-dashboard" element={<ProfileDashboard />} />
                  <Route path="/all-courses" element={<AllCourses />} />

                  <Route path="/employers-login" element={<EmployersLogin />} />
                  <Route path="/employers-dashboard" element={<EmployersDashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/employer-forgot-password" element={<EmployerForgotPassword />} />
                  <Route path="/apply" element={<JobBoard />} />
                  <Route path="/job-board" element={<JobBoard />} />
                  <Route path="/employee-says" element={<EmployeeTestimonials />} />
                  <Route path="/mdu" element={<MDUPage />} />
                  <Route path="/crd" element={<CRDPage />} />
                  <Route path="/user-profile" element={<UserProfilePopup name="Riya Singh" email="0702riya@gmail.com" />} />
                  <Route path="/reactjs-details" element={<ReactJSDetails />} />
                  <Route path="/angular-details" element={<AngularDetails />} />
                  <Route path="/tailwind-details" element={<TailwindDetails />} />
                  <Route path="/react-native-details" element={<ReactNativeDetails />} />
                  <Route path="/node-express-details" element={<NodeExpressDetails/>}/>
                  <Route path="/java-spring-details" element={<JavaSpringDetails/>}/>
                  <Route path="/python-django-details" element={<PythonDjangoDetails/>}/>
                  <Route path="/go-gin-details" element={<GoGinDetails/>}/>
                                 
                  {/* Course Routes with Dynamic Slugs */}
                  <Route path="/courses" element={<CoursesDropdown />} />
                  <Route path="/data-science-levels" element={<DataScienceCourses />} />
                  <Route path="/data-science/level-1" element={<DataScienceLevel1 />} />
                  <Route path="/data-science/level-2" element={<DataScienceLevel2 />} />
                  <Route path="/data-science/level-3" element={<DataScienceLevel3 />} />
                  <Route path="/ai-ml/level-1" element={<AIMLLevel1 />} />
                  <Route path="/ai-ml/level-2" element={<AIMLLevel2 />} />
                  <Route path="/ai-ml/level-3" element={<AIMLLevel3 />} />
                  <Route path="/web-development-essentials" element={<WebDevelopmentEssentials />} />
                 <Route path= "/flutter-details" element={<FlutterDetails/>}/>
                 <Route path="/swift-details" element={<SwiftDetails/>}/>
                 <Route path="/java-android-details" element={<JavaAndroidDetails/>}/>
                 <Route path="/dart-server-details" element={<DartServerDetails/>}/>
                 <Route path="/python-flask-fastapi-details" element={<PythonFlaskFastAPIDetails/>}/>
                 <Route path="/java-kotlin-backend-details" element={<JavaKotlinBackendDetails/>}/>
                 <Route path="/digital-marketing-level-1" element={<DigitalMarketingLevel1/>}/>
                 <Route path="/digital-marketing-level-2" element={<DigitalMarketingLevel2/>}/>
                 <Route path="/digital-marketing-level-3" element={<DigitalMarketingLevel3/>}/>
                 <Route path="/sales-marketing-level-1" element={<SalesMarketingLevel1/>}/>
                 <Route path="/sales-marketing-level-2" element={<SalesMarketingLevel2/>}/>
                 <Route path="/sales-marketing-level-3" element={<SalesMarketingLevel3/>}/>
                 <Route path="/web-ui-design-level-1" element={<WebUIDesignLevel1/>}/>
                 <Route path="/web-ui-design-level-2" element={<WebUIDesignLevel2/>}/>
                 <Route path="/web-ui-design-level-3" element={<WebUIDesignLevel3/>}/>
                 <Route path="/graphic-video-design-level-1" element={<GraphicVideoDesignLevel1/>}/>
                 <Route path="/graphic-video-design-level-2" element={<GraphicVideoDesignLevel2/>}/>
                 <Route path="/graphic-video-design-level-3" element={<GraphicVideoDesignLevel3/>}/>
                 <Route path="/mechanical-cad-level-1" element={<MechanicalCADLevel1/>}/>
                 <Route path="/mechanical-cad-level-2" element={<MechanicalCADLevel2/>}/>
                 <Route path="/mechanical-cad-level-3" element={<MechanicalCADLevel3/>}/>
                 <Route path="/product-management-level-1" element={<ProductManagementLevel1/>}/>
                 <Route path="/product-management-level-2" element={<ProductManagementLevel2/>}/>
                 <Route path="/product-management-level-3" element={<ProductManagementLevel3/>}/>
                 <Route path="/fullstack-courses" element={<FullStackCourses />} />
                 <Route path="/marketing-courses" element={<MarketingCourses />} />
                 <Route path="/design-courses" element={<DesignCourses />} />
                 <Route path="/product-management-courses" element={<ProductManagementCourses />} />
                 <Route path="/data-science-courses" element={<DataScienceCourses />} />
                 

                  <Route path="/hr/signin" element={<SignIn />} />
                  <Route path="/hr" element={<HRLayout><Outlet /></HRLayout>}>
                    <Route index element={<HRDashboard />} />
                    <Route path="enquiry" element={<EnquiryDashboard />} />
                    <Route path="candidate/:candidateId" element={<CandidateDetail />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="posted-job" element={<JobDashboard />} />
                    <Route path="posted-job/:id" element={<JobView />} />
                    <Route path="applied-jobs" element={<ApplicationManagementDashboard />} />
                    <Route path="applied-jobs/engineering" element={<EngineeringApplications />} />
                    <Route path="applied-jobs/design" element={<DesignApplications />} />
                    <Route path="applied-jobs/marketing" element={<MarketingApplications />} />
                    <Route path="applied-jobs/sales" element={<SalesApplications />} />
                    <Route path="applied-jobs/hr" element={<HRApplications />} />
                    <Route path="applied-jobs/finance" element={<FinanceApplications />} />
                    <Route path="applied-jobs/operations" element={<OperationsApplications />} />
                    <Route path="applied-forms" element={<AppliedForms />} />
                    <Route path="applied-forms/:department" element={<DepartmentHiringProcess />} />
                    <Route path="applied-forms/:department/:step" element={<StepAppliedFormsList />} />
                    <Route path="applied-courses" element={<AppliedCourses />} />
                    <Route path="applied-courses/:courseName" element={<CourseLevels />} />
                    <Route path="applied-courses/:courseName/level-1" element={<CourseApplications />} />
                    <Route path="applied-courses/:courseName/level-2" element={<CourseApplications />} />
                    <Route path="applied-courses/:courseName/level-3" element={<CourseApplications />} />
                    <Route path="applied-courses/:courseName/:categoryName" element={<DesignCategoryLevels />} />
                    <Route path="applied-courses/:courseName/:moduleName" element={<ModuleCategories />} />
                    <Route path="applied-courses/:courseName/:moduleName/:category" element={<CourseApplications />} />
                    <Route path="applied-courses/:courseName/:categoryName/:level" element={<CourseApplications />} />
                  </Route>
                  <Route path="/apply-job" element={<ApplyJobPage />} />
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