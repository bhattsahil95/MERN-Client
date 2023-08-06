// routesConfig.js
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NoteReactPage from './pages/NoteReactPage';
import NotFoundPage from './pages/NotFoundPage';
import ApiPage from './pages/ApiPage';
import ServerApi from './pages/ServerApi';
import MernNotes from './pages/NoteReactPageFULL';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/contact',
    component: ContactPage,
  },
  {
    path: '/notes',
    component: NoteReactPage,
  },
  {
    path: '/api',
    component: ApiPage,
  },
  {
    path: '/apiServer',
    component: ServerApi,
  },
  {
    path: '/mern-notes',
    component: MernNotes,
  },
  {
    path: '/test/page',
    component: HomePage,
  },
  {
    path: '*',
    component: NotFoundPage,
  }
];

export default routes;
