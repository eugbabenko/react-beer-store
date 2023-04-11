import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { message, Button, InputNumber } from 'antd';

import styles from './styles.module.css';

import { CHANGE_VALUE, REMOVE, ADD_TO_CART } from '../../reducer';

const AddToCartButton = ({ record, page }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const product = products.find((el) => el.id === record.id);
  const addProductToCart = () => {
    dispatch({ type: ADD_TO_CART, payload: record });
    message.success(`${record.name} has been added to cart`);
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  if (record.amount === 0) {
    return (
      <img
        style={{ width: 33 }}
        src={process.env.PUBLIC_URL + '/image/out-of-stock.png'}
        alt='out of stock'
      />
    );
  } else if (product?.quantity >= 1) {
    return (
      <InputNumber
        style={
          page
            ? { width: 180, height: 50, borderColor: 'black', fontSize: 20 }
            : { width: 80, borderColor: 'black' }
        }
        min={0}
        max={record.amount}
        defaultValue={product.quantity}
        value={product.quantity}
        onChange={(value) => {
          if (value === 0) {
            dispatch({ type: REMOVE, payload: record });
          }

          if (value === record.amount) {
            message.warning('Selected the maximum number of product in stock');
          }

          dispatch({
            type: CHANGE_VALUE,
            payload: { value, record },
          });
        }}
      ></InputNumber>
    );
  } else if (page) {
    return (
      <Button onClick={() => addProductToCart()} className={styles.button}>
        Buy
      </Button>
    );
  }

  return (
    <Button
      style={{ padding: 0 }}
      type='link'
      onClick={() => addProductToCart()}
    >
      <ShoppingCartOutlined className={styles.shoppingCartItem} />
    </Button>
  );
};

export default AddToCartButton;
