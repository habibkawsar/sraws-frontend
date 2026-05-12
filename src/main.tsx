import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RequestListPage } from './pages/RequestListPage';
import { CreateRequestPage } from './pages/CreateRequestPage';
import { RequestDetailPage } from './pages/RequestDetailPage';
import { AdminSponsorshipTypesPage } from './pages/AdminSponsorshipTypesPage';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="requests" element={<RequestListPage />} />
              <Route path="requests/:id" element={<RequestDetailPage />} />
              <Route element={<ProtectedRoute roles={['Requestor']} />}>
                <Route path="requests/new" element={<CreateRequestPage />} />
              </Route>
              <Route element={<ProtectedRoute roles={['SystemAdmin']} />}>
                <Route path="admin/types" element={<AdminSponsorshipTypesPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
