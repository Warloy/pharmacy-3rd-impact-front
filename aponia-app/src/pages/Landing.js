import * as React from 'react';
import { AppBar,
    styled,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    Tooltip,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
/* Icons */



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Landing() {

    return (
    <Paper elevation='0' sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <img
            height='100%'
            width='100%'
            src='https://i.pinimg.com/736x/9b/2e/45/9b2e45887ea84b2888f0ae3f429dd1e5.jpg'
            alt='img'
          />
    </Paper>
  );
}