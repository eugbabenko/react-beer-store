import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input, Menu } from 'antd';
import { ShopOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import CartButton from '../CartButton';

const AppHeader = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`${item.key}`);
  };

  return (
    <div className={`${styles.AppHeader} ${styles.container}`}>
      <Link to='/'>
        <img
          className={styles.logo}
          src={process.env.PUBLIC_URL + '/image/logo.png'}
          alt='Logo'
        />
      </Link>
      <Menu
        onClick={onMenuClick}
        mode='horizontal'
        items={[
          {
            label: <ShopOutlined style={{ fontSize: 20 }} />,
            key: '',
          },
        ]}
      />
      <Input.Search
        className={styles.input}
        value={inputValue}
        onSearch={(value) => {
          setSearchParams({ name: value });
        }}
        onChange={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
          navigate('/beers');
        }}
        placeholder='Find beer by name'
      />
      <CartButton />
    </div>
  );
};

export default AppHeader;
