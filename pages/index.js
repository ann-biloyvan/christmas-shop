import { useState, useEffect, useContext, useRef } from 'react';

import { Container, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';

import Banner from '../components/Banner';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Snow from '../components/Snow';
import Product from '../models/Product';
import classes from '../utils/classes';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { featuredProducts } = props;
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef();

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const setDimension = () => {
    setContainerHeight(containerRef.current.clientHeight);
  };

  useEffect(() => {
    setDimension();
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, []);

  return (
    <Layout>
      <Banner />
      <Snow containerHeight={containerHeight} />
      <Container id="popular products" ref={containerRef} onLoad={setDimension}>
        <Box sx={classes.inspirationLink}>
          <Typography variant="h3">
            Need some inspiration? Visit our{' '}
            <NextLink href="/inspiration" passHref>
              <Link>lookbook</Link>
            </NextLink>
          </Typography>
        </Box>

        <Typography variant="h4">Popular Products</Typography>
        <Grid container spacing={3} justifyContent="center">
          {featuredProducts.map((product) => (
            <Grid item md={3} xs={6} key={product.article}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>

        <Box component="div" sx={classes.allProductsLink}>
          <NextLink href="/search?category=all">
            <Link>Shop All Products</Link>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find({
    countInStock: { $gte: 1 },
  })
    .lean()
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
    },
  };
}
