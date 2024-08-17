import React, { useState } from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button, Snackbar } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleError = (error) => {
    setError(error.message || 'An unexpected error occurred.');
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              <Typography color="inherit">Sign Up</Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn onError={handleError} />
      </Box>

      {error && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={error}
        />
      )}
    </Container>
  );
}
