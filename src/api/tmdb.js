const API_KEY = 'd53fdaa6878c434e7f928803dcfef4c8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const fetchPopularMoviesPage = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch movies from TMDB');
  return await response.json(); // Contains { results, page, total_pages }
};

// Optional: Keep this function for compatibility
export const fetchPopularMovies = async () => {
  const data = await fetchPopularMoviesPage(1);
  return data.results;
};

// Add other functions as needed
export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) throw new Error('Failed to fetch genres');
  return await response.json();
};
