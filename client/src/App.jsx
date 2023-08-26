import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
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
import Header from './components/header/Header';
import { styled } from 'styled-components';
import Inner from './components/common/Inner';

const StyleApp = styled.div``;

function App() {
  return (
    <StyleApp>
      <Header />
      <Inner>
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
      </Inner>
    </StyleApp>
  );
}

export default App;
