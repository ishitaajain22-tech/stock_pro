let KiteConnectUtil;
try {
    KiteConnectUtil = require('../utils/KiteConnectUtil');
} catch (error) {
    console.error('KiteConnectUtil not found:', error);
    KiteConnectUtil = null;
}

class ZerodhaController {
    
    static getLoginUrl(req, res) {
        try {
            if (!KiteConnectUtil) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Zerodha service not available' 
                });
            }

            const loginUrl = KiteConnectUtil.getLoginUrl();
            res.json({ 
                success: true,
                data: { loginUrl }, 
                message: 'Login URL generated' 
            });
        } catch (error) {
            console.error('Error in getLoginUrl:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error generating login URL' 
            });
        }
    }

    static async authenticate(req, res) {
        try {
            if (!KiteConnectUtil) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Zerodha service not available' 
                });
            }

            const { request_token } = req.query;
            const userId = req.user?._id || req.user?.id;

            if (!userId) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User not authenticated' 
                });
            }

            if (!request_token) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Request token is required' 
                });
            }

            const authResult = await KiteConnectUtil.authenticateUser(request_token, userId);
            res.json({ 
                success: true, 
                data: authResult, 
                message: 'Zerodha authentication successful' 
            });
        } catch (error) {
            console.error('Error in authenticate:', error);
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    static async getHoldings(req, res) {
        try {
            if (!KiteConnectUtil) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Zerodha service not available' 
                });
            }

            const userId = req.user?._id || req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User not authenticated' 
                });
            }

            if (!KiteConnectUtil.isUserAuthenticated(userId)) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authenticated with Zerodha. Please connect your account.' 
                });
            }

            const holdings = await KiteConnectUtil.getUserHoldings(userId);
            res.json({ 
                success: true, 
                data: holdings, 
                message: 'Holdings fetched successfully' 
            });
        } catch (error) {
            console.error('Error in getHoldings:', error);
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    static async getPositions(req, res) {
        try {
            if (!KiteConnectUtil) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Zerodha service not available' 
                });
            }

            const userId = req.user?._id || req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User not authenticated' 
                });
            }

            if (!KiteConnectUtil.isUserAuthenticated(userId)) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authenticated with Zerodha. Please connect your account.' 
                });
            }

            const positions = await KiteConnectUtil.getUserPositions(userId);
            res.json({ 
                success: true, 
                data: positions, 
                message: 'Positions fetched successfully' 
            });
        } catch (error) {
            console.error('Error in getPositions:', error);
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    static getAuthStatus(req, res) {
        try {
            if (!KiteConnectUtil) {
                return res.json({ 
                    success: true, 
                    data: { isAuthenticated: false, reason: 'Service unavailable' } 
                });
            }

            const userId = req.user?._id || req.user?.id;
            
            if (!userId) {
                return res.json({ 
                    success: true, 
                    data: { isAuthenticated: false, reason: 'User not logged in' } 
                });
            }

            const isAuthenticated = KiteConnectUtil.isUserAuthenticated(userId);
            const sessionInfo = KiteConnectUtil.getSessionInfo(userId);
            
            res.json({ 
                success: true, 
                data: { 
                    isAuthenticated,
                    authenticatedAt: sessionInfo?.authenticatedAt || null,
                    isMock: sessionInfo?.isMock || false
                }
            });
        } catch (error) {
            console.error('Error in getAuthStatus:', error);
            res.json({ 
                success: true, 
                data: { isAuthenticated: false, reason: 'Error checking status' } 
            });
        }
    }
}

module.exports = ZerodhaController;