import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
} from '@mui/material';
import { fetchPopularMoviesPage, TMDB_IMAGE_BASE } from '../api/tmdb';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const firstPageData = await fetchPopularMoviesPage(1);
        const totalPages = firstPageData.total_pages;

        let allMovies = [...firstPageData.results];

        // Fetch remaining pages in parallel
        const fetches = [];
        for (let page = 2; page <= totalPages; page++) {
          fetches.push(fetchPopularMoviesPage(page));
        }

        const remainingPages = await Promise.all(fetches);
        for (const pageData of remainingPages) {
          allMovies = allMovies.concat(pageData.results);
        }

        // Remove duplicates by movie ID
        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values());

        setMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMovies();
  }, []); // No missing dependency

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  }

  return (
    <Grid container spacing={3} padding={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardActionArea sx={{ height: '100%', cursor: 'pointer' }}>
              <CardMedia
                component="img"
                image={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  height: 300,
                  objectFit: 'cover',
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
