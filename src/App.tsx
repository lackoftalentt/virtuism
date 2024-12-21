import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './app/dashboard/Layout';
import { ActorsPage } from './pages/ActorsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { MoviePage } from './pages/MoviePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { SerialPage } from './pages/SerialPage';

function App() {
	return (
		<>
			<Routes>
				<Route path='login' element={<LoginPage />} />
				<Route path='register' element={<RegisterPage />} />

				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='movie' element={<MoviePage />} />
					<Route path='serial' element={<SerialPage />} />
					<Route path=':type/:id' element={<MovieDetailPage />} />
					<Route path='actors' element={<ActorsPage />} />
					<Route path='favorites' element={<FavoritesPage />} />
					<Route path='search' element={<SearchResultsPage />} />
					<Route path='/*' element={<NotFoundPage />} />
				</Route>
			</Routes>

			<ToastContainer />
		</>
	);
}

export default App;
