import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";

const HeroSection = ({ movie }) => {
  if (!movie) return null;

  const {
    title,
    release_date,
    vote_average,
    genres = [],
    overview,
    backdrop_path,
    runtime,
  } = movie;

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";
  const genreNames = genres.map((g) => g.name).join(", ");
  const bgImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <Box
      sx={{
        position: "relative",
        height: "90vh",
        color: "white",
        display: "flex",
        alignItems: "center",
        px: 10,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0))",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: 600 }}>
        <Chip label="Trending" color="error" sx={{ mb: 2 }} />

        <Typography variant="h2" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, fontSize: 14, mb: 2 }}>
          <Typography>{year}</Typography>
          <Chip
            label={vote_average?.toFixed(1)}
            sx={{ backgroundColor: "#facc15", color: "black", height: 24 }}
          />
          <Typography>{genreNames}</Typography>
          <Typography>{runtime} min</Typography>
        </Box>

        <Typography variant="body1" color="gray.300" mb={3}>
          {overview}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary">
            Watch Trailer
          </Button>
          <Button variant="outlined" color="inherit" sx={{ borderColor: "white" }}>
            Add to Favorites
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
