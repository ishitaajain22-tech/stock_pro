let KiteConnect;
try {
    KiteConnect = require('kiteconnect').KiteConnect;
} catch (error) {
    console.log('KiteConnect not installed, using mock mode');
    KiteConnect = null;
}

class KiteConnectUtil {
    constructor() {
        this.apiKey = process.env.KITE_API_KEY;
        this.apiSecret = process.env.KITE_API_SECRET;
        this.userSessions = new Map();
        this.isKiteConnectAvailable = !!KiteConnect;
    }

    createKiteInstance() {
        if (!this.isKiteConnectAvailable) {
            throw new Error('KiteConnect SDK not available');
        }
        return new KiteConnect({
            api_key: this.apiKey,
            debug: false
        });
    }

    getLoginUrl() {
        try {
            if (!this.isKiteConnectAvailable) {
                return 'https://demo-login-url.com';
            }
            const kc = this.createKiteInstance();
            return kc.getLoginURL();
        } catch (error) {
            console.error('Error generating login URL:', error);
            return 'https://demo-login-url.com';
        }
    }

    async authenticateUser(requestToken, userId) {
        try {
            if (!this.isKiteConnectAvailable) {
                // Mock authentication for testing
                this.userSessions.set(userId.toString(), {
                    accessToken: 'mock_access_token',
                    publicToken: 'mock_public_token',
                    authenticatedAt: new Date(),
                    isMock: true
                });
                return {
                    success: true,
                    accessToken: 'mock_access_token',
                    userProfile: { user_id: 'mock_user' }
                };
            }

            const kc = this.createKiteInstance();
            const response = await kc.generateSession(requestToken, this.apiSecret);
            kc.setAccessToken(response.access_token);
            
            this.userSessions.set(userId.toString(), {
                kiteConnect: kc,
                accessToken: response.access_token,
                publicToken: response.public_token,
                authenticatedAt: new Date(),
                isMock: false
            });

            return {
                success: true,
                accessToken: response.access_token,
                userProfile: response
            };
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed: ' + error.message);
        }
    }

    async getUserHoldings(userId) {
        try {
            const session = this.userSessions.get(userId.toString());
            if (!session) {
                throw new Error('User not authenticated');
            }

            if (session.isMock || !this.isKiteConnectAvailable) {
                // Return mock holdings
                return [
                    {
                        tradingsymbol: "RELIANCE",
                        quantity: 10,
                        average_price: 2450.50,
                        last_price: 2485.75,
                        pnl: 352.50,
                        day_change_percentage: 1.44
                    },
                    {
                        tradingsymbol: "TCS",
                        quantity: 5,
                        average_price: 3180.00,
                        last_price: 3245.20,
                        pnl: 326.00,
                        day_change_percentage: 0.85
                    }
                ];
            }

            const kc = session.kiteConnect;
            return await kc.getHoldings();
        } catch (error) {
            console.error('Error fetching holdings:', error);
            throw new Error('Failed to fetch holdings: ' + error.message);
        }
    }

    async getUserPositions(userId) {
        try {
            const session = this.userSessions.get(userId.toString());
            if (!session) {
                throw new Error('User not authenticated');
            }

            if (session.isMock || !this.isKiteConnectAvailable) {
                return {
                    net: [
                        {
                            tradingsymbol: "INFY",
                            quantity: 15,
                            average_price: 1450.25,
                            last_price: 1465.80,
                            pnl: 233.25,
                            product: "CNC"
                        }
                    ],
                    day: []
                };
            }

            const kc = session.kiteConnect;
            return await kc.getPositions();
        } catch (error) {
            console.error('Error fetching positions:', error);
            throw new Error('Failed to fetch positions: ' + error.message);
        }
    }

    isUserAuthenticated(userId) {
        return this.userSessions.has(userId.toString());
    }

    removeUserSession(userId) {
        this.userSessions.delete(userId.toString());
    }

    getSessionInfo(userId) {
        return this.userSessions.get(userId.toString());
    }
}

module.exports = new KiteConnectUtil();