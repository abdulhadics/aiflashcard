import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import getStripe from '@/utils/get-stripe'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000', // Replace with your actual domain if not using localhost
        },
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const checkoutSession = await response.json()
      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      })

      if (error) {
        console.warn(error.message)
      }
    } catch (error) {
      console.error('Error handling checkout:', error)
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar position="static" sx={{ boxShadow: 'none', backgroundColor: '#1a1a1a' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button
                color="inherit"
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

        <Container maxWidth="lg">
          <Box sx={{ my: 8 }}>
            {children}
          </Box>
        </Container>

        <Box
          sx={{
            backgroundColor: '#1a1a1a',
            color: '#fff',
            textAlign: 'center',
            py: 2,
            position: 'relative',
            bottom: 0,
            width: '100%',
            mt: 'auto',
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Flashcard SaaS. All rights reserved.
          </Typography>
        </Box>
      </body>
    </html>
  )
}
