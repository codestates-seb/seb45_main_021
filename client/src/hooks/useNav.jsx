import { useNavigate } from 'react-router-dom';

/**
 * @description
 * import useNav from '~~'
 * const { toAbout } = useNav();
 * 객체 구조 분해할당으로 사용하길 추천함.
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
  const toAbout = () => navigate('/');
  const toSignin = () => navigate('/signin');
  const toSignup = () => navigate('/signup');
  const toProject = () => navigate('/project');
  const toPortfolio = () => navigate('/portfolio');
  const toProjectWrite = () => navigate('/project/write');
  const toPortfolioWrite = () => navigate('/portfolio/write');

  return { toAbout, toSignin, toSignup, toPortfolio, toProject, toProjectWrite, toPortfolioWrite };
}
