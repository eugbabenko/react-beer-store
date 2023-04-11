import { CircularProgressbar } from 'react-circular-progressbar';

import styles from './styles.module.css';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBarBeer = ({ score, measurment, value }) => {
  const worth = score ?? 'X';

  return (
    <CircularProgressbar
      className={styles.progressBar}
      maxValue={value}
      value={worth}
      text={`${worth} ${measurment}`}
      circleRatio={0.7}
      styles={{
        trail: {
          strokeLinecap: 'butt',
          transform: 'rotate(-126deg)',
          transformOrigin: 'center center',
        },
        path: {
          strokeLinecap: 'butt',
          transform: 'rotate(-126deg)',
          transformOrigin: 'center center',
          stroke: '#000',
        },
        text: {
          fill: '#000',
        },
      }}
      strokeWidth={10}
    />
  );
};

export default ProgressBarBeer;
