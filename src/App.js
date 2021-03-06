import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
// import { addCollectionAndDocuments } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'


class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  //refer to firebase documentation
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;
    // const { setCurrentUser, collectionsArray } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: user});
      // console.log(user);
      // createUserProfileDocument(user)

      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // }, () => {
          //   console.log(this.state);
          // })
          setCurrentUser({
            id: snapshot.id, 
            ...snapshot.data()
          });
        });
      } 

      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({
      //   title, items
      // })));
      
    }) 
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render (){
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          
          <Route exact path='/signin' render={() => this.props.currentUser ? (
            <Redirect to='/' />
          ) : (
           <SignInAndSignUpPage />
          )
          } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

