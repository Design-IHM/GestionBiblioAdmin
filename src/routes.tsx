import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Dashboard from './components/Dashboard';

const routes = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/dashboard",
		element: (
			<Dashboard />
		),
	},
	{
		path: "/dashboard/books",
		element: <Dashboard initialSection="books" />,
	},
	{
		path: "/dashboard/users",
		element: <Dashboard initialSection="users" />,
	},
	{
		path: "/dashboard/loans",
		element: <Dashboard initialSection="loans" />,
	},
	{
		path: "/dashboard/returns",
		element: <Dashboard initialSection="returns" />,
	},
	{
		path: "/dashboard/settings",
		element: <Dashboard initialSection="settings" />,
	},
	{
		path: "/dashboard/theme",
		element: <Dashboard initialSection="theme" />,
	},
	{
		path: "*",
		element: <LandingPage />,
	},
]);

export default routes;