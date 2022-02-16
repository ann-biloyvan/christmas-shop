const classes = {
  //common
  flex: {
    display: 'flex',
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'none',
  },
  sort: {
    marginRight: 1,
  },
  fullHeight: { height: '100vh' },
  fullWidth: {
    width: '100%',
  },
  error: {
    color: '#f04040',
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  //layout
  main: {
    minHeight: '78vh',
  },
  footer: {
    marginTop: 1,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  section: {
    marginTop: 1,
    marginBottom: 1,
  },
  // header
  appbar: {
    background: 'none',
    position: 'sticky',
    boxShadow: 'none',

    '& a': {
      color: '#ffffff',
    },
  },
  toolbar: {
    display: 'flex',
    marginTop: '2.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 'clamp(1.4rem, 3vw ,1.7rem )',
    display: 'inline-block',
    fontFamily: '"Orbitron", sans-serif',
  },
  brand2: {
    fontFamily: '"Orbitron", sans-serif',

    fontSize: 'clamp(1.5rem, 3vw ,1.8rem)',
    display: 'inline-block',
    transform: 'rotate(180deg)',
  },

  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    padding: 0,
    color: '#ffffff',
    textTransform: 'initial',
  },

  menuButton: { padding: 0.5 },

  //drawer

  paper: {
    height: '100vh',
    backgroundColor: 'rgba(255,0,0,0.4)',
  },

  // search

  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    width: '100%',
    display: 'flex',
  },
  searchInput: {
    paddingLeft: 1,
    color: 'black',
    borderRadius: 1,
    width: 'inherit',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  searchButton: {
    backgroundColor: 'rgb(172, 54, 54)',
    width: '20px',
    '& svg': {
      color: 'white',
    },
  },

  modal: {
    position: 'relative',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  },

  //timer

  timerBox: {
    background: 'rgba(0, 0, 0, 0.5)',

    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',

    width: 'fit-content',
    height: 'clamp(5rem, 10vw, 6rem)',

    textAlign: 'center',
    textShadow:
      '0px 1px 0 rgb(0, 0, 0), 0px -1px 0 rgb(0, 0, 0), 1px 0px 0 rgb(0, 0, 0), -1px 0px 0 rgb(0, 0, 0), 1px 1px 0 rgb(0, 0, 0), 1px -1px 0 rgb(0, 0, 0), -1px 1px 0 rgb(0, 0, 0), -1px -1px 0 rgb(0, 0, 0),2px 2px 1px rgba(0, 0, 0, 1)',
    borderRadius: '50%',

    marginTop: '1rem',
  },

  timer: {
    display: 'inline',
    width: '80%',
  },
  timerSeconds: {
    display: 'inline-block',
    width: 'clamp(1rem, 10vw, 2.5rem)',
  },

  //main page
  inspirationLink: { marginBlock: '5rem', textAlign: 'center' },

  productCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },

  cardContent: { paddingBottom: 0 },
  cardActions: { paddingTop: 0 },

  cartModal: {
    position: 'absolute',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(20rem,45vw,25rem)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    textAlign: 'center',
    '& > div': {
      display: 'flex',

      justifyContent: 'space-evenly',
    },
  },

  allProductsLink: {
    marginTop: 2,
    marginBottom: 5,
    textAlign: 'center',
    '& a': {
      fontSize: 'clamp(1.5rem,6vw,2rem)',
    },
  },
};

export default classes;
