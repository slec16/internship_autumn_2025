import { Outlet, Link, useLocation } from "react-router"
import { UnorderedListOutlined, BarChartOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useTheme } from "@/shared/lib/theme"

const Layout = () => {

    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

    const isActive = (path: string) => {
        return location.pathname === path || (path === "/list" && location.pathname === "/")
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-color">
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-semibold text-xl text-gray-900 dark:text-white">
                            Модерация объявлений
                        </h1>
                        <div className="flex gap-4 items-center">
                            <nav className="flex gap-4">
                                <Link
                                    to="/list"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive("/list") || isActive("/")
                                            ? "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <UnorderedListOutlined
                                        className="w-5 h-5"
                                    />
                                    Объявления
                                </Link>
                                <Link
                                    to="/stats"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive("/stats")
                                            ? "bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <BarChartOutlined
                                        className="w-5 h-5"
                                    />
                                    Статистика
                                </Link>
                            </nav>
                            <Button
                                icon={ theme === 'light' ? <MoonOutlined /> : <SunOutlined /> }
                                shape="circle"
                                onClick={toggleTheme}
                                aria-label="Переключить тему"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout