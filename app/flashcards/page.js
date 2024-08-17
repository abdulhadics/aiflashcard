'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Adjust based on your auth provider
import { db } from 'C:\\flashcard-saas\\firebase.js'; // Adjust the import path accordingly
import { collection, doc, getDocs } from 'firebase/firestore';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

export default function Flashcard() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;

      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }

    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, 'users'), user.id), search);
      const docs = await getDocs(colRef);
      const flashcardSet = [];
      docs.forEach((doc) => {
        flashcardSet.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcardSet);
    }

    if (search) {
      getFlashcard();
    } else {
      getFlashcards();
    }
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card sx={{ perspective: '1000px' }}>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: flipped[flashcard.id]
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                    }}
                  >
                    <Box
                      sx={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant="h5" component="div">
                        {flashcard.front}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant="h5" component="div">
                        {flashcard.back}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
