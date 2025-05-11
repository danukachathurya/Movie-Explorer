import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MovieCard from './MovieCard';
import { fetchPopularMovies } from '../api/tmdb';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const CARD_WIDTH = 240;
  const VISIBLE_CARDS = 5;
  const [page, setPage] = useState(0); // Tracks which 5-card set is visible

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      console.log(data); // Log the data to inspect the structure
      setMovies(data);
    };
    loadMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / VISIBLE_CARDS);

  const slideToPage = (pageIndex) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: (CARD_WIDTH + 16) * VISIBLE_CARDS * pageIndex, // 16 = gap (theme spacing 2)
        behavior: 'smooth',
      });
      setPage(pageIndex);
    }
  };

  const handleSlideRight = () => {
    if (page < totalPages - 1) {
      slideToPage(page + 1);
    }
  };

  const handleSlideLeft = () => {
    if (page > 0) {
      slideToPage(page - 1);
    }
  };

  return (
    <Box px={4} mt={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Trending Now
      </Typography>

      <Box position="relative">
        {/* Left Button */}
        {page > 0 && (
          <IconButton
            onClick={handleSlideLeft}
            sx={{
              position: 'absolute',
              left: -30,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.8)',
                transform: 'scale(1.1)', // Optional: zoom effect on hover
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        <Box
          ref={scrollRef}
          display="flex"
          overflow="hidden"
          sx={{
            maxWidth: `${(CARD_WIDTH + 16) * VISIBLE_CARDS}px`, // Add spacing width
            scrollBehavior: 'smooth',
            gap: 2, // Theme spacing (8px * 2 = 16px)
          }}
        >
          {movies.map((movie) => (
            <Box
              key={movie.id}
              minWidth={`${CARD_WIDTH}px`}
              maxWidth={`${CARD_WIDTH}px`}
              flexShrink={0}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>

        {/* Right Button */}
        {page < totalPages - 1 && (
          <IconButton
            onClick={handleSlideRight}
            sx={{
              position: 'absolute',
              right: -30,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.8)',
                transform: 'scale(1.1)',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
