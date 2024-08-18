import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
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
import UpdateWatchForm from './pages/Form/UpdateWatchForm';
import WatchTable from './components/Tables/WatchTable';
import AddCategoryForm from './pages/Form/AddCategoryForm';
import AddSubCategoryForm from './pages/Form/AddSubCategoryForm';
import CategorySubcategory from './pages/CategorySubcategory';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

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
      {pathname === '/' ? (
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
                  <AddCategoryForm />
                </>
              }
            />
            <Route
              path="/subcategories/add-subcategory"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <AddSubCategoryForm />
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
  path="/watchs/edit/:watchId"
  element={
    <>
      <PageTitle title="Edit Watch" />
      <UpdateWatchForm />
    </>
  }
/>
           
 
           
            <Route
              path="/categories"
              element={
                <>
                  <PageTitle title="Best Officiel" />
                  <CategorySubcategory />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
