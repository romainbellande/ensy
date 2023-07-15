import { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
const Layout = lazy(() => import('../components/Layout'));

export function App() {
  return (
    <Routes>
    <Route
      path="/*"
      element={
          <Layout />
      }
    />
  </Routes>
  );
}

export default App;
