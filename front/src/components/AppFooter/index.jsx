import { Button, Typography } from 'antd';
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';

import styles from './styles.module.css';

const AppFooter = () => {
  return (
    <div className={`${styles.AppFooter} ${styles.container}`}>
      <div className={styles.phone}>
        <Typography.Text style={{ fontSize: 18 }}>
          <PhoneOutlined href={'tel:+380962497557'} />{' '}
          <a style={{ color: 'black' }} href='tel:+380962497557'>
            +380962497557
          </a>
        </Typography.Text>
        <Typography.Text style={{ color: 'gray', fontSize: 12 }}>
          07:00 am to 11:00 pm
        </Typography.Text>
      </div>
      <div className={styles.socialMedia}>
        <Button
          type='text'
          target='_blank'
          href={'https://www.instagram.com'}
          icon={<InstagramOutlined style={{ fontSize: 25 }} />}
        />
        <Button
          type='text'
          target='_blank'
          href={'https://www.twitter.com'}
          icon={<TwitterOutlined style={{ fontSize: 25 }} />}
        />
        <Button
          type='text'
          target='_blank'
          href={'https://www.linkedin.com/in/yevhen-babenko-8501b023b/'}
          icon={<LinkedinOutlined style={{ fontSize: 25 }} />}
        />
      </div>
      <Typography.Text style={{ fontSize: 18 }}>
        <MailOutlined />{' '}
        <a
          style={{ color: 'black' }}
          href='mailto: topbeerintheworld@gmail.com'
        >
          {' '}
          topbeerintheworld@gmail.com
        </a>
      </Typography.Text>
    </div>
  );
};

export default AppFooter;
