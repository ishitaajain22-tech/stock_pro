import React, { useState, useEffect } from "react";
import axios from "axios";
import VerticalGraph from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [dataSource, setDataSource] = useState("mock"); // Default to safe mock data
  const [loading, setLoading] = useState(false);
  const [isZerodhaAuthenticated, setIsZerodhaAuthenticated] = useState(false);
  const [zerodhaError, setZerodhaError] = useState(null);

  // Configure axios to send cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchHoldings(); // Always start with mock data (safe)
  }, []);

  useEffect(() => {
    if (dataSource === "live") {
      checkZerodhaAuth();
    }
  }, [dataSource]);

  const checkZerodhaAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/zerodha/auth/status");
      if (res.data.success) {
        setIsZerodhaAuthenticated(res.data.data.isAuthenticated);
        setZerodhaError(null);
      }
    } catch (error) {
      console.log('Zerodha auth check failed (normal if not set up):', error.message);
      setIsZerodhaAuthenticated(false);
      setZerodhaError(error.response?.data?.message || 'Service not available');
    }
  };

  const fetchHoldings = async () => {
    setLoading(true);
    try {
      let res;
      
      if (dataSource === "live" && isZerodhaAuthenticated) {
        try {
          // Try to fetch live data
          res = await axios.get("http://localhost:3001/api/zerodha/holdings");
          
          if (res.data.success) {
            // Transform Zerodha data to your format
            const transformedData = res.data.data.map(holding => ({
              name: holding.tradingsymbol,
              qty: holding.quantity,
              avg: holding.average_price,
              price: holding.last_price,
              net: `${((holding.last_price - holding.average_price) / holding.average_price * 100).toFixed(2)}%`,
              day: `${(holding.day_change_percentage || 0).toFixed(2)}%`,
              isLoss: holding.pnl < 0
            }));
            
            setAllHoldings(transformedData);
            setZerodhaError(null);
          } else {
            throw new Error(res.data.message);
          }
        } catch (liveError) {
          console.log('Live data failed, falling back to mock:', liveError.message);
          setZerodhaError(liveError.response?.data?.message || liveError.message);
          // Fallback to mock data
          setDataSource("mock");
          res = await axios.get("http://localhost:3001/allHoldings");
          setAllHoldings(res.data);
        }
      } else {
        // Fetch your existing mock data (100% safe)
        res = await axios.get("http://localhost:3001/allHoldings");
        setAllHoldings(res.data);
        setZerodhaError(null);
      }
    } catch (error) {
      console.error("Error fetching holdings:", error);
      setZerodhaError(error.message);
      // Ultimate fallback - empty array (won't crash)
      setAllHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleZerodhaLogin = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/zerodha/login-url");
      if (res.data.success) {
        window.open(res.data.data.loginUrl, '_blank');
      }
    } catch (error) {
      console.error("Error getting login URL:", error);
      setZerodhaError('Cannot connect to Zerodha service');
    }
  };

  const switchDataSource = async (source) => {
    setDataSource(source);
    if (source === "live") {
      await checkZerodhaAuth();
    }
    await fetchHoldings();
  };

  // Your existing calculations (unchanged)
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + (stock.avg || 0) * (stock.qty || 0),
    0
  );
  const totalCurrentValue = allHoldings.reduce(
    (sum, stock) => sum + (stock.price || 0) * (stock.qty || 0),
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const percent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isProfit = totalPnL >= 0;

  const labels = allHoldings.map((stock) => stock.name || 'Unknown');
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 className="title">Holdings ({allHoldings.length})</h3>
        
        <div>
          <button 
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              border: '1px solid #ddd',
              background: dataSource === "mock" ? '#28a745' : '#f8f9fa',
              color: dataSource === "mock" ? 'white' : 'black',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onClick={() => switchDataSource("mock")}
          >
            Mock Data ✅
          </button>
          
          <button 
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              border: '1px solid #ddd',
              background: dataSource === "live" ? '#007bff' : '#f8f9fa',
              color: dataSource === "live" ? 'white' : 'black',
              cursor: 'pointer',
              borderRadius: '4px',
              opacity: isZerodhaAuthenticated || dataSource === "live" ? 1 : 0.7
            }}
            onClick={() => switchDataSource("live")}
          >
            Live Data {isZerodhaAuthenticated ? '🟢' : '🔴'}
          </button>
          
          {dataSource === "live" && !isZerodhaAuthenticated && (
            <button 
              style={{
                margin: '0 5px',
                padding: '8px 16px',
                border: 'none',
                background: '#ff6d00',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
              onClick={handleZerodhaLogin}
            >
              Connect Zerodha
            </button>
          )}
        </div>
      </div>

      {zerodhaError && dataSource === "live" && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #ffeaa7'
        }}>
          ⚠️ {zerodhaError} - Showing mock data instead
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          🔄 Loading holdings...
        </div>
      )}

      {/* Your existing table code - UNCHANGED */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const pnl = curValue - (stock.avg || 0) * (stock.qty || 0);
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name || 'Unknown'}</td>
                  <td>{stock.qty || 0}</td>
                  <td>₹{(stock.avg || 0).toFixed(2)}</td>
                  <td>₹{(stock.price || 0).toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={profClass}>₹{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || '0%'}</td>
                  <td className={dayClass}>{stock.day || '0%'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Your existing summary - UNCHANGED */}
      <div className="row">
        <div className="col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{totalCurrentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={isProfit ? "profit" : "loss"}>
            ₹{totalPnL.toFixed(2)} ({percent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;