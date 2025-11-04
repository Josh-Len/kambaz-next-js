import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './Courses/[cid]/reducer';
import modulesReducer from './Courses/[cid]/Modules/reducer';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    modules: modulesReducer,
  },
});

export default store;                           
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
