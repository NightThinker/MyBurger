import { takeEvery } from 'redux-saga';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITATE_LOGOUT, logoutSaga);
}