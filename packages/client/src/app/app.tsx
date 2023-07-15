import { Route, Routes } from 'react-router-dom';
import { Layout } from '@client/components';

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
