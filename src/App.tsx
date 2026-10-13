import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import MemoriesPage from "./pages/memories/MemoriesPage";

/** Scroll to hash targets after client-side navigation (e.g. /#pricing). */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace("#", "");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      <Routes>
        <Route path="/uspomene" element={<MemoriesPage />} />
        <Route path="*" element={<Navigate to="/uspomene" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
