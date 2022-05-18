import React, { useContext } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import classes from '../utils/classes';
import db from '../utils/db';
import { Store } from '../utils/Store';

const PAGE_SIZE = 6;

const prices = [
  {
    name: '$0 to $25',
    value: '0-25',
  },
  {
    name: '$26 to 50',
    value: '26-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
];

export default function Search(props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    query = 'all',
    category = 'all',
    price = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories, pages, page } = props;

  const { state, dispatch } = useContext(Store);

  const filterSearch = ({ page, category, sort, price }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (price) query.price = price;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value, page: 1 });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };

  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value, page: 1 });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value, page: 1 });
  };

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
  return (
    <Layout title="search">
      <Container>
        <Grid sx={classes.section} container spacing={1}>
          <Grid item md={2} xs={12}>
            <List>
              <ListItem>
                <Box sx={classes.fullWidth}>
                  <Typography>Categories</Typography>
                  <Select fullWidth value={category} onChange={categoryHandler}>
                    <MenuItem value="all">All</MenuItem>
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box sx={classes.fullWidth}>
                  <Typography>Prices</Typography>
                  <Select value={price} onChange={priceHandler} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
            </List>
          </Grid>

          <Grid item md={9}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {products.length === 0 ? 'No' : countProducts} Result(s)
                {query !== 'all' && query !== '' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {price !== 'all' && ' : Price ' + price}
                {(query !== 'all' && query !== '') ||
                category !== 'all' ||
                price !== 'all' ? (
                  <Button onClick={() => router.push('/search')}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                <Typography component="span" sx={classes.sort}>
                  Sort by
                </Typography>
                <Select value={sort} onChange={sortHandler}>
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="lowest">Price: Low to High</MenuItem>
                  <MenuItem value="highest">Price: High to Low</MenuItem>
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid sx={classes.section} container spacing={2}>
              {products.map((product) => (
                <Grid item md={4} sm={4} xs={6} key={product.article}>
                  <ProductItem
                    product={product}
                    addToCartHandler={addToCartHandler}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={classes.section}
              color="primary"
              defaultPage={1}
              count={pages}
              page={parseInt(page)}
              onChange={pageHandler}
            ></Pagination>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';

  const price = query.price || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');

  const productDocs = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
