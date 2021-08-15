import {BrowserRouter as Router , Route} from 'react-router-dom'
import FoodList from './components/FoodList';
import FoodDetail from './components/FoodDetail';
import Cart from './components/Cart';
import Navbar from './components/Navbar';


import Signin from './components/Signin';
import Register from './components/Register';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import Order from './components/Order'
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import OrderList from './components/OrderList';
import ProfileHome from './components/ProfileHome'
import UserList from './components/UserList';



function App() {
 
  return (
    
    <div>
    
   
    <Router>
    <Navbar/>
    
    <div className="App">
       
         
         <Route path='/product/:id' component={FoodDetail} exact />
         <Route path='/cart/:id?' component={Cart}/>
         <Route path='/signin' component={Signin} />
         <Route path='/shipping' component={Shipping}/>
         <Route path='/register' component={Register} />
         <Route path='/payment'  component ={Payment} />
         <Route path="/placeorder" component={PlaceOrder}/>
         <PrivateRoute path="/order/:id" component={Order}/>
         <Route path="/orderhistory" component={OrderHistory}/>
         <PrivateRoute path="/profile" component={Profile}/>
         <AdminRoute path="/productlist" component={ProductList}/>
         <AdminRoute path="/userlist" component={UserList}/>
         <PrivateRoute  path='/profilehome' component ={ProfileHome}/>
         <AdminRoute path="/orderlist" component={OrderList}/>
         <Route path="/product/:id/edit"  component={ProductEdit} exact/>
         <Route path='/' component={FoodList} exact />
         
         

    </div>
    
    
    </Router>
    </div>
  );
}

export default App;
