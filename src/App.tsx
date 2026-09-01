import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/HomePage";
import TemplateDetailPage from "./pages/TemplateDetailPage";
import FullInvitationPage from "./pages/FullInvitationPage";
import OrderPage from "./pages/OrderPage";
import TemplatePreviewPage from "./pages/TemplatePreviewPage";
import Invitation1Page from "./invitations/invitation1/Invitation1Page";
import Invitation2Page from "./invitations/invitation2/Invitation2Page";
import Invitation3Page from "./invitations/invitation3/Invitation3Page";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/pozivnice/:slug" element={<TemplateDetailPage />} />
        <Route path="/pozivnice/:slug/puna" element={<FullInvitationPage />} />
        <Route path="/poruci/:slug" element={<OrderPage />} />
        <Route path="/preview/:templateId" element={<TemplatePreviewPage />} />
        <Route path="/p/invitation-1" element={<Invitation1Page />} />
        <Route path="/p/invitation-2" element={<Invitation2Page />} />
        <Route path="/p/invitation-3" element={<Invitation3Page />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
