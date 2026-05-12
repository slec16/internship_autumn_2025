import { createContext, useContext } from "react"

export type Theme = "light" | "dark"

export interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

export const THEME_KEY = 'app_theme'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error('Theme error')
    }

    return context
}