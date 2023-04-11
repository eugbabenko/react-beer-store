import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Card,
  Image,
  List,
  Typography,
  Spin,
  Button,
  Pagination,
  Select,
  message,
} from 'antd';
import { RightOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import { SERVER_URL } from '../../settings';
import { getProducts } from '../../API/requests';

import AddToCartButton from '../../components/AddToCartButton';
import ProgressBarBeer from '../../components/ProgressBarBeer';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState(null);
  const limit = 50;

  useEffect(() => {
    setIsLoading(true);
    getProducts(searchParams)
      .then((res) => {
        setProducts(res.items);
        setTotal(res.total);
        setIsLoading(false);
        setPageNumber(
          searchParams.get('offset')
            ? searchParams.get('offset') / limit + 1
            : 1
        );
      })
      .catch((e) => {
        setIsLoading(false);
        message.error(e.name);
        message.info('Please contact to our support', 3);
        console.error(e.message);
      });
  }, [searchParams, limit]);

  const addFilterToURL = (category, sort, order, page, limitPage) => {
    const existSearchParams = Object.fromEntries([...searchParams]);
    setSearchParams(
      JSON.parse(
        JSON.stringify({
          name: existSearchParams.name || undefined,
          containerType: category ?? undefined,
          orderBy: sort ?? undefined,
          order: order ?? undefined,
          offset: page ?? undefined,
          limit: limitPage ?? undefined,
        })
      )
    );
  };

  const outOfStockItem = (amount) => {
    if (!amount) {
      return (
        <span style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>
          Out of stock
        </span>
      );
    }
    return <span></span>;
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
    <div className={`${styles.products} ${styles.container}`}>
      <div>
        <div className={styles.filterFlex}>
          <div>
            <Typography.Text>View item by category:</Typography.Text>
            <Select
              className={styles.select}
              placeholder='Select a beer category'
              defaultValue={searchParams.get('containerType')}
              onChange={(value) => {
                setCategory(value);
              }}
              defaultActiveFirstOption={false}
              allowClear={true}
              options={[
                {
                  label: 'Bottle',
                  value: 'BOTTLE',
                },
                {
                  label: 'Keg',
                  value: 'KEG',
                },
              ]}
            />
          </div>
          <div>
            <Typography.Text>Order by:</Typography.Text>
            <Select
              className={styles.select}
              placeholder='Select a type order'
              defaultValue={
                `${searchParams.get('orderBy')} ${searchParams.get(
                  'order'
                )}` === 'null null'
                  ? null
                  : `${searchParams.get('orderBy')} ${searchParams.get(
                      'order'
                    )}`
              }
              onChange={(value) => {
                setOrderBy(value?.split(' ')[0]);
                setOrder(value?.split(' ')[1]);
              }}
              defaultActiveFirstOption={false}
              allowClear={true}
              options={[
                {
                  label: 'price: low to high',
                  value: 'price ASC',
                },
                {
                  label: 'price: high to low',
                  value: 'price DESC',
                },
                {
                  label: 'brewed date: low to high',
                  value: 'brewedAt ASC',
                },
                {
                  label: 'brewed date: high to low',
                  value: 'brewedAt DESC',
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.filterFlex}>
          <Button
            className={styles.button}
            onClick={() => addFilterToURL(category, orderBy, order)}
          >
            Apply filter
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              setSearchParams('');
              setName(null);
              setCategory(null);
              setOrderBy(null);
              setOrder(null);
            }}
          >
            Clear filter
          </Button>
        </div>
      </div>
      <List
        locale={{
          emptyText: (
            <span>
              <img
                style={{ width: '20%' }}
                src={process.env.PUBLIC_URL + '/image/empty_beer_cart.png'}
                alt='Error download content'
              />
              <Typography.Paragraph style={{ marginTop: 25, fontSize: 20 }}>
                No beer
              </Typography.Paragraph>
            </span>
          ),
        }}
        grid={{ column: 4 }}
        renderItem={(product, index) => {
          return (
            <Card
              className={styles.itemCard}
              extra={outOfStockItem(product.amount)}
              title={product.name}
              key={index}
              cover={
                <Image
                  src={`${SERVER_URL + product.imageUrl}`}
                  fallback={process.env.PUBLIC_URL + '/image/beer_undefind.png'}
                  className={styles.itemCardImage}
                />
              }
              actions={[
                <>
                  <ProgressBarBeer
                    score={product.ebc}
                    measurment={'EBC'}
                    value={100}
                  />
                  <Typography.Paragraph key={product.ebc}>
                    color units
                  </Typography.Paragraph>
                </>,
                <>
                  <ProgressBarBeer
                    score={product.ibu}
                    measurment={'IBU'}
                    value={100}
                  />
                  <Typography.Paragraph key={product.ibu}>
                    bitterness
                  </Typography.Paragraph>
                </>,
                <>
                  <ProgressBarBeer
                    score={product.abv}
                    measurment={'°'}
                    value={12}
                  />
                  <Typography.Paragraph key={product.abv}>
                    strength
                  </Typography.Paragraph>
                </>,
              ]}
            >
              <Card.Meta
                title={
                  <>
                    <Typography.Paragraph
                      style={{
                        fontFamily: 'Titillium Web',
                        fontSize: 20,
                        marginBottom: 5,
                      }}
                    >
                      {product.price} {product.currency}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      style={{
                        fontFamily: 'Titillium Web',
                        fontSize: 10,
                        color: 'grey',
                      }}
                    >
                      for one {product.containerType}
                    </Typography.Paragraph>
                  </>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 1, expandable: true, symbol: ' ' }}
                  >
                    {product.tagline}
                  </Typography.Paragraph>
                }
              />
              <div className={styles.shoppingCart}>
                <Link to={`/beers/${product.id}`}>
                  <Button className={styles.buttonCard}>
                    Open beer <RightOutlined />
                  </Button>
                </Link>
                <AddToCartButton record={product} />
              </div>
            </Card>
          );
        }}
        dataSource={products}
      />
      <Pagination
        className={styles.pagination}
        onChange={(page) => {
          setPageNumber(page);
          addFilterToURL(category, orderBy, order, page * limit - limit);
        }}
        hideOnSinglePage={true}
        showSizeChanger={false}
        current={pageNumber}
        pageSize={limit}
        defaultPageSize={limit}
        total={total}
      />
    </div>
  );
};

export default ProductsPage;
