import Link from 'next/link';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Next Postgres Application
        </Typography>
        <Button color='inherit'>
          <Link href='/'>
            <span style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </span>
          </Link>
        </Button>
        <Button color='inherit'>
          <Link href='/about'>
            <span style={{ textDecoration: 'none', color: 'inherit' }}>
              About
            </span>
          </Link>
        </Button>
        <Button color='inherit'>
          <Link href='/contact'>
            <span style={{ textDecoration: 'none', color: 'inherit' }}>
              Contact
            </span>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
