import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Spin,
  Table,
  Typography,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import { SERVER_URL } from '../../settings';
import { ADD_CONFIRM, CHANGE_VALUE, CLEAR_CART, REMOVE } from '../../reducer';
import { createOrder, getProducts } from '../../API/requests';

const AppCart = ({ handleCloseDrawer }) => {
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));

    const cartIDString = `ids=${products.map((item) => item.id).join(',')}`;

    if (products.length === 0) {
      return setShoppingCartItems(null);
    }

    setIsLoading(true);
    getProducts(cartIDString)
      .then((res) => {
        const cartProducts = products.map((item) => {
          const findItem = res.items.find((el) => el.id === item.id);
          if (findItem) {
            return {
              id: item.id,
              quantity: item.quantity,
              name: findItem.name,
              image: findItem.imageUrl,
              price: findItem.price,
              itemTotalPrice: parseFloat(
                (findItem.price * item.quantity).toFixed(2)
              ),
              amount: findItem.amount,
            };
          }
          return item;
        });
        setShoppingCartItems(cartProducts);
      })
      .catch((e) => {
        message.error(e.name);
        message.info('Please contact to our support', 3);
        console.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [products]);

  const totalPrice = useMemo(() => {
    return shoppingCartItems
      ? +parseFloat(
          shoppingCartItems.reduce(
            (acc, cartProduct) => acc + cartProduct.itemTotalPrice,
            0
          )
        ).toFixed(2)
      : 0;
  }, [shoppingCartItems]);

  const onConfirmOrder = (values) => {
    createOrder(values, products, totalPrice)
      .then((res) => {
        if (res.error) {
          return Promise.reject(res);
        }
        setCheckoutDrawerOpen(false);
        dispatch({ type: CLEAR_CART });
        dispatch({ type: ADD_CONFIRM, payload: res });
        handleCloseDrawer();
        navigate('/success');
      })
      .catch((e) => {
        message.error(e.error);
        console.error(e.message);
        message.info('Please contact to our support', 3);
      });
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Spin spinning />
        <p style={{ fontFamily: 'Titillium Web', fontSize: 20 }}>Loading</p>
      </div>
    );
  }

  return (
    <>
      <Table
        locale={{
          emptyText: (
            <span>
              <img
                style={{ marginTop: 25, width: '40%' }}
                src={process.env.PUBLIC_URL + '/image/empty_beer_cart.png'}
                alt='empty shopping cart'
              />
              <Typography.Paragraph style={{ marginTop: 25, fontSize: 14 }}>
                You don't add any beer =(
              </Typography.Paragraph>
            </span>
          ),
        }}
        columns={[
          {
            title: '',
            dataIndex: 'remove',
            render: (_, record) => {
              return (
                <DeleteOutlined
                  onClick={() => dispatch({ type: REMOVE, payload: record })}
                />
              );
            },
          },
          {
            title: 'Title',
            dataIndex: 'name',
          },
          {
            title: '',
            dataIndex: 'imageUrl',
            align: 'center',
            render: (_, record) => {
              return (
                <Image
                  style={{ height: 70 }}
                  fallback={process.env.PUBLIC_URL + '/image/beer_undefind.png'}
                  src={`${SERVER_URL + record.image}`}
                />
              );
            },
          },
          {
            title: 'Price',
            dataIndex: 'price',
            render: (value) => {
              return <span>${value}</span>;
            },
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (value, record) => {
              return (
                <>
                  <InputNumber
                    min={0}
                    max={record.amount}
                    defaultValue={value}
                    value={value}
                    onChange={(value) => {
                      if (value === 0) {
                        dispatch({ type: REMOVE, payload: record });
                      }
                      dispatch({
                        type: CHANGE_VALUE,
                        payload: { value, record },
                      });
                    }}
                  ></InputNumber>
                  <div
                    style={
                      record.amount - value > 0
                        ? {
                            fontFamily: 'Titillium Web',
                            fontSize: 12,
                            color: 'grey',
                          }
                        : {
                            fontFamily: 'Titillium Web',
                            fontSize: 12,
                            color: 'red',
                          }
                    }
                  >
                    Left in stock: {record.amount - value}
                  </div>
                </>
              );
            },
          },
          {
            title: 'Total',
            dataIndex: 'itemTotalPrice',
            render: (value) => {
              return <span>${value}</span>;
            },
          },
        ]}
        size={'small'}
        rowKey={(record) => record.id}
        pagination={{ hideOnSinglePage: true, pageSize: 5 }}
        dataSource={shoppingCartItems}
      />
      <Typography.Paragraph
        style={{ fontWeight: 'bold', fontSize: 17, marginTop: 15 }}
      >
        Total price: ${parseFloat(totalPrice).toFixed(2)}
      </Typography.Paragraph>
      <div className={styles.flexCenter}>
        <Popconfirm
          title='Remove all items from cart'
          okText='Yes'
          cancelText='No'
          onConfirm={() => dispatch({ type: CLEAR_CART })}
        >
          <Button
            disabled={!Boolean(shoppingCartItems)}
            className={styles.button}
          >
            Remove all items
          </Button>
        </Popconfirm>
        <Button
          disabled={!Boolean(shoppingCartItems)}
          className={styles.button}
          onClick={() => setCheckoutDrawerOpen(true)}
        >
          Checkout your cart
        </Button>
      </div>

      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => setCheckoutDrawerOpen(false)}
        title='Confirm order'
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your first name',
              },
            ]}
            label='First Name'
            name='firstName'
          >
            <Input placeholder='Enter your first name' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your last name',
              },
            ]}
            label='Last Name'
            name='lastName'
          >
            <Input placeholder='Enter your last name' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: 'string',
                pattern: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
                message: 'Please enter your valid phone number',
              },
            ]}
            label='Phone'
            name='phone'
          >
            <Input
              addonBefore={'+38'}
              style={{ width: '100%' }}
              placeholder='Enter your phone'
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                min: 5,
                message: 'Please enter your valid shipping address',
              },
              {
                required: true,
                message: 'Please enter your shipping address',
              },
            ]}
            label='Address'
            name='shippingAddress'
          >
            <Input placeholder='Enter your address' />
          </Form.Item>
          <Button
            className={styles.button}
            disabled={!Boolean(shoppingCartItems)}
            htmlType='submit'
          >
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AppCart;
