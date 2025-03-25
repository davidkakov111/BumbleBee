import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import { Container, AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store'; 
import './App.css'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get total item count from Redux cart state
  const cartItemCount = useSelector((state: RootState) => {
    let cartContentCount = 0;
    for (let cartItem of state.cart.items) {
      cartContentCount += cartItem.quantity;
    }
    return cartContentCount
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Navigation Header */}
      <AppBar position="static" className="glass-header">
        <Toolbar className='toolbar'>
          {/* Logo / Home Link */}
          <Link className="logo" to="/">
            <img src="/bee.png" alt="Logo" />
            <Typography variant="h6" className="logoText">
              BumbleBee
            </Typography>
          </Link>

          {/* Show Cart Icon if user is logged in */}
          {isLoggedIn && (
            <IconButton color='inherit' component={Link} to="/cart">
              <Badge badgeContent={cartItemCount > 0 ? cartItemCount : null} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container className="app-container">
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/cart" element={isLoggedIn ? <CartPage /> : <LoginForm onLogin={handleLogin} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
