import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import './firebase.ts';
import './styles/index.css';

import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter future={{ v7_relativeSplatPath: true }}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
