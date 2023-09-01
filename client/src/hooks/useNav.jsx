import { useNavigate } from 'react-router-dom';

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
  const toProfileDetail = (id) => navigate(`/project/detail/${id}`);
  const toSearch = (text, type) => {
    if (type === 'project') {
      navigate(`/search/project/${text}`);
    } else if (type === 'portfolio') {
      navigate(`/search/portfolio/${text}`);
    }
  };

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
    toProfileDetail,
    toSearch,
  };
}
