import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import sparkles from '../assets/images/sparkles.png'
import scroll from '../assets/images/scroll.png'
import { useNavigate } from 'react-router'

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <Container style={{ textAlign: 'center', justifyContent: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
                what do you want to learn?
            </Typography>
            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={4} sx={{cursor: 'pointer'}} onClick={() => navigate('/blessig')}>
                    <Typography variant="h4" component="h2">
                        blessing
                    </Typography>
                    <img src={sparkles} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{cursor: 'pointer'}}>
                    <Typography variant="h4" component="h2">
                        reading
                    </Typography>
                    <img src={scroll} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Welcome