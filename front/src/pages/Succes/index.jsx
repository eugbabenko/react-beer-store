import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Result, Button, Table, Typography } from 'antd';

import styles from './styles.module.css';

const SuccessPage = () => {
  const order = useSelector((state) => state.confirmationInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(order).length === 0) return navigate('/');
  });

  const orderInfo = (order) => {
    return (
      <div className={styles.successPage}>
        <Typography.Paragraph>Order number: {order.id}</Typography.Paragraph>
        <Table
          dataSource={[order]}
          rowKey={() => Math.floor(Math.random() * 1000)}
          pagination={{ hideOnSinglePage: true }}
          align='center'
          columns={[
            {
              title: 'Name',
              dataIndex: 'firstName',
            },
            {
              title: 'Last Name',
              dataIndex: 'lastName',
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
            },
            {
              title: 'Total Price',
              dataIndex: 'finalPrice',
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: 'Adress',
              dataIndex: 'shippingAddress',
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div>
      <Result
        status='success'
        title='Successfully Purchased some tasty beer!'
        subTitle={orderInfo(order)}
        extra={[
          <Button
            onClick={() => navigate('/')}
            key='home'
            style={{ borderColor: 'black' }}
          >
            Go to Home Page
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccessPage;
