import React from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';
import Link from 'next/link';

import classes from '../utils/classes';

export default function CartModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.cartModal}>
        <Typography id="modal-modal-title" variant="h6">
          Item was added to your cart. <br />
          Continue shopping?
        </Typography>
        <Box component="div">
          <Button onClick={() => handleClose()}>Continue</Button>
          <Link href="/cart" passHref>
            <Button>Go to cart </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
}
