class ErrorHandler {
    static handleKiteError(error) {
        console.error('Kite API Error:', error);
        
        if (error.message.includes('TokenException')) {
            return 'Authentication token expired. Please login again.';
        }
        
        if (error.message.includes('NetworkException')) {
            return 'Network error. Please check your connection.';
        }
        
        if (error.message.includes('OrderException')) {
            return 'Order placement failed. Please check order parameters.';
        }
        
        return 'An error occurred while processing your request.';
    }
}

module.exports = ErrorHandler;