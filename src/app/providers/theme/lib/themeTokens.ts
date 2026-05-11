import { type ThemeConfig } from "antd"
import { theme as antdTheme } from 'antd'
import { type Theme } from "@shared/lib/theme"

// Возможные идентификаторы тем — теперь это не просто 'dark'/'light', а осмысленные названия
export type ThemeId =
  | 'dark-orange'   // тёмная с тёплым оранжевым акцентом (оригинал)
  | 'dark-blue'     // тёмная с холодным синим
  | 'dark-forest'   // тёмная с зелёным оттенком
  | 'light-blue'    // светлая с голубым (оригинал)
  | 'light-lavender'// светлая с фиолетовым
  | 'light-mint';   // светлая с мятным

// Вспомогательная функция: по идентификатору темы возвращает токены Ant Design
export const getThemeTokens = (themeId: ThemeId): ThemeConfig['token'] => {
  switch (themeId) {
    // ========== Тёмные варианты ==========
    case 'dark-orange':
      return {
        colorPrimary: '#fa8c16',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#fa8c16',

        colorBgContainer: '#1f1408',
        colorBgElevated: '#26180a',
        colorBgLayout: '#120a04',

        colorText: '#ffffff',
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

        colorBorder: '#8c5a1a',
        colorBorderSecondary: '#593716',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.6), 0 9px 28px 8px rgba(0, 0, 0, 0.4)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.6), 0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.4)',

        borderRadius: 6,
      };

    case 'dark-blue':
      return {
        colorPrimary: '#177ddc',
        colorSuccess: '#49aa19',
        colorWarning: '#d89614',
        colorError: '#a61d24',
        colorInfo: '#177ddc',

        colorBgContainer: '#141414',
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

    case 'dark-forest':
      return {
        colorPrimary: '#49aa19',
        colorSuccess: '#49aa19',
        colorWarning: '#d89614',
        colorError: '#a61d24',
        colorInfo: '#49aa19',

        colorBgContainer: '#0d2114',
        colorBgElevated: '#13281b',
        colorBgLayout: '#07140c',

        colorText: '#e8f5e9',
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

        colorBorder: '#2c5a32',
        colorBorderSecondary: '#1b3a1f',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.4), 0 3px 6px -4px rgba(0, 0, 0, 0.5), 0 9px 28px 8px rgba(0, 0, 0, 0.3)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.5), 0 6px 16px 0 rgba(0, 0, 0, 0.4), 0 9px 28px 8px rgba(0, 0, 0, 0.3)',

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

    case 'light-lavender':
      return {
        colorPrimary: '#722ed1',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#722ed1',

        colorBgContainer: '#f9f0ff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#f3e8ff',

        colorText: '#141414',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',

        colorBorder: '#d3adf7',
        colorBorderSecondary: '#efdbff',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

        borderRadius: 8, // чуть скруглённее для мягкости
      };

    case 'light-mint':
      return {
        colorPrimary: '#13c2c2',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#13c2c2',

        colorBgContainer: '#e6fffb',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#d9f7ef',

        colorText: '#141414',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',

        colorBorder: '#87e8de',
        colorBorderSecondary: '#b5f5ec',

        boxShadow:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary:
          '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

        borderRadius: 6,
      };

    default:
      // fallback на светлую голубую
      return getThemeTokens('dark-orange')
  }
};

//   | 'dark-orange'   // тёмная с тёплым оранжевым акцентом (оригинал)
//   | 'dark-blue'     // тёмная с холодным синим
//   | 'dark-forest'   // тёмная с зелёным оттенком
//   | 'light-blue'    // светлая с голубым (оригинал)
//   | 'light-lavender'// светлая с фиолетовым
//   | 'light-mint';   // светлая с мятным


// export const getThemeConfig = (themeId: ThemeId): ThemeConfig => {
//   const isDark = themeId.startsWith('dark-');
//   return {
//     algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
//     // token: getThemeTokens(themeId),
//   };
// };

export const getThemeConfig = (theme: Theme): ThemeConfig => {
    return {
        algorithm:
            theme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
        // token: getThemeTokens(theme)

    }
}