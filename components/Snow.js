import React from 'react';

import dynamic from 'next/dynamic';

import styles from '../utils/Snow.module.css';

const Snowflake = (props) => {
  return (
    <p className={styles.snowflake} style={props.style}>
      ❄
    </p>
  );
};

function Snow({ containerHeight }) {
  const height = 150 + containerHeight;

  const snow = () => {
    let animationDelay = '0s';
    let fontSize = '100px';
    let arr = Array.from(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book'
    );
    return arr.map((_, i) => {
      animationDelay = `${(Math.random() * 20).toFixed(2)}s`;
      fontSize = `${Math.floor(Math.random() * 10) + 5}px`;
      let style = {
        animationDelay,
        fontSize,
      };
      return <Snowflake key={i} id={i} style={style} />;
    });
  };

  return (
    <div className={styles.snowfall} style={{ height: `${height}px` }}>
      {snow()}
    </div>
  );
}
export default dynamic(() => Promise.resolve(Snow), { ssr: false });
