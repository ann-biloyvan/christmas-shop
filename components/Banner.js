import React from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { Link } from 'react-scroll';

import styles from '../utils/Banner.module.css';
import CountdownTimer from './CountdownTimer';

export default function Banner() {
  return (
    <Box className={styles.banner}>
      <Image
        src="/images/banner6.png"
        alt="decorated room"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="/images/banner6.png"
      />

      <Box className={styles.content}>
        <Typography variant="h1">Christmas is coming</Typography>
        <CountdownTimer />
        <Link
          activeClass="active"
          to="popular products"
          spy={true}
          smooth={true}
          offset={-70}
          duration={900}
        >
          <Button variant="contained">
            Go shopping
            <ArrowDownwardIcon />
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
