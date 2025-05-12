import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import LostFoundListPage from "./pages/LostFoundListPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ReportFormPage from "./pages/ReportFormPage";
import MyItemsPage from "./pages/MyItemsPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/login", element: <Login /> },
			{ path: "/register", element: <Register /> },
			{ path: "/", element: <Home /> },
			{ path: "/users", element: <UsersPage /> },
			{ path: "/items", element: <LostFoundListPage /> },
			{ path: "/items/:id", element: <ItemDetailPage /> },
			{ path: "/items/add", element: <ReportFormPage /> },
			{ path: "/user/items", element: <MyItemsPage /> },
		],
	},
]);

export default router;
