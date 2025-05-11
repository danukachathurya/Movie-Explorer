import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
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
    <Card
      onClick={handleClick}
      sx={{
        width: 240,
        borderRadius: 2,
        boxShadow: 4,
        position: 'relative',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={posterUrl}
        alt={movie.title}
        sx={{ height: 360, objectFit: 'cover' }}
      />
      <CardContent sx={{ paddingBottom: '16px !important' }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {movie.title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
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
        sx={{ position: 'absolute', bottom: 80, left: 8 }}
      />
    </Card>
  );
}