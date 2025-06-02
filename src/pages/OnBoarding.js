import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const OnBoarding = () => {
    const [gender, setGender] = React.useState("");
    const navigate = useNavigate();
    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    }
    useEffect(() => {
        console.log(gender);
    }, [gender])
    return (
        <Container style={{ textAlign: 'center', justifyContent: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {gender
                ? <>
                    <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
                        Hey {gender}! <br /> Ready to learn your {gender === 'boy' ? "bar" : "bat"} mitzvah?
                    </Typography>
                    <Box>
                        <Button size={'large'} variant="contained" sx={{ marginRight: 2, textTransform: 'lowercase' }} onClick={() => navigate('/welcome')}>
                            heck yeah!!
                        </Button>
                    </Box>
                </>
                : <>
                    <Typography variant="h2" component="h1" gutterBottom fontWeight={600}>
                        I am a...
                    </Typography>
                    <Box>
                        <Button size={'large'} variant="contained" sx={{ marginRight: 2, textTransform: 'lowercase' }} onClick={() => handleGenderChange("boy")}>
                            Boy
                        </Button>
                        <Button size={'large'} variant="contained" sx={{textTransform: 'lowercase'}} onClick={() => handleGenderChange("girl")}>
                            Girl
                        </Button>
                    </Box>
                </>
            }
            
        </Container>
    )
}

export default OnBoarding