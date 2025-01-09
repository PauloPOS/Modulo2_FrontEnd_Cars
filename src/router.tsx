import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/PageLogin';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const UsersList = Loader(lazy(() => import('src/content/management/CarrosList')));
const CarroForm = Loader(lazy(() => import('src/content/management/CarrosForm')));
const CarroFormValidacao = Loader(lazy(() => import('src/content/management/CarroFormValidacao')));
const CarroFormEditValidacao = Loader(lazy(() => import('src/content/management/CarroFormEditValidacao')));

const routes: RouteObject[] = [
  {
    path: '/login', // Página de login pública
    element: <LoginPage />,
  },
  {
    path: '/', // Rota protegida para a raiz
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/', // Redireciona para "/management/Carro-list"
        element: <Navigate to="/management/carro-list" replace />,
      },
    ],
  },
  {
    path: 'management', // Rotas de gerenciamento protegidas
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '', // Redirecionamento padrão
        element: <Navigate to="carro-list" replace />,
      },
      {
        path: 'carro-list', // Lista de usuários
        element: <UsersList />,
      },
      {
        path: 'new-carro', // Formulário de novo carro
        element: <CarroForm />,
      },
      {
        path: 'new-carro-validacao', // Formulário com validação de novo carro
        element: <CarroFormValidacao />,
      },
      {
        path: 'edit-carro/:id', // Edição de carro por ID
        element: <CarroFormEditValidacao />,
      },
    ],
  },
];

export default routes;
