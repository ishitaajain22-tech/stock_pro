const express = require('express');
let ZerodhaController;
let verifyUserForZerodha;

try {
    ZerodhaController = require('../utils/ZerodhaController');
    const { verifyUserForZerodha: authMiddleware } = require('../AuthController');
    verifyUserForZerodha = authMiddleware;
} catch (error) {
    console.error('Zerodha dependencies not found:', error);
    ZerodhaController = null;
    verifyUserForZerodha = (req, res, next) => next();
}

const router = express.Router();

// Safety middleware - if controllers not available, return error
router.use((req, res, next) => {
    if (!ZerodhaController) {
        return res.status(503).json({
            success: false,
            message: 'Zerodha service temporarily unavailable'
        });
    }
    next();
});

// Public route (no auth needed)
router.get('/login-url', ZerodhaController?.getLoginUrl || ((req, res) => {
    res.status(503).json({ success: false, message: 'Service unavailable' });
}));

// Protected routes
router.use(verifyUserForZerodha);

router.get('/auth/callback', ZerodhaController?.authenticate || ((req, res) => {
    res.status(503).json({ success: false, message: 'Service unavailable' });
}));

router.get('/auth/status', ZerodhaController?.getAuthStatus || ((req, res) => {
    res.json({ success: true, data: { isAuthenticated: false } });
}));

router.get('/holdings', ZerodhaController?.getHoldings || ((req, res) => {
    res.status(503).json({ success: false, message: 'Service unavailable' });
}));

router.get('/positions', ZerodhaController?.getPositions || ((req, res) => {
    res.status(503).json({ success: false, message: 'Service unavailable' });
}));

module.exports = router;