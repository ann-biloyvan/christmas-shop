import React, { useState } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

import classes from '../utils/classes';
import CartModal from './CartModal';

export default function ProductItem({ product, addToCartHandler }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    addToCartHandler(product);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <Card sx={classes.productCard}>
      <NextLink href={`/product/${product.article}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            src={product.image}
            onMouseOver={(e) => {
              if (product.subImage) {
                return (e.currentTarget.src = `${product.subImage}`);
              }
            }}
            onMouseOut={(e) => (e.currentTarget.src = `${product.image}`)}
            alt={product.name}
            title={product.name}
          />

          <CardContent sx={classes.cardContent}>
            <Typography>{product.name}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions sx={classes.cardActions}>
        <Typography>${product.price}</Typography>
        {product.countInStock === 0 ? (
          <Typography color="primary">Out of stock</Typography>
        ) : (
          <IconButton size="small" color="primary" onClick={() => handleOpen()}>
            <AddShoppingCartIcon />
          </IconButton>
        )}

        <CartModal open={open} handleClose={handleClose} />
      </CardActions>
    </Card>
  );
}
