import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Paper Christmas Ornament',
      category: 'Christmas Decorations',
      image: '/images/ornament1.png',
      price: 4.99,
      countInStock: 20,
      description:
        'Star-shaped Christmas ornament in paper with a glittery cord for hanging. Width 4 3/4 in. Height 4 3/4 in.',
      color: 'white',
      composition: 'Paper 100%',
      article: '1007308001',
    },

    {
      name: 'Large Paper Snowflake',
      category: 'Christmas Decorations',
      image: '/images/ornament2.png',
      subImage: '/images/subImage1.png',
      price: 14.99,
      countInStock: 20,
      description:
        'Large snowflake in paper with a jute cord for hanging. Diameter 18 in.',
      color: 'beige',
      composition: 'Paper 100%',
      article: '0918668002',
    },
    {
      name: 'Small Porcelain Christmas Decoration',
      category: 'Home Decorations',
      image: '/images/porcelain tree.png',
      subImage: '/images/porcelain tree_sub.png',
      price: 9.99,
      countInStock: 10,
      description:
        'Textured porcelain decoration in the form of a small Christmas tree. Diameter at the base approx. 6.5 cm. Height 10 cm.',
      color: 'White/Green',
      composition: 'Porcelain 100%',
      article: '1013681001',
    },
    {
      name: '2-pack Tapered Candles',
      category: 'Candles',
      image: '/images/candle1.png',
      subImage: '/images/subImage_candle1.png',
      price: 3.99,
      countInStock: 5,
      description:
        'Colorful, tapered candles with a glossy finish. Burn time 8 hours. Length 11 3/4 in.',
      color: 'dark green',
      composition: 'Wax 100%',
      article: '0907294002',
    },
    {
      name: 'Glittery Star Garland',
      category: 'Gerlands',
      image: '/images/gerland1.png',
      subImage: '/images/subImage_gerland1.png',
      price: 9.99,
      countInStock: 5,
      description:
        'Garland of twisted cotton cord with 16 glittery paper stars. Size of stars 4 x 4 in. Length of garland 8 ft. 9 in.',
      color: 'gold-colored',
      composition: 'Paper 100%',
      article: '0531997002',
    },

    {
      name: 'Metal Christmas Decoration',
      category: 'Christmas Decorations',
      image: '/images/ornament3.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Metal Christmas decoration with a glittery cord hanger at the top. Height approx. 6.5 cm.',
      color: 'gold-coloured',
      composition: 'Metal 100%',
      article: '0911760003',
    },
    {
      name: 'Metal Christmas Decoration',
      category: 'Christmas Decorations',
      image: '/images/ornament4.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Metal Christmas decoration with a glittery cord hanger at the top. Height approx. 6.5 cm.',
      color: 'gold-coloured',
      composition: 'Metal 100%',
      article: '0911760002',
    },

    {
      name: 'Advent Calender',
      category: 'Gifts',
      image: '/images/calender.png',
      subImage: '/images/calender_sub.png',
      price: 12.99,
      countInStock: 10,
      description:
        'Advent calendar in cotton canvas with 24 loops for hanging presents. Grommets at top to hang calendar easily. Screws not included. Size 15 3/4 x 31 1/2 in.',
      color: 'Red',
      composition: 'Detail: Metal 100% Main part: Cotton 100%',
      article: '0819114003',
    },

    {
      name: 'Metal Christmas Decoration',
      category: 'Christmas Decorations',
      image: '/images/ornament5.png',
      subImage: '/images/subImage2.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Metal Christmas decoration with a glittery cord hanger at the top. Height approx. 6.5 cm.',
      color: 'gold-coloured',
      composition: 'Metal 100%',
      article: '0911760005',
    },

    {
      name: '4 Scented Candles in Gift Box',
      category: 'Candles',
      image: '/images/candles2.png',
      subImage: '/images/subImage_candles2.png',
      price: 17.99,
      countInStock: 10,
      description:
        'Winter-fragranced candles in glass holders with an attractive label. Supplied in a cardboard box with a printed pattern. Burn time 10 hours. Candle diameter 2 in. Height approx. 2 1/2 in. Size of box 7 x 7 in.',
      color: 'red/white',
      composition: 'Wax 100%',
      article: '1017896001',
    },
    {
      name: 'Canvas Cushion Cover',
      category: 'Home Decorations',
      image: '/images/cushion1.png',
      price: 12.99,
      countInStock: 10,
      description:
        'Rectangular cushion cover in cotton canvas with a printed motif. Concealed zipper at one side. Size: 16x24',
      color: 'light beige/Merry & Bright',
      composition: 'Cotton 100%',
      article: '1004612001',
    },
    {
      name: 'Small Porcelain Dish',
      category: 'Home Decorations',
      image: '/images/dish1.png',
      subImage: '/images/subImage_dish1.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Small porcelain dish with a printed motif and a gold-colored rim. Diameter 3 3/4 in.',
      color: 'White/Christmas tree',
      composition: 'Porcelain 100%',
      article: '1016734002',
    },
    {
      name: 'Gift Wrap',
      category: 'Gift Wrap',
      image: '/images/giftwrap1.png',
      subImage: '/images/giftwrap1-sub.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Classic gift wrap in solid colour paper with a matt finish. Length 5 m. Width 70 cm.',
      color: 'Beige',
      composition: 'Paper 100%',
      article: '1014907001',
    },

    {
      name: 'Christmas Stocking',
      category: 'Home Decorations',
      image: '/images/sock.png',
      price: 2.99,
      countInStock: 10,
      description:
        'Christmas stocking in cotton canvas with a print motif and opening at the top.',
      color: 'White/Reindeer',
      composition: 'Cotton 100%',
      article: '0672825007',
    },

    {
      name: 'Christmas Wreath',
      category: 'Home Decorations',
      image: '/images/wreath.png',
      subImage: '/images/wreath_sub.png',
      price: 59.99,
      countInStock: 10,
      description:
        'Christmas wreath decorated with sleigh bells and berries. Includes velvel ribbon for hanging',
      color: 'Green',
      composition:
        '65% natural leaf · 20% polystyrene · 10% iron · 5% polyester',
      article: '48333060121',
    },
    {
      name: 'Glass Christmas Ornament',
      category: 'Christmas Decorations',
      image: '/images/glass candy.png',
      price: 5.99,
      countInStock: 10,
      description:
        'Candy-cane-shaped Christmas ornament in painted glass with a shimmery gold hanger cord at top. Width approx. 1 1/2 in. Length 4 1/4 in.',
      color: 'Red/striped',
      composition: 'Glass 100%',
      article: '1005565001',
    },
    {
      name: 'Christmas Tree Ornament',
      category: 'Christmas Decorations',
      image: '/images/ornament car.png',
      subImage: '/images/ornament car_sub.png',
      price: 12.99,
      countInStock: 10,
      description:
        'Glass Christmas ornament shaped like a car with a Christmas tree on the roof. Glittery hanger loop. Height 2 in. Length 3 1/2 in.',
      color: 'Red/car',
      composition: 'Glass 100%',
      article: '1027376001',
    },

    {
      name: 'Large Pillar Candle',
      category: 'Candles',
      image: '/images/large candle.png',
      price: 9.99,
      countInStock: 10,
      description:
        'Large wax pillar candle. Diameter approx. 7 cm. Height 15 cm.',
      color: 'White',
      composition: 'Paraffin 80%, Plant wax 20%',
      article: '0897993001',
    },
    {
      name: 'Satin Ribbon',
      category: 'Gift Wrap',
      image: '/images/ribbon.png',
      subImage: '/images/ribbon_sub.png',
      price: 1.99,
      countInStock: 10,
      description: 'Satin ribbon for gift wrapping. Width 2 cm. Length 5 m.',
      color: 'Beige',
      composition: 'Polyester 100%',
      article: '0672169006',
    },

    {
      name: 'Large Paper Snowflake',
      category: 'Christmas Decorations',
      image: '/images/ornament6.png',
      subImage: '/images/subImage1.png',
      price: 14.99,
      countInStock: 10,
      description:
        'Large snowflake in paper with a jute cord for hanging. Diameter 18 in.',
      color: 'white',
      composition: 'Metal 100%',
      article: '0918668001',
    },
  ],
};
export default data;
