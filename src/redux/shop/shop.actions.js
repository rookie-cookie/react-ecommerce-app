import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// export const updateCollections = (collectionsMap) => ({
//   type: ShopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap
// })

//thunk is an action creator that returns a function that gets the dispatch similar to mapDispatchToProps
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());  //switch isFetching to true

    //async request
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      dispatch(fetchCollectionsSuccess(collectionsMap))
      // console.log(collectionsMap)
      // this.setState({loading: false})
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

  }
}


