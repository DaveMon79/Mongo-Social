// Requiring exxpress and user and thought routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Using thought and user routes
router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;