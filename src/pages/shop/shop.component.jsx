import React from 'react'
// import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'

import { Route } from 'react-router-dom'
// import CollectionPage from '../collection/collection.component'
import CollectionPageContainer from '../collection/collection.container'

// import { firestore } from '../../firebase/firebase.utils'
// import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
// import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
// import { updateCollections } from '../../redux/shop/shop.actions'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
// import WithSpinner from '../../components/with-spinner/with-spinner.component'

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  // state = {
  //   loading: true
  // }

  // unsubscribeFromSnapshot = null; 

  // componentDidMount(){
  //   const { updateCollections } = this.props
  //   const collectionRef = firestore.collection('collections');

    //fetch pattern 
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-c987f/databases/(default)/documents/collections")
    //   .then(response => response.json())
    //   .then(collections => console.log(collections)) //the collections returned is extremely nested so not good to use for now

    //Promise pattern
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   console.log(collectionsMap)
    //   this.setState({loading: false})
    // })

    //observer pattern
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   console.log(collectionsMap)
    //   this.setState({loading: false})
    // })
  // }

  render(){
    const { match } = this.props;
    // const { loading } = this.state;
    return (
      <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    {/* <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} /> */}
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
    {/* <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>} /> */}
  </div>
    )
  }
}

// const ShopPage = ({ match }) => (
//   <div className="shop-page">
//     <Route exact path={`${match.path}`} component={CollectionOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
//   </div>
// )

// const mapStateToProps = createStructuredSelector({
//   // isCollectionFetching: selectIsCollectionFetching,
//   // isCollectionsLoaded :selectIsCollectionsLoaded
// })

const mapDispatchToProps = (dispatch) => ({
  // updateCollections: (collectionsMap) =>
  //   dispatch(updateCollections(collectionsMap)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
export default connect(null, mapDispatchToProps)(ShopPage);