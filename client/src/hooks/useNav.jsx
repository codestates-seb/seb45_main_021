import { useNavigate } from 'react-router-dom';

export default function useNav() {
  const navigate = useNavigate();

  const toAbout = () => navigate('/seb45_main_021');
  const toSignin = () => navigate('/seb45_main_021/signin');
  const toSignup = () => navigate('/seb45_main_021/signup');
  const toProject = () => navigate('/seb45_main_021/project');
  const toPortfolio = () => navigate('/seb45_main_021/portfolio');
  const toProjectWrite = () => navigate('/seb45_main_021/project/write');
  const toPortfolioWrite = () => navigate('/seb45_main_021/portfolio/write');

  return { toAbout, toSignin, toSignup, toPortfolio, toProject, toProjectWrite, toPortfolioWrite };
}
