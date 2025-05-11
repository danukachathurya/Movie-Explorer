import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Tooltip,
  Grow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  const genre = movie.genres?.[0]?.name || movie.genre_names?.[0] || 'Genre';

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Grow in>
      <Card
        onClick={handleClick}
        sx={{
          width: 240,
          borderRadius: 3,
          boxShadow: 5,
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 8,
          },
        }}
      >
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          sx={{
            height: 360,
            objectFit: 'cover',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent sx={{ pb: '16px !important' }}>
          <Tooltip title={movie.title} arrow>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              noWrap
              sx={{ maxWidth: '100%' }}
            >
              {movie.title}
            </Typography>
          </Tooltip>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Chip label={genre} color="primary" size="small" />
            <Typography variant="body2" color="text.secondary">
              {year}
            </Typography>
          </Box>
        </CardContent>
        <Chip
          label={rating}
          color="warning"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontWeight: 'bold',
          }}
        />
      </Card>
    </Grow>
  );
}
