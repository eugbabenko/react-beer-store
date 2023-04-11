import { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Badge, Drawer } from 'antd';

import styles from './styles.module.css';
import CartContent from '../CartContent';

const CartButton = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const products = useSelector((state) => state.cart);

  const handleCloseDrawer = () => {
    setCartDrawerOpen(false);
  };

  return (
    <>
      <Badge
        onClick={() => setCartDrawerOpen(true)}
        count={products.length}
        className={styles.shoppingCart}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        onClose={() => setCartDrawerOpen(false)}
        open={cartDrawerOpen}
        title='Your Cart'
        contentWrapperStyle={{ width: 800 }}
        destroyOnClose={true}
      >
        <CartContent handleCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </>
  );
};

export default CartButton;
