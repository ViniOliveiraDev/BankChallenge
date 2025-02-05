import './globals.css'
import {ThemeProvider} from "@/hooks/theme-provider.tsx";
import {AppRouter} from "@/routes/app-router.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AppRouter/>
        </ThemeProvider>
    )
}

export default App
