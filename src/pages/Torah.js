import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import Phrase from './Phrase';

const Torah = () => {
    const [start, setStart] = React.useState(false);
    return (
        <Container style={{ textAlign: 'center', justifyContent: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {start
                ? <Phrase />
                : <>
                    <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
                        Listen to the Phrase
                    </Typography>
                    <Box>
                        <Button size={'large'} variant="contained" sx={{ marginRight: 2, textTransform: 'lowercase' }} onClick={() => setStart(true)}>
                            ok!
                        </Button>
                    </Box>
                </>
            }
            
        </Container>
    )
}

export default Torah