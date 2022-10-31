const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/apps', userRoutes);
router.use('/users', thoughtRoutes);

module.exports = router;