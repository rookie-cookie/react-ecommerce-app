import { takeEvery,takeLatest, call, put } from 'redux-saga/effects' //takeevery - listens for every action
// put - is used for creating (dispatching) an action 
import ShopActionTypes from './shop.types' 
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { 
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions'

export function* fetchCollectionsAsync(){
  yield console.log('fired');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error){
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart(){
  //will pause whenever a specific action types comes in
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}