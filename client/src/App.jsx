import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/header/Header';
import { useEffect } from 'react';
import { useAxiosInterceptor } from './hooks/useAxiosInterceptor';
import Footer from './components/footer/Footer';
import { styled } from 'styled-components';
import ProtectedRoute from './pages/ProtectedRoute';
import Spinner from './components/common/Spinner';

const About = lazy(() => import('./pages/About'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectWrite = lazy(() => import('./pages/ProjectWrite'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ProjectEdit = lazy(() => import('./pages/ProjectEdit'));
const Portfolios = lazy(() => import('./pages/Portfolios'));
const PortfolioWrite = lazy(() => import('./pages/PortfolioWrite'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const PortfolioEdit = lazy(() => import('./pages/PortfolioEdit'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Search = lazy(() => import('./pages/Search'));

const StyleApp = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const path = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const handlePopstate = () => {};

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useAxiosInterceptor();
  return (
    <StyleApp>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route
            path="/signin"
            element={
              <ProtectedRoute requireUnlogin>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireUnlogin>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:memberId" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/project/write"
            element={
              <ProtectedRoute requireLogin>
                <ProjectWrite />
              </ProtectedRoute>
            }
          />
          <Route path="/project/detail/:projectId" element={<ProjectDetail />} />
          <Route path="/project/edit/:projectId" element={<ProjectEdit />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route
            path="/portfolio/write"
            element={
              <ProtectedRoute requireLogin>
                <PortfolioWrite />
              </ProtectedRoute>
            }
          />
          <Route path="/portfolio/detail/:portfolioId" element={<PortfolioDetail />} />
          <Route path="/portfolio/edit/:portfolioId" element={<PortfolioEdit />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </StyleApp>
  );
}

export default App;
