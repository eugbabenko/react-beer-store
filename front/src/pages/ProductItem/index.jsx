import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Descriptions, Typography, message } from 'antd';

import styles from './styles.module.css';

import ProgressBarBeer from '../../components/ProgressBarBeer';
import AddToCartButton from '../../components/AddToCartButton';
import { SERVER_URL } from '../../settings';
import { getProductById } from '../../API/requests';

const ProductItemPage = () => {
  const params = useParams();
  const [product, setProduct] = useState('');

  useEffect(() => {
    getProductById(params.id)
      .then((res) => {
        setProduct(res);
      })
      .catch((e) => {
        message.error(e.name);
        message.info('Please contact to our support', 3);
        console.error(e.message);
      });
  }, [params]);

  const getBrewingTimeMethods = (product) => {
    const listItems = product.method?.mashTemp.map((item, index) => {
      return (
        <li key={item.temp.value + item.duration}>
          {item.temp.value} {item.temp.unit} for {item.duration || 'several'}{' '}
          minutes{' '}
        </li>
      );
    });
    return (
      <ul className={listItems?.length < 2 ? styles.oneliInList : ''}>
        {listItems}
      </ul>
    );
  };

  const getBeerIngredients = (ingredients) => {
    const listItems = ingredients?.map((item) => {
      if (item.add) {
        return (
          <li key={item.name + item.amount.value + item.add}>
            {item.name}
            {' - '}
            {item.amount.value} {item.amount.unit}
            {' added at the '}
            {item.add}
            {' of the process. Tastes '}
            {item.attribute}
          </li>
        );
      } else {
        return (
          <li key={item.name + item.amount.value}>
            {item.name}
            {' - '}
            {item.amount.value} {item.amount.unit}
          </li>
        );
      }
    });
    return (
      <ul className={listItems?.length < 2 ? styles.oneliInList : ''}>
        {listItems}
      </ul>
    );
  };

  const getFoodPairingList = (foodItem) => {
    const listItems = foodItem?.map((item) => <li key={item}>{item}</li>);
    return (
      <ul className={listItems?.length < 2 ? styles.oneliInList : ''}>
        {listItems}
      </ul>
    );
  };

  return (
    <>
      <div className={styles.productItemPage}>
        <div className={styles.productImageContainer}>
          <Image
            src={`${SERVER_URL + product.imageUrl}`}
            fallback={process.env.PUBLIC_URL + '/image/beer_undefind.png'}
            className={styles.center}
          />
        </div>
        <div className={styles.productImageDescription}>
          <Typography.Title
            style={{ fontFamily: 'Titillium Web', fontSize: 40 }}
          >
            {product.name}
          </Typography.Title>
          <Typography.Text style={{ fontSize: 20 }}>
            {product.tagline}
          </Typography.Text>
          <p>First brewed: {product.firstBrewed}</p>
          <div className={styles.priceAndBuy}>
            <div>
              <Typography.Text className={styles.price}>
                {product.price} {product.currency}
              </Typography.Text>
              <Typography.Text style={{ color: 'gray' }}>
                for one {product.containerType}
              </Typography.Text>
            </div>
            <AddToCartButton page={product.id} record={product} />
          </div>
          <Typography.Paragraph style={{ marginTop: 10 }}>
            Value: {product?.volume?.value} {product?.volume?.unit}
          </Typography.Paragraph>
          <div className={styles.productItemProgressBar}>
            <div>
              <ProgressBarBeer
                score={product.ebc}
                measurment={'EBC'}
                value={100}
              />
              <Typography.Paragraph>color units</Typography.Paragraph>
            </div>
            <div>
              <ProgressBarBeer
                score={product.ibu}
                measurment={'IBU'}
                value={100}
              />
              <Typography.Paragraph>bitterness</Typography.Paragraph>
            </div>
            <div>
              <ProgressBarBeer
                score={product.abv}
                measurment={'°'}
                value={12}
              />
              <Typography.Paragraph>strength</Typography.Paragraph>
            </div>
            <div>
              <ProgressBarBeer
                score={product.ph}
                measurment={'pH'}
                value={10}
              />
              <Typography.Paragraph>alkalinity</Typography.Paragraph>
            </div>
            <div>
              <ProgressBarBeer
                score={product.attenuationLevel}
                measurment={'%'}
                value={100}
              />
              <Typography.Paragraph>attenuation</Typography.Paragraph>
            </div>
          </div>
          <p>{product.description}</p>
          <p>Brewer: {product.contributedBy?.split('<')[0]}</p>
        </div>
      </div>
      <div className={styles.container}>
        <Typography.Title
          style={{ textAlign: 'center', fontSize: 20, marginBottom: 25 }}
        >
          Temperature preparing beer
        </Typography.Title>
        <Descriptions bordered>
          <Descriptions.Item label='Brewing'>
            {getBrewingTimeMethods(product)}
          </Descriptions.Item>
          <Descriptions.Item label='Fermentation'>
            {product.method?.fermentation.temp.value}{' '}
            {product.method?.fermentation.temp.unit}
          </Descriptions.Item>
        </Descriptions>
        <Typography.Title
          style={{ textAlign: 'center', fontSize: 20, margin: 25 }}
        >
          Ingredients
        </Typography.Title>
        <Descriptions bordered>
          <Descriptions.Item label='Malt'>
            {getBeerIngredients(product.ingredients?.malt)}
          </Descriptions.Item>
          <Descriptions.Item label='Hops'>
            {getBeerIngredients(product.ingredients?.hops)}
          </Descriptions.Item>
          <Descriptions.Item label='Yeast'>
            {product.ingredients?.yeast}
          </Descriptions.Item>
        </Descriptions>
        <Typography.Title
          style={{ textAlign: 'center', fontSize: 20, marginBottom: 25 }}
        >
          Original tips
        </Typography.Title>
        <Descriptions bordered>
          <Descriptions.Item label='Foog pairing'>
            {getFoodPairingList(product.foodPairing)}
          </Descriptions.Item>
          <Descriptions.Item label='Advice from brewer'>
            {product.brewersTips}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default ProductItemPage;
