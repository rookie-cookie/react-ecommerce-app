import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component'
import { firestore } from '../../firebase/firebase.utils'
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null; 

  componentDidMount(){
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');

    //fetch pattern 
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-c987f/databases/(default)/documents/collections")
    //   .then(response => response.json())
    //   .then(collections => console.log(collections)) //the collections returned is extremely nested so not good to use for now

    //Promise pattern
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      console.log(collectionsMap)
      this.setState({loading: false})
    })

    //observer pattern
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   console.log(collectionsMap)
    //   this.setState({loading: false})
    // })
  }

  render(){
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
    {/* <Route exact path={`${match.path}`} component={CollectionOverview} /> */}
    <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
    {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
    <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props}/>} />
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


const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);