import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Pagination,
  Box,
  Chip,
  Paper,
  Fade,
  Grow,
  Slide,
  useTheme,
  useMediaQuery,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Badge,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  TextField,
  CardActions,
  InputBase,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Whatshot as WhatshotIcon,
  LocalFireDepartment as FireIcon
} from '@mui/icons-material';

// Add this at the top of the file, after imports
const categoriesData = [
  {
    id: 1,
    name: "Defense & Military",
    icon: "🛡️",
    articles: [
      {
        id: 1,
        title: "India's New Defense Strategy: A Comprehensive Overview",
        summary: "Analyzing India's evolving defense capabilities and strategic partnerships in the region",
        imageUrl: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "Defense Analyst",
        readTime: "5 min read",
        date: "2024-03-15",
        category: "Defense"
      },
      {
        id: 2,
        title: "Modernizing Indian Armed Forces",
        summary: "A look at the latest technological advancements in India's military infrastructure",
        imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "Military Expert",
        readTime: "4 min read",
        date: "2024-03-14",
        category: "Defense"
      },
      {
        id: 3,
        title: "India's Naval Power: A Rising Force",
        summary: "Examining the growth and modernization of India's naval capabilities",
        imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "Naval Analyst",
        readTime: "6 min read",
        date: "2024-03-13",
        category: "Defense"
      }
    ]
  },
  {
    id: 2,
    name: "Technology & Innovation",
    icon: "💻",
    articles: [
      {
        id: 1,
        title: "India's Space Program: Reaching New Heights",
        summary: "Exploring India's achievements in space technology and future missions",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "Space Correspondent",
        readTime: "7 min read",
        date: "2024-03-15",
        category: "Technology"
      },
      {
        id: 2,
        title: "Digital India: Transforming the Nation",
        summary: "How technology is reshaping India's future and empowering citizens",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "Tech Analyst",
        readTime: "5 min read",
        date: "2024-03-14",
        category: "Technology"
      },
      {
        id: 3,
        title: "AI Revolution in India",
        summary: "How artificial intelligence is transforming various sectors in India",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        author: "AI Researcher",
        readTime: "8 min read",
        date: "2024-03-13",
        category: "Technology"
      }
    ]
  }
];

// Breaking news ticker component
const BreakingNewsTicker = ({ news }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'error.main',
        color: 'white',
        py: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <motion.div
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          BREAKING NEWS: {news}
        </Typography>
      </motion.div>
    </Box>
  );
};

// Hero section component
const HeroSection = ({ featuredArticle }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', md: '600px' },
        mb: 4,
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={featuredArticle?.imageUrl || "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"}
        alt={featuredArticle?.title}
        sx={{
          height: '100%',
          filter: 'brightness(0.7)',
          transform: 'scale(1.1)',
          transition: 'all 0.5s ease-in-out',
          '&:hover': {
            transform: 'scale(1)',
            filter: 'brightness(0.8)',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, md: 4 },
          background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            {featuredArticle?.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mt: 2,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {featuredArticle?.summary}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={featuredArticle?.category?.name || "Featured"}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                fontSize: { xs: '0.8rem', md: '1rem' },
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                fontStyle: 'italic',
                fontSize: { xs: '0.8rem', md: '1rem' },
              }}
            >
              {new Date(featuredArticle?.publishedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

// Operation Sindoor Section
const OperationSindoorSection = () => {
  const articles = [
    {
      id: 1,
      title: "Operation Sindoor: 9 Strategy & History Lessons For Trolls",
      summary: "To social media warriors mourning what is clearly India's ongoing victory: When nations act not in anger, but with quiet resolve, they don't just settle scores. They reshape the world",
      author: "Ashwin Sanghi",
      imageUrl: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Defense"
    },
    {
      id: 2,
      title: "'Goli ka jawab gola se': How India executed a seamless Op Sindoor",
      summary: "What made this operation such a success? There were many factors. Robust air defence. Meticulous planning. Superior intelligence gathering.",
      author: "Diwakar Sidhartha",
      imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Military"
    },
    {
      id: 3,
      title: "BrahMos, Akash, D-4 anti-drone system: How made-in-India weapons avenged Pahalgam",
      summary: "It was a double victory. Not only did India, for the first time since 1971, hit targets deep in Pakistan beyond PoK, it did so with weapons developed in India.",
      author: "Jayanta Kalita",
      imageUrl: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Technology"
    },
    {
      id: 4,
      title: "Why an all-out war was never part of Operation Sindoor game plan",
      summary: "Operation Sindoor recalibrated deterrence, met tactical goals and set fresh rules of response. Escalating the conflict would have been detrimental to India's economic growth",
      author: "Satinder K Saini",
      imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Strategy"
    },
    {
      id: 5,
      title: "Pak's arsenal of Turkish drones, Chinese missiles no match for India's air defence wall",
      summary: "At the forefront of Pakistan's recent aerial aggression were Chinese-made PL-15 air-to-air missiles and Turkish-origin Byker Yiha kamikaze and Asisguard Songar drones",
      author: "Team TOI Plus",
      imageUrl: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Defense"
    },
    {
      id: 6,
      title: "Rattled In Rawalpindi",
      summary: "Op Sindoor puts a question mark on Pak army's three-part doctrine. Costs of low-intensity harassment have shot up. Neither today's Taliban nor Gulf Islamic states are reliable allies.",
      author: "Pranab Dhal Samanta",
      imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Analysis"
    }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 'bold',
          mb: 4,
          color: 'primary.main',
          textAlign: 'center',
        }}
      >
        Operation Sindoor Stories
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Grow in timeout={1000} style={{ transformOrigin: '0 0 0' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={article.imageUrl}
                  alt={article.title}
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontFamily: '"Roboto", sans-serif',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 1.5,
                    }}
                  >
                    {article.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={article.category}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic' }}
                    >
                      By {article.author}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Categories Section Component
const CategoriesSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCategoryExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            mb: 4,
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Categories
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {categoriesData.map((category, index) => (
          <Grid item xs={12} key={category.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleCategoryExpand(category.id)}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 'bold',
                      color: 'primary.main',
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      pb: 1,
                      flexGrow: 1,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'primary.main',
                      }}
                    >
                      {category.icon}
                    </Typography>
                    {expandedCategory === category.id ? (
                      <ExpandLessIcon color="primary" />
                    ) : (
                      <ExpandMoreIcon color="primary" />
                    )}
                  </Box>
                </Box>
                <Collapse in={expandedCategory === category.id}>
                  <Grid container spacing={3}>
                    {category.articles.map((article) => (
                      <Grid item xs={12} sm={6} md={4} key={article.id}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: 6,
                              },
                            }}
                            onClick={() => handleArticleClick(article)}
                          >
                            <CardMedia
                              component="img"
                              height="200"
                              image={article.imageUrl}
                              alt={article.title}
                              sx={{
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                },
                              }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                sx={{
                                  fontFamily: '"Playfair Display", serif',
                                  fontWeight: 'bold',
                                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {article.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 2,
                                  fontFamily: '"Roboto", sans-serif',
                                  fontSize: { xs: '0.875rem', sm: '1rem' },
                                  lineHeight: 1.5,
                                }}
                              >
                                {article.summary}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontStyle: 'italic' }}
                                >
                                  By {article.author}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="primary.main"
                                  sx={{ fontWeight: 'bold' }}
                                >
                                  {article.readTime}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(article.date).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Like">
                                  <IconButton size="small">
                                    <ThumbUpIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Comment">
                                  <IconButton size="small">
                                    <CommentIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Share">
                                  <IconButton size="small">
                                    <ShareIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              <Tooltip title="Bookmark">
                                <IconButton size="small">
                                  <BookmarkBorderIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      {selectedArticle && (
        <ArticleDialog
          article={selectedArticle}
          open={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </Box>
  );
};

// Add this new component for article details
const ArticleDialog = ({ article, open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments(prev => [...prev, {
        id: Date.now(),
        text: newComment,
        author: 'You',
        timestamp: new Date().toISOString()
      }]);
      setNewComment('');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
            {article.title}
          </Typography>
          <Box>
            <Tooltip title={isBookmarked ? "Remove Bookmark" : "Bookmark"}>
              <IconButton onClick={handleBookmark} color="primary">
                {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton color="primary">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            {article.summary}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Chip 
              icon={<PersonIcon />} 
              label={article.author} 
              variant="outlined" 
              color="primary"
            />
            <Chip 
              icon={<AccessTimeIcon />} 
              label={article.readTime} 
              variant="outlined"
            />
            <Chip 
              icon={<LocalOfferIcon />} 
              label={article.category} 
              variant="outlined"
              color="secondary"
            />
          </Box>
        </Box>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Comments" />
          <Tab label="Related Articles" />
          <Tab label="Author Bio" />
        </Tabs>
        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                size="small"
              />
              <Button 
                variant="contained" 
                onClick={handleComment}
                disabled={!newComment.trim()}
              >
                Post
              </Button>
            </Box>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.author[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.author}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {comment.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {new Date(comment.timestamp).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {activeTab === 1 && (
          <List>
            {article.relatedArticles?.map((related) => (
              <ListItem key={related.id} button>
                <ListItemAvatar>
                  <Avatar src={related.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={related.title}
                  secondary={related.summary}
                />
              </ListItem>
            ))}
          </List>
        )}
        {activeTab === 2 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={article.authorImage} 
                sx={{ width: 64, height: 64, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{article.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.authorBio}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1">
              {article.authorDescription}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// Add this new component for the search bar
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    // Use categoriesData instead of categories
    const results = categoriesData.flatMap(category => 
      category.articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSearchResults(results);
  };

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {isSearching && searchQuery && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 600,
            mt: 1,
            zIndex: 1000,
            maxHeight: 400,
            overflow: 'auto',
          }}
        >
          {searchResults.length > 0 ? (
            <List>
              {searchResults.map((result) => (
                <ListItem key={result.id} button>
                  <ListItemAvatar>
                    <Avatar src={result.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={result.title}
                    secondary={result.summary}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>No results found</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

// Add this new component for trending topics
const TrendingTopics = () => {
  const trendingTopics = [
    { id: 1, title: "Operation Sindoor", count: 156, icon: <FireIcon color="error" /> },
    { id: 2, title: "Defense Technology", count: 98, icon: <WhatshotIcon color="warning" /> },
    { id: 3, title: "Space Mission", count: 87, icon: <TrendingUpIcon color="success" /> },
    { id: 4, title: "Economic Growth", count: 76, icon: <TrendingUpIcon color="info" /> },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          color: 'primary.main',
        }}
      >
        <TrendingUpIcon /> Trending Topics
      </Typography>
      <Grid container spacing={2}>
        {trendingTopics.map((topic) => (
          <Grid item xs={12} sm={6} md={3} key={topic.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              {topic.icon}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {topic.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {topic.count} articles
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        const response = await axios.get(`http://localhost:5001/api/articles`, {
          params: {
            page,
            limit: 9,
            search,
            category,
          },
        });

        setArticles(response.data.articles);
        if (response.data.articles.length > 0) {
          setFeaturedArticle(response.data.articles[0]);
        }
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, location.search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You would typically update your theme here
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: isDarkMode ? 'background.default' : 'background.paper',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          py: 2
        }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Free Newspaper
          </Typography>
          <IconButton onClick={toggleDarkMode} color="primary">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
        <SearchBar />
        <TrendingTopics />
        <BreakingNewsTicker news="Operation Sindoor: India's Strategic Victory Reshapes Regional Dynamics" />
        <HeroSection featuredArticle={featuredArticle} />
        <OperationSindoorSection />
        <CategoriesSection />
      </Container>
    </Box>
  );
}

export default Home; 