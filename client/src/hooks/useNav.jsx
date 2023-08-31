import { useNavigate } from 'react-router-dom';

/**
 * @description
 * import useNav from '~~'
 * const { toAbout } = useNav();
 * @returns {function} toAbout - navigate('/');
 * @returns {function} toSignin - navigate('/signin');
 * @returns {function} toSignup - navigate('/signup');
 * @returns {function} toProject - navigate('/project');
 * @returns {function} toProjectWrite - navigate('/project/write');
 * @returns {function} toPortfolio - navigate('/portfolio');
 * @returns {function} toPortfolioWrite - navigate('/portfolio/write');
 */
export default function useNav() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toAbout = () => {
    navigate('/');
    scrollToTop();
  };
  const toSignin = () => {
    navigate('/signin');
    scrollToTop();
  };
  const toSignup = () => {
    navigate('/signup');
    scrollToTop();
  };
  const toProject = () => {
    navigate('/project');
    scrollToTop();
  };
  const toPortfolio = () => {
    navigate('/portfolio');
    scrollToTop();
  };
  const toProjectWrite = () => {
    navigate('/project/write');
    scrollToTop();
  };
  const toPortfolioWrite = () => {
    navigate('/portfolio/write');
    scrollToTop();
  };

  return { toAbout, toSignin, toSignup, toPortfolio, toProject, toProjectWrite, toPortfolioWrite };
}
