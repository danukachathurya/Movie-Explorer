import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Container,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const API_KEY = 'd53fdaa6878c434e7f928803dcfef4c8';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    };

    const fetchTrailer = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (trailer) setTrailerKey(trailer.key);
    };

    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
      setCast(data.cast.slice(0, 8)); // top 8 cast members
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchCast();
  }, [id]);

  const handlePlayTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    }
  };

  if (!movie) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={`${POSTER_BASE}${movie.poster_path}`}
          alt={movie.title}
          sx={{
            width: { xs: '100%', sm: 300 },
            borderRadius: 2,
            boxShadow: 5,
          }}
        />

        <Box>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {movie.title}
          </Typography>

          {movie.tagline && (
            <Typography variant="h6" fontStyle="italic" color="gray" gutterBottom>
              {movie.tagline}
            </Typography>
          )}

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {movie.genres?.map((genre) => (
              <Chip key={genre.id} label={genre.name} color="primary" />
            ))}
          </Stack>

          <Typography variant="body1" gutterBottom>
            <strong>Release:</strong> {movie.release_date} &nbsp; | &nbsp;
            <strong>Runtime:</strong> {movie.runtime} min
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Rating:</strong>{' '}
            <Chip
              label={movie.vote_average.toFixed(1)}
              color="warning"
              size="medium"
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            />
          </Typography>

          <Stack direction="row" spacing={2} mt={3}>
            {trailerKey && (
              <Button
                variant="contained"
                color="error"
                startIcon={<PlayArrowIcon />}
                onClick={handlePlayTrailer}
              >
                Play Trailer
              </Button>
            )}
            <Button variant="outlined" color="secondary" startIcon={<FavoriteIcon />}>
              Add to Favorites
            </Button>
          </Stack>

          <Typography variant="body1" mt={4} sx={{ maxWidth: '700px' }}>
            {movie.overview}
          </Typography>
        </Box>
      </Container>

      {/* Cast Section */}
      <Container sx={{ position: 'relative', zIndex: 1, mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
          Cast
        </Typography>
        <Grid container spacing={3}>
          {cast.map((actor) => (
            <Grid item key={actor.cast_id} xs={6} sm={3} md={2}>
              <Card sx={{ backgroundColor: '#111', color: 'white', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    actor.profile_path
                      ? `${PROFILE_BASE}${actor.profile_path}`
                      : 'https://via.placeholder.com/185x278?text=No+Image'
                  }
                  alt={actor.name}
                />
                <CardContent>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {actor.name}
                  </Typography>
                  <Typography variant="caption" color="gray" noWrap>
                    {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
