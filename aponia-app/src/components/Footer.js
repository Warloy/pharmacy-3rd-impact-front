import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
return (
    <Typography variant="body2" color="text.secondary" align="center">
    {'Created by '}
    <Link color="inherit" href="https://ih1.redbubble.net/image.3671801155.7224/st,small,507x507-pad,600x600,f8f8f8.jpg">
        Mitra Dev Team
    </Link>{' '}
    {new Date().getFullYear()}{' - Laboratorio II'}
    </Typography>
);
}


export default Footer;