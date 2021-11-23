import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth }  from '../../firebase/firebase.utils'
import { connect } from 'react-redux'  //connect is a HOF 
 
const Header = ({ currentUser }) => (
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
    </div>
  </div>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser  //null user atm since no actions setup in the user.actions yet
})

export default connect(mapStateToProps)(Header);