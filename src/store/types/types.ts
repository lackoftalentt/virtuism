export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: number;
	vote_count: number;
	media_type: 'movie' | 'tv';
	genres: GenresType[];
	created_by?: [
		{
			id: number;
			name: string;
		}
	];
	tagline: string;
	video: boolean;
}
export interface Serial {
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	media_type: 'movie' | 'tv';
	genres: GenresType[];
	created_by?: [
		{
			id: number;
			name: string;
		}
	];
	tagline: string;
	video: boolean;
}

export interface SerialResponse {
	page: number;
	results: Serial[];
	total_pages: number;
	total_results: number;
}

export interface MoviesResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Actor {
	id: number;
	name: string;
	original_name: string;
	profile_path: string;
	known_for_department: string;
	popularity: number;
}

export interface ActorResponse {
	page: number;
	results: Actor[];
	total_pages: number;
	total_results: number;
}

export interface GenresResponse {
	genres: GenresType[];
}

export interface GenresType {
	name: string;
	id: number;
}

export interface Content {
	id: number;
	title?: string; // Для фильмов
	name?: string; // Для сериалов
	poster_path?: string;
	release_date?: string; // Для фильмов
	first_air_date?: string; // Для сериалов
	vote_average?: number;
	media_type: 'movie' | 'tv'; // Указывает тип контента
	overview: string;
	backdrop_path: string;
	vote_count: number;
	genres: GenresType[];
	created_by?: [
		{
			id: number;
			name: string;
		}
	];
	tagline: string;
}

export interface ContentResponse {
	page: number;
	results: Content[];
	total_pages: number;
	total_results: number;
}

export interface MovieVideo {
	id: string;
	iso_639_1: string;
	iso_3166_1: string;
	key: string;
	name: string;
	official: boolean;
	published_at: string;
	site: 'YouTube';
	size: number;
	type: 'Trailer';
}

export interface MovieVideoResponse {
	results: MovieVideo[];
}

export interface Review {
	id: string | number;
	movieId: number;
	userId: string | null;
	userName: string;
	text: string;
	email: string;
}
