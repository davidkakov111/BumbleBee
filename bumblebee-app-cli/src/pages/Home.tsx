import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CheckCircle } from '@mui/icons-material'; 
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { useState } from 'react';
import './Home.css'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Function to add an item to the cart
  const handleAddItem = (type: string) => {
    dispatch(addItem({ type, quantity: 1 }));
    
    setClickedItem(type);
    setTimeout(() => {
      setClickedItem(null); // Reset the button text after 1 second
    }, 1000);
  };

  // Capitalize first letter of a string
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // List of available honey types
  const honeyTypes = ['akác', 'gyógy', 'hárs', 'virág', 'repce'];

  return (
    <TableContainer component={Paper} className="table-container">
      {/* Centered title */}
      <Typography variant="h4" gutterBottom className="page-title">
        Bolt
      </Typography>
      <div className='shop-table'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="big-bold">Mézfajták</TableCell>
            <TableCell className="big-bold" align="right">Művelet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {honeyTypes.map((type) => (
            <TableRow key={type}>
              <TableCell component="th" scope="row">
                {capitalize(type)} méz
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  onClick={() => handleAddItem(type)}
                  className="add-to-cart-btn"
                >
                  {clickedItem === type ? <CheckCircle /> : 'Kosárba rak'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      
    </TableContainer>
  );
};

export default HomePage;
