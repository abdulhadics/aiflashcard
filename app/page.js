'use client'
import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Head from 'next/head'

export default function HomePage() {
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { origin: 'http://localhost:3000' },
      });
      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ boxShadow: 'none', backgroundColor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button
              color="inherit"
              component={Link}
              href="/sign-in"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                padding: '10px 20px',
                backgroundColor: '#f50057',
                borderRadius: '50px',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s',
                '&:hover': {
                  backgroundColor: '#ff4081',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/sign-up"
              sx={{
                ml: 2,
                color: '#fff',
                fontWeight: 'bold',
                padding: '10px 20px',
                backgroundColor: '#3f51b5',
                borderRadius: '50px',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s',
                '&:hover': {
                  backgroundColor: '#5c6bc0',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          my: 8,
          py: 5,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mr: 2,
            color: '#fff',
            fontWeight: 'bold',
            padding: '15px 30px',
            backgroundColor: '#f50057',
            borderRadius: '50px',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: '#ff4081',
              transform: 'translateY(-5px)',
            },
          }}
          component={Link}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 3,
            color: '#fff',
            fontWeight: 'bold',
            padding: '15px 30px',
            borderColor: '#fff',
            borderRadius: '50px',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#f50057',
              transform: 'translateY(-5px)',
            },
          }}
          component={Link}
          href="/learn-more"
        >
          Learn More
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.5)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body1">
                Description of the first feature.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.5)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body1">
                Description of the second feature.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.5)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body1">
                Description of the third feature.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                border: '2px solid #f50057',
                borderRadius: 2,
                padding: 4,
                backgroundColor: 'white',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.5)',
                },
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Pro Plan
              </Typography>
              <Typography variant="body1" gutterBottom>
                $9.99 / month
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '15px 30px',
                  backgroundColor: '#f50057',
                  borderRadius: '50px',
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    backgroundColor: '#ff4081',
                    transform: 'translateY(-5px)',
                  },
                }}
                onClick={handleSubmit}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
