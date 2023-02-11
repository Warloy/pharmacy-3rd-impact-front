import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function BasicTable({ rows = [], columns = [], loading = false }) {

  const [auxRows, setAuxRows] = React.useState([])

  const setRowsInTable = () => {
    setAuxRows([])
    rows?.forEach(row => {
      let obj = []
      for (const prop in row) {
        obj?.push(row[prop])
      }
      setAuxRows(prev => [...prev, obj])
    })
  }

  React.useEffect(() => {
    setRowsInTable()
  }, [rows])

  return (
      <TableContainer sx={{ mb:2 }} component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650, maxHeight: 550 }} aria-label="simple table">
          <TableHead sx={{ minWidth: '100%' }}>
            <TableRow>
              {columns?.map((column, key) => (
                <TableCell
                  key={key}
                  align='center'
                >
                  {column}
                </TableCell>
              )
              )}
            </TableRow>
          </TableHead>
          <TableBody sx={{ minHeight: 650, maxHeight: 550 }}>
            {auxRows?.length > 0 && auxRows?.map((row, index) => (
              <TableRow
                key={index}
              >
                {row?.map((item, key) => (
                  <TableCell
                    key={key}
                    align='center'
                    sx={{
                      minHeight: 10,
                      maxHeight: 25
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </Table>
        {loading &&
          <div
            style={{
              flex: 1,
              display: 'flex',
              minWidth: '100%',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              height={256}
              width={256}
              src='https://i.stack.imgur.com/ATB3o.gif'
              alt='gif'
            />
          </div>
        }
        {auxRows?.length === 0 && !loading &&
            <div
            style={{
              flex: 1,
              display: 'flex',
              minWidth: '100%',
              minHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography sx={{my:5}}>
              No se encontraron datos
            </Typography>
          </div>}
      </TableContainer>
  );
}