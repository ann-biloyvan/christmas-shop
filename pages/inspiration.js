import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import Link from 'next/link';

import Layout from '../components/Layout';
import styles from '../utils/Inspiration.module.css';

const itemData = [
  {
    img: '/images/4.png',
  },
  {
    img: '/images/6.png',
    title: 'Christmas wreath',
    href: '/product/48333060121',
    price: '59.99',
    left: '60%',
    top: '35%',
  },
  {
    img: '/images/12.png',
    title: 'Candle',
    href: '/product/0897993001',
    price: '9.99',
    left: '31%',
    top: '40%',
  },
  {
    img: '/images/9.png',
  },

  {
    img: '/images/5.png',
    title: 'Gift Wrap',
    price: '2.99',
    href: 'product/1014907001',
    left: '40%',
    top: '83%',
  },

  {
    img: '/images/13.png',
    title: 'Large Paper Snowflake',
    price: '14.99',
    href: '/product/0918668001',
    left: '73%',
    top: '55%',

    title2: 'Metal Christmas Decoration',
    price2: '2.99',
    href2: '/product/0911760003',
    left2: '53%',
    top2: '53%',
  },
  {
    img: '/images/3.png',
    title: 'Candle',
    price: '12.99',
    href: '/product/0911760002',
    left: '58%',
    top: '66%',

    title2: 'Satin Ribbon',
    price2: '1.99',
    href2: '/product/0672169006',
    left2: '63%',
    top2: '45%',
  },
  {
    img: '/images/1.png',
  },
  {
    img: '/images/2.png',
    title: 'Christmas Stocking',
    href: '/product/0672825007',
    price: '2.99',
    top: '30%',
    left: '60%',

    title2: 'Advent Calender',
    href2: '/product/0819114003',
    price2: '12.99',
    top2: '27%',
    left2: '22%',
  },
  {
    img: '/images/11.png',
    title: 'Christmas Tree Ornament',
    price: '12.99',
    href: '/product/1027376001',
    left: '72%',
    top: '63.5%',

    title2: 'Glass Christmas Ornament',
    price2: '5.99',
    href2: '/product/1005565001',
    left2: '45%',
    top2: '45%',
  },
  {
    img: '/images/8.png',
  },
  {
    img: '/images/10.png',
    title: 'Porcelain Christmas Tree',
    price: '9.99',
    left: '70%',
    top: '75%',
    href: '/product/1013681001',
  },
];

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}></Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function Inspiration() {
  const isDesktop = useMediaQuery('(min-width:750px)');

  return (
    <Layout title="inspiration for decoration">
      <Box mr={2} ml={2} mt={-2}>
        <ImageList
          variant={isDesktop ? 'masonry' : 'standard'}
          gap={12}
          cols={isDesktop ? 3 : 1}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img} sx={{ position: 'relative' }}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              {item.href && (
                <Link href={item.href} passHref>
                  <HtmlTooltip title={`${item.title} $${item.price}`}>
                    <Box
                      className={styles.blob}
                      sx={{
                        left: item.left,
                        top: item.top,
                      }}
                    ></Box>
                  </HtmlTooltip>
                </Link>
              )}

              {item.href2 && (
                <Link href={item.href2} passHref>
                  <HtmlTooltip title={`${item.title2} $${item.price2}`}>
                    <Box
                      className={styles.blob}
                      sx={{
                        left: item.left2,
                        top: item.top2,
                      }}
                    ></Box>
                  </HtmlTooltip>
                </Link>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Layout>
  );
}
