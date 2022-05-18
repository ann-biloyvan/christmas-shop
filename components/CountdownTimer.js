import React from 'react';
import { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

import classes from '../utils/classes';

const calcTimeLeft = () => {
  let year = new Date().getFullYear();
  const difference = +new Date(`12/25/${year}`) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box sx={classes.timerBox}>
      <Box style={classes.timer}>
        <Typography variant="h6">
          {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes
          <Box component="span" sx={classes.timerSeconds}>
            {timeLeft.seconds}
          </Box>
          seconds
        </Typography>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(CountdownTimer), { ssr: false });
