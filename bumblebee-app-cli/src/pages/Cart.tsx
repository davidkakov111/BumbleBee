import { Button, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItem, clearCart } from '../redux/cartSlice';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import './Cart.css'; 

const CartPage = () => {
  // Get cart items from Redux store
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Remove a single item from the cart
  const handleRemoveItem = (type: string) => {
    dispatch(removeItem(type));
  };

  // Clear all items from the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle order submission
  const handleOrder = async () => {
    try {
      // Filter valid items and format for API request
      const honeys = cart
        .filter(item => item.quantity > 0 && item.type)
        .map(item => ({ name: item.type, amount: item.quantity }));
      if (!honeys.length) return;
  
      await axiosInstance.post('/api/order', { honeys });
  
      // If status is 2xx (200), handle successful order
      alert('Sikeres megrendelés!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle 400 - Client error
        if (error.response.status === 400) {
          console.error('Érvénytelen rendelés: ', error.response.data);
          alert('Probléma történt a rendeléseddel. Kérlek, ellenőrizd a rendelést.');
        } 
        // Handle 500 - Server error
        else if (error.response.status === 500) {
          console.error('Szerver hiba:', error.response.data);
          alert('Probléma történt a rendelés feldolgozásával. Kérlek próbáld meg később.');
        } 
        // Handle all other errors as unknown
        else {
          console.error('Ismeretlen hiba:', error.response.data);
          alert('Ismeretlen hiba történt. Kérlek próbáld meg újra.');
        }
      } else {
        console.error('Hiba a rendelés során, szerver nem elérhető:', error);
        alert('Váratlan hiba történt! Úgy tűnik a szerver nem elérhető.');
      }    
    } finally {
      handleClearCart();  // Clear cart after order attempt
    }
  };
  
  return (
    <div className="cart-page">
      <Typography variant="h4" className="cart-title">Kosár</Typography>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <Typography variant="body1" className="cart-item-text">{item.type} - {item.quantity}</Typography>
              <IconButton
                onClick={() => handleRemoveItem(item.type)} 
                className="remove-button"
                color="error"
              >
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
        </div>
      ) : (<Typography variant="body1" className="empty-cart-text">A kosár üres.</Typography>)}

      {/* Buttons for clearing cart and ordering */}
      <div className="cart-actions">
        <Button variant="contained" color="secondary" className="clear-cart-button" disabled={cart.length <= 0} onClick={handleClearCart}>Kosár ürítése</Button>
        <Button variant="contained" color="secondary" className="order-button" disabled={cart.length <= 0} onClick={handleOrder}>Megrendelés</Button>
      </div>
    </div>
  );
};

export default CartPage;
