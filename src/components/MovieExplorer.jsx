// src/components/MovieExplorer.jsx

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
  Button
} from '@mui/material';
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

  const years = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData.genres); // ✅ FIXED
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

        const moviesWithGenres = newMovies.map(movie => ({
          ...movie,
          genre_names: movie.genre_ids.map(id => genreMap[id]).filter(Boolean)
        }));

        setMovies(prev => [...prev, ...moviesWithGenres]);
      } catch (err) {
        console.error('Error loading movies:', err);
      } finally {
        setLoading(false);
      }
    };

    if (genres.length > 0) loadMovies(); // Prevents running before genres are fetched
  }, [page, genres]);

  const handleLoadMore = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  const filteredMovies = movies.filter(movie => {
    const matchGenre = selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true;
    const matchYear = selectedYear ? movie.release_date?.startsWith(selectedYear) : true;
    return matchGenre && matchYear;
  });

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Explore Movies</Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Filter by genre"
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Filter by year"
          >
            <MenuItem value="">All</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress sx={{ display: 'block', m: 5, mx: 'auto' }} />}

      {!loading && hasMore && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}

      {!hasMore && !loading && (
        <Typography sx={{ mt: 4, textAlign: 'center' }} color="text.secondary">
          No more movies to load.
        </Typography>
      )}
    </Box>
  );
};

export default MovieExplorer;
