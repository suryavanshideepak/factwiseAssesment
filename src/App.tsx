import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CelebrityList from "./Pages/CelebrityList";
import { Button, CssBaseline, ThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./components/Theme";

function App() {
  const [mode, setMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = mode ? darkTheme : lightTheme;
    document.body.style.setProperty(
      "--background-color",
      theme.palette.background.default
    );
    document.body.style.setProperty("--text-color", theme.palette.text.primary);
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={mode ? darkTheme : lightTheme}>
        <CssBaseline/>           
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CelebrityList />} />
            </Routes>
          </BrowserRouter>            
      </ThemeProvider>
    </>
  );
}

export default App;
