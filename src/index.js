import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';




const petReducer = (state = [], action) => {
    console.log('in petReducer');
    switch (action.type) {
        case 'SET_PET':
            return action.payload;
        default:
            return state;
    }
}

const ownerReducer = (state = [], action) => {
    console.log('in ownerReducer');
    switch (action.type) {
        case 'SET_OWNER':
            return action.payload;
        default:
            return state;
    }
}


function* addPetSaga(action) {
    console.log('in addPet');
    try{
        yield axios.post('/pets/add', action.payload);
        yield put({type: 'GET_PET'});
    }
    catch (error) {
        console.log('ERROR IN POST', error);
        alert(`Sorry! Unable to add pet. Try again later.`)
    }
}

function* getPetSaga(action) {
    console.log('in getPetSaga')
    try{
        const response = yield axios.get('/pets');
        console.log('Response is', response);
        yield put({type:'SET_PET', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Was unable to get pets. Try again later.`);
    }
}

function* deletePetSaga(action) {
    console.log('hit the delete pet saga', action);
    try {
        yield axios.delete(`/pets/delete/${action.payload}`)
        yield put({
            // call get request and rerender w/ new list values
            type: 'GET_PET'
        });
    } catch (error) {
        console.log(`Couldn't delete pet`, error);
        alert(`Sorry, couldn't delete the pet. Try again later`);
    }
}

function* getOwnerSaga(action) {
    console.log('in getOwnerSaga')
    try{
        const response = yield axios.get('/owners');
        console.log('Response is', response);
        yield put({type:'SET_OWNER', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Was unable to get owners. Try again later.`);
    }
}


function* deleteOwnerSaga(action) {
    console.log('hit the delete pet saga', action);
    try {
        yield axios.delete(`/owners/delete/${action.payload}`)
        yield put({
            // call get request and rerender w/ new list values
            type: 'GET_OWNER'
        });
        yield put({
            // call get request and rerender w/ new list values
            type: 'GET_PET'
        });
    } catch (error) {
        console.log(`Couldn't delete owner`, error);
        alert(`Sorry, couldn't delete the owner. Try again later`);
    }
}

function* addOwnerSaga(action) {
    console.log('in addOwner');
    try{
        yield axios.post('/owners/add', action.payload);
        yield put({type: 'GET_OWNER'});
    }
    catch (error) {
        console.log('ERROR IN POST', error);
        alert(`Sorry! Unable to add owner. Try again later.`)
    }
}

function* updateStatusSaga(action){
    console.log('in updateStatusSaga', action.payload)
    try {
        yield axios.put(`/pets/update/status/${action.payload.id}`, action.payload);
        yield put({type: 'GET_PET'})

    } catch (error) {
        console.log('ERROR UPDATING CHECKIN STATUS', error);
        alert(`Sorry! Was unable to update checkin status. Try again later.`);
    }

}



//watcher saga to take in dispatches
function* watcherSaga() {
    yield takeEvery ('ADD_PET', addPetSaga);
    yield takeEvery ('ADD_OWNER', addOwnerSaga);
    yield takeEvery ('GET_PET', getPetSaga);
    yield takeEvery ('GET_OWNER', getOwnerSaga);
    yield takeEvery ('DELETE_PET', deletePetSaga);
    yield takeEvery ('DELETE_OWNER', deleteOwnerSaga);
    yield takeEvery('UPDATE_STATUS', updateStatusSaga)
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        ownerReducer,
        petReducer,

     
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();