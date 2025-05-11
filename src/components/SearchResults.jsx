import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import MovieCard from './MovieCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await searchMovies(query);
        setResults(res);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />
      ) : (
        <Grid container spacing={3}>
          {results.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchResults;
