import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';
import axios from 'axios';

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement like functionality
  };

  const handleSave = () => {
    setSaved(!saved);
    // TODO: Implement save functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container>
        <Typography>Article not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            label={article.category.name}
            size="small"
            sx={{ mr: 1 }}
            onClick={() => navigate(`/category/${article.category.slug}`)}
          />
          <Typography variant="body2" color="text.secondary">
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', mb: 4 }}>
          <img
            src={article.imageUrl || 'https://source.unsplash.com/random'}
            alt={article.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          {article.summary}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" paragraph>
          {article.content}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton onClick={handleLike} color="primary">
                {liked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleSave} color="primary">
                {saved ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleShare} color="primary">
                <Share />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" color="text.secondary">
                {article.views} views
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {article.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onClick={() => navigate(`/?search=${tag}`)}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Article; 