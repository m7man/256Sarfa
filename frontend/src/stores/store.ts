import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import cvsSlice from './cvs/cvsSlice';
import job_offersSlice from './job_offers/job_offersSlice';
import job_postingsSlice from './job_postings/job_postingsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import companiesSlice from './companies/companiesSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    cvs: cvsSlice,
    job_offers: job_offersSlice,
    job_postings: job_postingsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    companies: companiesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
