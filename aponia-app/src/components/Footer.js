import * as React from 'react';
import { Link, Typography } from '@mui/material';

function Footer() {

  const [isHover, setIsHover] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Created by '}
        <Link color="inherit" href="https://ih1.redbubble.net/image.3671801155.7224/st,small,507x507-pad,600x600,f8f8f8.jpg">
          Mitra Dev Team
        </Link>{' '}
        {new Date().getFullYear()}{' - Laboratorio II'}
        {isHover &&
          <img
            height={16}
            width={16}
            src='https://media.tenor.com/L0pi1J8YNy4AAAAC/kiana-kaslana-honkai-smug.gif'
            alt='gif'
          />
        }
      </Typography>
    </div>
  );
}


export default Footer;