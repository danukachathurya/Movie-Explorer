import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
  Box,
} from '@mui/material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center' }}>
        Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            You don't have any favorite movies yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                onClick={() => handleClick(movie.id)} // Pass movie.id here
                sx={{
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="350"
                  image={`${POSTER_BASE}${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {movie.title}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Remove from favorites" arrow>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeFromFavorites(movie.id)}
                      sx={{
                        textTransform: 'none',
                        padding: '8px 16px',
                        fontWeight: 'bold',
                        borderRadius: '20px',
                      }}
                    >
                      Remove
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
