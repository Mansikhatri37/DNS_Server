import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ViewDNSRecords from "./components/ViewDNSRecords";
import AddDNSRecord from "./components/AddDNSRecord";

function App() {
  // Theme toggle state
  const [darkMode, setDarkMode] = useState(false);

  // Light and Dark themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/view-records" element={<ViewDNSRecords />} />
            <Route path="/add-record" element={<AddDNSRecord />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
