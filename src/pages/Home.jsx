import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import TrendingMovies from "../components/TrendingMovies";
import { fetchPopularMovies } from "../api/tmdb";
import { Grid, Container, Typography } from "@mui/material";
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
      <Typography sx={{ textAlign: "center", mt: 4 }}>Loading...</Typography>
    );

  return (
    <>
      <HeroSection movie={movies[0]} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4} direction="column">
          <Grid item sx={{ ml: -10 }}>
            <TrendingMovies movies={movies.slice(0, 5)} />
          </Grid>
          <Grid>
            <MovieExplorer movies={movies.slice(0, 5)} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
