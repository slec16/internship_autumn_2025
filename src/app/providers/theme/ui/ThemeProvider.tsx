import { type ReactNode, useEffect, useMemo, useState, useCallback } from "react"
import { ConfigProvider } from "antd"
import { type Theme, ThemeContext, THEME_KEY } from "@shared/lib/theme"
import { getThemeConfig } from "../lib/themeTokens"

interface ThemeProviderProps {
    children: ReactNode,
    defaultTheme: Theme
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, defaultTheme = 'light' } = props

    const [ theme, setTheme ] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem(THEME_KEY) as Theme
        if ( savedTheme ) return savedTheme

        if ( typeof window !== 'undefined' ) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if( prefersDark ) return 'dark'
        }

        return defaultTheme
    })

    // смена темы из приложения
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    //смена системной темы
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }, [])

    const contextValue = useMemo(() => ({
        theme,
        setTheme,
        toggleTheme
    }), [theme, toggleTheme])

    const antdThemeConfig = useMemo(() => getThemeConfig(theme), [theme])

    return(
        <ThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    )
}