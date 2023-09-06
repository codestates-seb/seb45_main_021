import { useNavigate } from 'react-router-dom';

/**
 * @description
 * import useNav from '~~'
 * const { toAbout } = useNav();
 * @returns {function} toAbout - navigate('/');
 * @returns {function} toSignin - navigate('/signin');
 * @returns {function} toSignup - navigate('/signup');
 * @returns {function} toProfile - navigate(`/profile/${id});
 * @returns {function} toProject - navigate('/project');
 * @returns {function} toProjectWrite - navigate('/project/write');
 * @returns {function} toProjectDetail - navigate(`/project/detail/${id}`);
 * @returns {function} toPortfolio - navigate('/portfolio');
 * @returns {function} toPortfolioWrite - navigate('/portfolio/write');
 * @returns {function} toPortfolioDetail - navigate(`/portfolio/detail/${id}`);
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
  const toProjectDetail = (id) => navigate(`/project/detail/${id}`);
  const toPortfolioDetail = (id) => navigate(`/project/detail/${id}`);
  const toProfile = (id) => navigate(`/profile/${id}`);
  const toSearch = (text, type) => navigate(`/search?type=${type}&keyword=${text}`);

  return {
    toAbout,
    toSignin,
    toSignup,
    toPortfolio,
    toProject,
    toProjectWrite,
    toPortfolioWrite,
    toProjectDetail,
    toPortfolioDetail,
    toProfile,
    toSearch,
  };
}
