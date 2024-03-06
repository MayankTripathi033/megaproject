import {configureStore} from '@reduxjs/toolkit';
import authslice from './authslice';

const Store = configureStore({
    reducer : {
        auth : authslice
    }
})

export default Store
