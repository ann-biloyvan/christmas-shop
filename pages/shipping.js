import React, { useContext, useEffect } from 'react';

import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import classes from '../utils/classes';
import { Store } from '../utils/Store';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <Container>
        <CheckoutWizard activeStep={1} />
        <form
          style={classes.form}
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <Typography variant="h4" mt={5}>
            Shipping Address
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'Full Name length must be more than 1 character'
                          : 'Full Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Address length must be more than 1 character'
                          : 'Address is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'City length must be more than 1 character'
                          : 'City is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'Postal Code length must be more than 1 character'
                          : 'Postal Code is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === 'minLength'
                          ? 'Country length must be more than 1 character'
                          : 'Country is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Container>
    </Layout>
  );
}
