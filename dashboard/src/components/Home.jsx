import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("🏁 Home mounted");

    const queryParams = new URLSearchParams(window.location.search);
    const userString = queryParams.get("user");

    if (userString) {
      console.log("✅ Got user from URL");

      const userObj = JSON.parse(decodeURIComponent(userString));
      setUser(userObj);

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(userObj));

      // Clean the URL (don't reload!)
      window.history.replaceState({}, document.title, "/");
    } else {
      console.log("🟡 No user in URL, checking localStorage...");

      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        console.log("✅ Got user from localStorage");
        setUser(JSON.parse(savedUser));
      } else {
        console.log("❌ No user found, redirecting to login...");
        window.location.href = "http://localhost:5173/login";
      }
    }
  }, []);


  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <TopBar user={user} />
      <Dashboard user={user} />
    </>
  );
};

export default Home;
