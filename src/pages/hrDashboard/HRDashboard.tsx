import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Briefcase,
  FileText,
  ChevronRight,
  ClipboardList,
  BookOpen,
  Settings,
} from "lucide-react";

const HRDashboard = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "See Enquiry",
      path: "/hr/enquiry",
      icon: <Users size={20} />,
      description: "View all candidate enquiries and applications",
    },
    {
      name: "Post Job",
      path: "/hr/post-job",
      icon: <Briefcase size={20} />,
      description: "Create and publish new job opportunities",
    },
    {
      name: "See posted Jobs",
      path: "/hr/posted-job",
      icon: <FileText size={20} />,
      description: "Review applications for posted positions",
    },
    {
      name: "View Applied Forms",
      path: "/hr/applied-forms",
      icon: <ClipboardList size={20} />,
      description: "See all forms submitted by candidates",
    },
    {
      name: "View Applied Courses",
      path: "/hr/applied-courses",
      icon: <BookOpen size={20} />,
      description: "View all users applied in a specific Course",
    },
    {
      name: "Course Management",
      path: "/hr/course-management",
      icon: <Settings size={20} />,
      description: "Create and manage course content and structure",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* HR Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              HR Management <span className="text-blue-300">Dashboard</span>
            </h2>
            {/* <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Streamline your recruitment process with our comprehensive HR tools. 
              Manage candidate enquiries, post job opportunities, and track applications all in one place.
            </p> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4 md:gap-6 mt-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 group min-h-[200px] flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center mt-3 md:mt-4 text-blue-300 group-hover:text-white transition-colors">
                    <span className="text-xs md:text-sm font-medium">Get Started</span>
                    <ChevronRight size={14} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">150+</div>
              <div className="text-gray-600 dark:text-gray-300">Total Enquiries</div>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25</div>
              <div className="text-gray-600 dark:text-gray-300">Active Jobs</div>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">89</div>
              <div className="text-gray-600 dark:text-gray-300">Applications</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRDashboard; 