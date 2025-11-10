import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import HeroPage from "./pages/HeroPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Footer from "./pages/Footer";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      flexDirection="column"
    >
      <Navbar />

      {/* ✅ Only show Hero & About on homepage */}
      {isHome && (
        <>
          <HeroPage />
          <AboutUs />
        </>
      )}

      {/* ✅ Routes */}
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* 🔒 Protect Create Page */}
          <Route
            path="/create"
            element={
              <>
                <SignedIn>
                  <CreatePage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </Box>

      <ContactPage />
      <Footer />
    </Box>
  );
}

export default App;
