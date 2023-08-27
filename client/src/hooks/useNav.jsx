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

  return { toAbout, toSignin, toSignup, toPortfolio, toProject, toProjectWrite, toPortfolioWrite };
}
