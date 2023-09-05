import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ProjectWrite from './pages/ProjectWrite';
import ProjectDetail from './pages/ProjectDetail';
import ProjectEdit from './pages/ProjectEdit';
import PortfolioEdit from './pages/PortfolioEdit';
import PortfolioDetail from './pages/PortfolioDetail';
import PortfolioWrite from './pages/PortfolioWrite';
import NotFound from './pages/NotFound';
import Header from './components/header/Header';
import Search from './pages/Search';
import BackGround from './components/common/BackGround';
import { useAxiosInterceptor } from './hooks/useAxiosInterceptor';
import Footer from './components/footer/Footer';
import PostList from './pages/PostList';
import { styled } from 'styled-components';

const StyleApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  useAxiosInterceptor();
  return (
    <StyleApp>
      <BackGround />
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/project" element={<PostList />} />
        <Route path="/project/write" element={<ProjectWrite />} />
        <Route path="/project/detail/:projectId" element={<ProjectDetail />} />
        <Route path="/project/edit/:projectId" element={<ProjectEdit />} />
        <Route path="/portfolio" element={<PostList />} />
        <Route path="/portfolio/write" element={<PortfolioWrite />} />
        <Route path="/portfolio/detail/:portfolioId" element={<PortfolioDetail />} />
        <Route path="/portfolio/edit/:portfolioId" element={<PortfolioEdit />} />
        <Route path="/search/project/:keyword" element={<Search />} />
        <Route path="/search/portfolio/:keyword" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </StyleApp>
  );
}

export default App;
