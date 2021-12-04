import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth }  from '../../firebase/firebase.utils'
import { connect } from 'react-redux'  //connect is a HOF 
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"/>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        currentUser 
        ?
        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        : //null user 
        <Link className="option" to="/signin">SIGN IN</Link>
      }

      <CartIcon />
    </div>
    {
      hidden ? null :
      <CartDropdown />
    }
    
  </div>
)

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
  //currentUser: state.user.currentUser  //null user atm since no actions setup in the user.actions yet
  currentUser, 
  hidden
})

export default connect(mapStateToProps)(Header);