import { Box } from "@mui/material"

export const styleBox = {
    fontSize: '40px',
    fontWeight: 'bold',
    p: 5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const HomePage = () => {

    return (<>
        <Box component="section" sx={styleBox}>
            HOME
        </Box>
    </>)
}
export default HomePage;


