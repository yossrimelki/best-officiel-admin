import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Reclamation from './pages/reclamations';
import DefaultLayout from './layout/DefaultLayout';
import TableOne from './components/Tables/TableOne';
import WatchForm from './pages/Form/WatchForm';
import WatchTable from './components/Tables/WatchTable';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {' '}
      {pathname === '/' ?(
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="login" />
                <SignIn />
              </>
            }
          />
          {/* <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Best Officiel" />
                <SignUp />
              </>
            }
          /> */}
        </Routes>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <ECommerce />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/products/add-product"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/categories/add-category"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/orders"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/reclamation"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <Reclamation />
                </>
              }
            />
             <Route
              path="/shoes"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <TableOne />
                </>
              }
            />
            <Route
              path="/shoes/add"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/watchs"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <WatchTable />
                </>
              }
            />
               <Route
              path="/watchs/add"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <WatchForm />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <Settings />
                </>
              }
            />
            {/* <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        /> */}
            {/* <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        /> */}
            {/* <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        /> */}
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
