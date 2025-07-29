import { NavigateFunction } from 'react-router-dom';

export const handleEnrollmentClick = (
  isLoggedIn: boolean,
  navigate: NavigateFunction,
  setShowEnrollmentModal: (show: boolean) => void,
  setRedirectPath: (path: string) => void
) => {
  if (!isLoggedIn) {
    // Store the current path before redirecting to login
    setRedirectPath(window.location.pathname);
    navigate('/signin');
    return;
  }
  
  setShowEnrollmentModal(true);
}; 