import { Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Project from './pages/Project';
import ProjectWrite from './pages/ProjectWrite';
import ProjectDetail from './pages/ProjectDetail';
import ProjectEdit from './pages/ProjectEdit';
import PortfolioEdit from './pages/PortfolioEdit';
import PortfolioDetail from './pages/PortfolioDetail';
import PortfolioWrite from './pages/PortfolioWrite';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';
import Header from './components/header/Header/Header';
import styles from './App.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function App() {
  return (
    <div className={cx('App')}>
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/write" element={<ProjectWrite />} />
        <Route path="/project/detail/:projectId" element={<ProjectDetail />} />
        <Route path="/project/edit/:projectId" element={<ProjectEdit />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/write" element={<PortfolioWrite />} />
        <Route path="/portfolio/detail/:portfolioId" element={<PortfolioDetail />} />
        <Route path="/portfolio/edit/:portfolioId" element={<PortfolioEdit />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
