// App.tsx
import Home from "./screens/home/page";
import { ThemeProvider } from "./theme";

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
