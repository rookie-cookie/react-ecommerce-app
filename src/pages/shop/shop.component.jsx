import React from 'react'
import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component'
import { firestore } from '../../firebase/firebase.utils'
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null; 

  componentDidMount(){
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      console.log(collectionsMap)
    })
  }

  render(){
    const { match } = this.props;
    return (
      <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
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