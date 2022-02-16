import React from 'react';

import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

import styles from '../utils/LightRope.module.css';

function Bulb({ firststyle, secondstyle, thirdstyle }) {
  return (
    <div className={styles.bulbBox}>
      <div className={styles.fixture}>
        <div className={styles.strip}></div>
        <div className={styles.strip}></div>
        <div className={styles.strip}></div>
      </div>
      <div className={styles.boxy}>
        <div
          className={
            firststyle
              ? styles[`${firststyle}`]
              : secondstyle
              ? styles[`${secondstyle}`]
              : thirdstyle
              ? styles[`${thirdstyle}`]
              : styles.third
          }
        >
          <div className={styles.zig}></div>
          <div className={styles.zig}></div>
          <div className={styles.zig}></div>
        </div>
      </div>
    </div>
  );
}

function LightRope() {
  let firststyle = Cookies.get('firstStyle');

  let secondstyle = Cookies.get('secondStyle');

  let thirdstyle = Cookies.get('thirdStyle');

  return (
    <div className={styles.box}>
      <Bulb secondstyle={secondstyle} />
      <Bulb firststyle={firststyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb secondstyle={secondstyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb secondstyle={secondstyle} />
      <Bulb firststyle={firststyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb />
      <Bulb secondstyle={secondstyle} />
      <Bulb />
      <Bulb firststyle={firststyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb secondstyle={secondstyle} />
      <Bulb />
      <Bulb secondstyle={secondstyle} />
      <Bulb firststyle={firststyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb />
      <Bulb secondstyle={secondstyle} />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb />
      <Bulb firststyle={firststyle} />
      <Bulb />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb />
      <Bulb secondstyle={secondstyle} />
      <Bulb />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb firststyle={firststyle} />
      <Bulb />
      <Bulb thirdstyle={thirdstyle} />
      <Bulb secondstyle={secondstyle} />
      <Bulb firststyle={firststyle} />
      <Bulb />
    </div>
  );
}

export default dynamic(() => Promise.resolve(LightRope), { ssr: false });
