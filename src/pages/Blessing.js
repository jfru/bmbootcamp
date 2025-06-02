import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { MAIN_URL } from '../utils/urls';

const Blessing = () => {
    const [start, setStart] = React.useState(false);
    useEffect(() => {
        axios.get(`${MAIN_URL}/blessing/`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("There was an error fetching the blessing data!", error);
        });
    }, []);
    return (
        <Container style={{ textAlign: 'center', justifyContent: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {start
                ? <></>
                : <>
                    <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
                        blessing before reading the torah
                    </Typography>
                    <Box>
                        <Button size={'large'} variant="contained" sx={{ marginRight: 2, textTransform: 'lowercase' }} onClick={() => alert('Blessing completed!')}>
                            let's go!
                        </Button>
                    </Box>
                </>
            }
            
        </Container>
    )
}

export default Blessing