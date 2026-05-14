import { type ThemeConfig } from "antd"
import { theme as antdTheme } from 'antd'
import { type Theme } from "@shared/lib/theme"


export const getThemeTokens = (themeId: string): ThemeConfig['token'] => {
  switch (themeId) {
    // ========== Тёмные варианты ==========
    case 'dark-blue':
      return {
        colorPrimary: '#177ddc',
        colorSuccess: '#49aa19',
        colorWarning: '#d89614',
        colorError: '#a61d24',
        colorInfo: '#177ddc',

        colorBgContainer: '#0f172a',
        colorBgElevated: '#1f1f1f',
        colorBgLayout: '#000000',

        colorText: '#e8e8e8',
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

        colorBorder: '#434343',
        colorBorderSecondary: '#303030',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',

        borderRadius: 6,
      };

    // ========== Светлые варианты ==========
    case 'light-blue':
      return {
        colorPrimary: '#1677ff',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1677ff',

        colorBgContainer: '#f0f5ff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#e6f4ff',

        colorText: '#141414',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',

        colorBorder: '#91caff',
        colorBorderSecondary: '#bae0ff',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

        borderRadius: 6,
      };

  }
};

export const getThemeConfig = (theme: Theme): ThemeConfig => {
  return {
    algorithm:
      theme === 'dark'
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
    token: getThemeTokens(theme === 'dark' ? 'dark-blue' : 'light-blue')

  }
}