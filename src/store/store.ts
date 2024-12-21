import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tmdbApiSlice } from './services/apiSlice';
import favoritesReducer from './slices/favoriteSlice';
import activeGenreReducer from './slices/genresSlice';
import navigateReducer from './slices/navigateSlice';
import paginationReducer from './slices/paginationSlice';
import searchReducer from './slices/searchSlice';
import sortReducer from './slices/sortSlice';
import userReducer from './slices/userSlice';

const navigatePersistConfig = {
	key: 'navigate',
	storage,
};

const favoritePersistConfig = {
	key: 'favorite',
	storage,
};

const userPersistConfig = {
	key: 'user',
	storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const persistedNavigateReducer = persistReducer(
	navigatePersistConfig,
	navigateReducer
);

const persistedFavoriteReducer = persistReducer(
	favoritePersistConfig,
	favoritesReducer
);

export const store = configureStore({
	reducer: {
		[tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
		navigate: persistedNavigateReducer,
		user: persistedUserReducer,
		favorites: persistedFavoriteReducer,
		pagination: paginationReducer,
		genres: activeGenreReducer,
		sort: sortReducer,
		search: searchReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			tmdbApiSlice.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export const persistor = persistStore(store);
