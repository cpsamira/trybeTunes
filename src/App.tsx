import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import NotFound from './pages/notFound';
import Album from './pages/album';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
