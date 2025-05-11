import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import TrendingMovies from "../components/TrendingMovies";
import { fetchPopularMovies } from "../api/tmdb";
import { Grid, Container, Typography, CircularProgress, Box } from "@mui/material";
import MovieExplorer from "../components/MovieExplorer";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies(); 
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    );

  return (
    <>
      <HeroSection movie={movies[0]} />
      <Container sx={{ mt: 4, ml: 15 }}>
        <Grid container spacing={4} direction="column">
          <Grid item sx={{ ml: -5 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Trending Now
            </Typography>
            <TrendingMovies movies={movies.slice(0, 5)} />
          </Grid>
          <Grid item>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Explore More
            </Typography>
            <MovieExplorer movies={movies.slice(5, 10)} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
