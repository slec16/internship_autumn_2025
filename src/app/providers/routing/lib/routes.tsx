import { createBrowserRouter } from "react-router"
import ItemDetailsPage from "@/pages/item"
import ListPage from "@/pages/list"
import StatsPage from "@/pages/stats"
import Layout from "@/widgets/layout"

// TODO: error boundary
const NotFoundError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-400">404</h1>
      <p className="text-xl text-gray-600 mt-2">Страница не найдена</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Вернуться на главную
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <NotFoundError />,
        children: [
            { index: true, path: "/", element: <ListPage />, },
            { path: "/list", element: <ListPage />, },
            { path: "/item/:id", element: <ItemDetailsPage />, },
            { path: "/stats", element: <StatsPage />, }
        ]
    }
])