import React, { useContext, useState } from 'react';

import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Box,
  Container,
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import CartModal from '../../components/CartModal';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import classes from '../../utils/classes';
import db from '../../utils/db';
import { Store } from '../../utils/Store';



export default function ProductScreen(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const [open, setOpen] = useState(false);

  const router = useRouter();

  if (!product) {
    return <Box>Product Not Found</Box>;
  }
  const addToCartHandler = async () => {
    setOpen(true);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  const handleClose = () => setOpen(false);

  const prevPageHandler = () => router.back();

  return (
    <Layout title={product.name}>
      <Container>
        <Box sx={classes.section}>
          <Link sx={{ cursor: 'pointer' }} onClick={prevPageHandler}>
            back
          </Link>
        </Box>
        <Grid container spacing={2} sx={{ justifyContent: 'space-evenly' }}>
          <Grid item md={4} xs={product.subImage ? 6 : 8}>
            <Image
              src={product.image}
              alt={product.name}
              width={440}
              height={640}
              layout="responsive"
            />
          </Grid>
          {product.subImage && (
            <Grid item md={4} xs={6}>
              {product.subImage && (
                <Image
                  src={product.subImage}
                  alt={product.name}
                  width={440}
                  height={640}
                  Layout="responsive"
                />
              )}
            </Grid>
          )}

          <Grid item md={product.subImage ? 4 : 7} xs={12}>
            <List sx={{ paddingTop: 0 }}>
              <ListItem>
                <Typography variant="h4">{product.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Color: {product.color}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Composition: {product.composition}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Art. #{product.article}</Typography>
              </ListItem>
            </List>
            <Grid item md={product.subImage ? 8 : 4} xs={12}>
              <Card md={6}>
                <List>
                  <ListItem>
                    <Grid container sx={{ textAlign: 'center' }}>
                      <Grid item md={12} xs={12}>
                        <Typography>Price: ${product.price}</Typography>
                        <Typography>
                          {product.countInStock > 0
                            ? 'In stock'
                            : 'Unavailable'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    {product.countInStock !== 0 && (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={addToCartHandler}
                      >
                        <Typography variant="h7">Add to cart</Typography>
                      </Button>
                    )}
                    <CartModal open={open} handleClose={handleClose} />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { article } = params;

  await db.connect();
  const product = await Product.findOne({ article }, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
