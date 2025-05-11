import React, { useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  Box,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { fetchPopularMovies, fetchGenres } from '../api/tmdb';
import MovieCard from './MovieCard';

const MovieExplorer = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const years = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData.genres);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const newMovies = await fetchPopularMovies(page);
        if (newMovies.length === 0) setHasMore(false);

        const genreMap = genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const moviesWithGenres = newMovies.map((movie) => ({
          ...movie,
          genre_names: movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean) || [],
          genre_ids: movie.genre_ids || [],
        }));

        setMovies((prev) => [...prev, ...moviesWithGenres]);
      } catch (err) {
        console.error('Error loading movies:', err);
      } finally {
        setLoading(false);
      }
    };

    if (genres.length > 0) loadMovies();
  }, [page, genres]);

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchGenre = selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true;
    const matchYear = selectedYear ? movie.release_date?.slice(0, 4) === selectedYear : true;
    return matchGenre && matchYear;
  });

  return (
    <Box p={isSmallScreen}>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mb={3}>
        <MovieIcon fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Explore Movies
        </Typography>
      </Stack>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="genre-label">Filter by genre</InputLabel>
            <Select
              labelId="genre-label"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              label="Filter by genre"
            >
              <MenuItem value="">All</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="year-label">Filter by year</InputLabel>
            <Select
              labelId="year-label"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Filter by year"
            >
              <MenuItem value="">All</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {!loading && filteredMovies.length === 0 && (
        <Typography textAlign="center" mt={4} color="text.secondary">
          😢 No movies found with the selected filters.
        </Typography>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {!loading && hasMore && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLoadMore}
            sx={{ borderRadius: 5, px: 5, boxShadow: 3 }}
          >
            Load More
          </Button>
        </Box>
      )}

      {!hasMore && !loading && (
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
          🎉 You've reached the end!
        </Typography>
      )}
    </Box>
  );
};

export default MovieExplorer;
