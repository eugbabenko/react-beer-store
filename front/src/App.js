import { legacy_createStore as createStore } from 'redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FloatButton } from 'antd';

import styles from './App.module.css';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import ErrorPage from './pages/Error';
import Products from './pages/Products';
import ProductItemPage from './pages/ProductItem';
import SuccessPage from './pages/Succes';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  return (
    <div className={styles.App}>
      <Provider store={store}>
        <BrowserRouter>
          <div className={styles.content}>
          <AppHeader />
            <Routes>
              <Route path="/" element={<Navigate to="/beers" />} />
              <Route path="/beers" element={<Products />} />
              <Route path="beers/:id" element={<ProductItemPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <FloatButton.BackTop />
          </div>
          <AppFooter />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
