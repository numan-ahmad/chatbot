import React from "react";

import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ChatbotScreen from "./components/screens/ChatbotScreen";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatbotScreen />
      </ThemeProvider>
    </div>
  );
}

export default App;
