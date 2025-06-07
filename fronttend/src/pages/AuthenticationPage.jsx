/*import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../utils/buttonStyles';
import { authUser } from '../redux/userHandle';
import styled from 'styled-components';
import Popup from '../components/Popup';
import { motion, AnimatePresence } from 'framer-motion';

const AuthenticationPage = ({ mode, role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [shopNameError, setShopNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (mode === "Register") {
            const name = event.target.userName.value;

            if (!name) {
                if (!name) setUserNameError(true);
                return;
            }

            if (role === "Seller") {
                const shopName = event.target.shopName.value;

                if (!shopName) {
                    if (!shopName) setShopNameError(true);
                    return;
                }

                const sellerFields = { name, email, password, role, shopName }
                dispatch(authUser(sellerFields, role, mode))
            }
            else {
                const customerFields = { name, email, password, role }
                dispatch(authUser(customerFields, role, mode))
            }
        }
        else if (mode === "Login") {
            const fields = { email, password }
            dispatch(authUser(fields, role, mode))
        }
        setLoader(true)
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'userName') setUserNameError(false);
        if (name === 'shopName') setShopNameError(false);
    };

    useEffect(() => {
        if (status === 'success' && currentRole !== null) {
            navigate('/');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setLoader(false)
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const floatingOrbVariants = {
        initial: {
            y: 0,
            x: 0,
            rotate: 0
        },
        animate: {
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <StyledTypography>
                                {role} {mode}
                            </StyledTypography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {role === "Seller" && mode === "Register" &&
                                <Typography variant="h7">
                                    Create your own shop by registering as a seller.
                                    <br />
                                    You will be able to add products and sell them.
                                </Typography>
                            }

                            {role === "Customer" && mode === "Register" &&
                                <Typography variant="h7">
                                    Register now to explore and buy products.
                                </Typography>
                            }

                            {mode === "Login" &&
                                <Typography variant="h7">
                                    Welcome back! Please enter your details
                                </Typography>
                            }
                        </motion.div>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {mode === "Register" &&
                                    <motion.div variants={itemVariants}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="userName"
                                            label="Enter your name"
                                            name="userName"
                                            autoComplete="name"
                                            autoFocus
                                            variant="standard"
                                            error={userNameError}
                                            helperText={userNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                        />
                                    </motion.div>
                                }
                                {mode === "Register" && role === "Seller" &&
                                    <motion.div variants={itemVariants}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="shopName"
                                            label="Create your shop name"
                                            name="shopName"
                                            autoComplete="off"
                                            variant="standard"
                                            error={shopNameError}
                                            helperText={shopNameError && 'Shop name is required'}
                                            onChange={handleInputChange}
                                        />
                                    </motion.div>
                                }
                                <motion.div variants={itemVariants}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Enter your email"
                                        name="email"
                                        autoComplete="email"
                                        variant="standard"
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={toggle ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        variant="standard"
                                        error={passwordError}
                                        helperText={passwordError && 'Password is required'}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setToggle(!toggle)}>
                                                        {toggle ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                    </Grid>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <LightPurpleButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {loader ? <CircularProgress size={24} color="inherit" /> : mode}
                                    </LightPurpleButton>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Grid container>
                                        <Grid>
                                            {mode === "Register" ?
                                                "Already have an account?"
                                                :
                                                "Don't have an account?"
                                            }
                                        </Grid>
                                        <Grid item sx={{ ml: 2 }}>
                                            {mode === "Register" ?
                                                <StyledLink to={`/${role}login`}>
                                                    Log in
                                                </StyledLink>
                                                :
                                                <StyledLink to={`/${role}register`}>
                                                    Sign up
                                                </StyledLink>
                                            }
                                        </Grid>
                                    </Grid>
                                </motion.div>
                            </motion.div>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    
                    <AnimatePresence>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: `${Math.random() * 100 + 50}px`,
                                    height: `${Math.random() * 100 + 50}px`,
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle, rgba(127,86,218,${Math.random() * 0.3 + 0.1}) 0%, rgba(127,86,218,0) 70%)`,
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                    filter: 'blur(20px)'
                                }}
                                variants={floatingOrbVariants}
                                initial="initial"
                                animate="animate"
                                custom={i}
                            />
                        ))}
                    </AnimatePresence>

                    
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            textAlign: 'center',
                            padding: '2rem',
                            maxWidth: '500px'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }}
                        >
                            <Typography variant="h3" sx={{ 
                                color: '#7f56da', 
                                fontWeight: 'bold',
                                mb: 2,
                                textShadow: '0 2px 10px rgba(127,86,218,0.3)'
                            }}>
                                {mode === "Login" ? 'Welcome Back!' : 'Join Us Today!'}
                            </Typography>
                        </motion.div>
                        <Typography variant="h6" sx={{ 
                            color: '#555',
                            mb: 4
                        }}>
                            {mode === "Login" 
                                ? 'Sign in to access your personalized dashboard' 
                                : 'Create an account to start your journey with us'}
                        </Typography>
                        
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(127,86,218,0.2) 0%, rgba(127,86,218,0) 70%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed rgba(127,86,218,0.3)',
                                    overflow: 'hidden'
                                }}
                            >
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'conic-gradient(from 0deg, rgba(127,86,218,0.1), rgba(127,86,218,0))',
                                        position: 'absolute'
                                    }}
                                />
                                <Typography variant="h5" sx={{ 
                                    color: '#7f56da',
                                    fontWeight: 'bold',
                                    zIndex: 1
                                }}>
                                    {mode === "Login" ? 'Sign In' : 'Register'}
                                </Typography>
                            </Box>
                        </motion.div>
                    </motion.div>
                </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}

export default AuthenticationPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #7f56da;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const StyledTypography = styled.h4`
    margin: 0;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    color: #2c2143;
    margin-bottom: 16px;
`;*/

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../utils/buttonStyles';
import { authUser } from '../redux/userHandle';
import styled from 'styled-components';
import Popup from '../components/Popup';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// Import your background images
import authBg from '../assets/auth-bg.jpg';
import floatingSphere from '../assets/floating-sphere.png';
import digitalParticles from '../assets/digital-particles.png';
import neonGrid from '../assets/neon-grid.png';

const AuthenticationPage = ({ mode, role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (mode === "Register") {
            const name = event.target.userName.value;
            if (role === "Seller") {
                const shopName = event.target.shopName.value;
                const sellerFields = { name, email, password, role, shopName }
                dispatch(authUser(sellerFields, role, mode))
            }
            else {
                const customerFields = { name, email, password, role }
                dispatch(authUser(customerFields, role, mode))
            }
        }
        else {
            const fields = { email, password }
            dispatch(authUser(fields, role, mode))
        }
        setLoader(true)
    };

    useEffect(() => {
        if (status === 'success' && currentRole !== null) {
            navigate('/');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setLoader(false)
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    // Floating particles animation
    const floatingParticles = [...Array(30)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        return (
            <motion.div
                key={i}
                style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `rgba(127, 86, 218, ${Math.random() * 0.5 + 0.1})`,
                    borderRadius: '50%',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0
                }}
                animate={{
                    y: [0, -100],
                    x: [0, (Math.random() - 0.5) * 100],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5
                }}
            />
        );
    });

    return (
        <Box sx={{
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${authBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {/* Floating particles background */}
            <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                {floatingParticles}
            </Box>

            {/* Digital grid overlay */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `url(${neonGrid})`,
                    backgroundSize: 'cover',
                    opacity: 0.1
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />

            <Grid container component="main" sx={{ height: '100vh', position: 'relative', zIndex: 2 }}>
                <CssBaseline />
                
                {/* Left Panel - Form */}
                <Grid item xs={12} sm={6} md={5}>
                    <motion.div
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(15, 15, 25, 0.7)'
                        }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '450px'
                            }}
                            component={motion.div}
                            style={{
                                rotateX,
                                rotateY
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                x.set(e.clientX - rect.left - rect.width / 2);
                                y.set(e.clientY - rect.top - rect.height / 2);
                            }}
                            onMouseLeave={() => {
                                x.set(0);
                                y.set(0);
                            }}
                        >
                            <motion.div
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Typography variant="h3" sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    textAlign: 'center',
                                    background: 'linear-gradient(90deg, #7f56da, #9f7aea)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    {mode === "Login" ? 'Welcome Back' : 'Create Account'}
                                </Typography>
                            </motion.div>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1 }}
                                >
                                    {mode === "Register" && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                        >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="userName"
                                                label="Your Name"
                                                name="userName"
                                                autoComplete="name"
                                                autoFocus
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'rgba(255,255,255,0.2)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#7f56da',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255,255,255,0.6)',
                                                    },
                                                }}
                                            />
                                        </motion.div>
                                    )}

                                    {mode === "Register" && role === "Seller" && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                        >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="shopName"
                                                label="Shop Name"
                                                name="shopName"
                                                autoComplete="off"
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'rgba(255,255,255,0.2)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#7f56da',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255,255,255,0.6)',
                                                    },
                                                }}
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255,255,255,0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#7f56da',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255,255,255,0.6)',
                                                },
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={toggle ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255,255,255,0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#7f56da',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255,255,255,0.6)',
                                                },
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton 
                                                            onClick={() => setToggle(!toggle)}
                                                            sx={{ color: 'rgba(255,255,255,0.6)' }}
                                                        >
                                                            {toggle ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    value="remember" 
                                                    sx={{
                                                        color: '#7f56da',
                                                        '&.Mui-checked': {
                                                            color: '#7f56da',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    Remember me
                                                </Typography>
                                            }
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <LightPurpleButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ 
                                                mt: 3, 
                                                mb: 2,
                                                height: '50px',
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                background: 'linear-gradient(45deg, #7f56da, #9f7aea)',
                                                boxShadow: '0 4px 15px rgba(127, 86, 218, 0.4)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 20px rgba(127, 86, 218, 0.6)',
                                                    background: 'linear-gradient(45deg, #7f56da, #9f7aea)',
                                                }
                                            }}
                                            whileHover={{ 
                                                scale: 1.02,
                                                transition: { duration: 0.3 }
                                            }}
                                            whileTap={{ 
                                                scale: 0.98,
                                                boxShadow: '0 2px 10px rgba(127, 86, 218, 0.4)'
                                            }}
                                        >
                                            {loader ? (
                                                <CircularProgress size={24} sx={{ color: 'white' }} />
                                            ) : (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {mode === "Login" ? 'SIGN IN' : 'SIGN UP'}
                                                </motion.span>
                                            )}
                                        </LightPurpleButton>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', display: 'inline' }}>
                                            {mode === "Register" ? 'Already have an account? ' : 'Don\'t have an account? '}
                                        </Typography>
                                        <StyledLink to={mode === "Register" ? `/${role}login` : `/${role}register`}>
                                            {mode === "Register" ? 'Sign in' : 'Sign up'}
                                        </StyledLink>
                                    </motion.div>
                                </motion.div>
                            </Box>
                        </Box>
                    </motion.div>
                </Grid>

                {/* Right Panel - Visuals */}
                <Grid item xs={false} sm={6} md={7} sx={{ position: 'relative' }}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Floating 3D sphere */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '500px',
                                height: '500px',
                                background: `url(${floatingSphere})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                filter: 'drop-shadow(0 0 30px rgba(127, 86, 218, 0.6))'
                            }}
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Digital particles */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: `url(${digitalParticles})`,
                                backgroundSize: 'cover',
                                opacity: 0.7
                            }}
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Welcome message */}
                        <motion.div
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                textAlign: 'center',
                                padding: '2rem',
                                maxWidth: '600px'
                            }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    repeatType: 'reverse'
                                }}
                            >
                                <Typography variant="h2" sx={{ 
                                    color: 'white', 
                                    fontWeight: 'bold',
                                    mb: 3,
                                    textShadow: '0 2px 10px rgba(127,86,218,0.8)'
                                }}>
                                    {mode === "Login" ? 'Ready To Continue?' : 'Start Your Journey'}
                                </Typography>
                            </motion.div>
                            <Typography variant="h5" sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                mb: 4
                            }}>
                                {mode === "Login" 
                                    ? 'Access your personalized dashboard and explore amazing features' 
                                    : 'Join our community and unlock exclusive benefits'}
                            </Typography>
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
}

export default AuthenticationPage;

const StyledLink = styled(Link)`
  color: #9f7aea;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  margin-left: 5px;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #7f56da, #9f7aea);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;