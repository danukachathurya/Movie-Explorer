import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  CardActionArea,
  Box,
  Tooltip,
  Chip,
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
        const fetches = [];
        for (let page = 2; page <= totalPages; page++) {
          fetches.push(fetchPopularMoviesPage(page));
        }

        const remainingPages = await Promise.all(fetches);
        for (const pageData of remainingPages) {
          allMovies = allMovies.concat(pageData.results);
        }

        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values());
        setMovies(uniqueMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMovies();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Popular Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <Tooltip title={movie.title} arrow>
                  <CardMedia
                    component="img"
                    image={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                </Tooltip>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
                    {movie.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={`⭐ ${movie.vote_average.toFixed(1)}`}
                      size="small"
                      color="primary"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {movie.release_date?.slice(0, 4)}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieGrid;
