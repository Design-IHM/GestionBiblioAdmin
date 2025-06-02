import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ConfigProvider } from './components/ConfigProvider';
import { DEFAULT_ORGANIZATION } from './config/firebase';

const routes = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/dashboard",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
				<Dashboard />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/books",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="books" />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/users",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="users" />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/loans",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="loans" />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/returns",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="returns" />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/settings",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="settings" />
				</ConfigProvider>
		),
	},
	{
		path: "/dashboard/theme",
		element: (
			<ConfigProvider orgName={DEFAULT_ORGANIZATION}>
			<Dashboard initialSection="theme" />
				</ConfigProvider>
		),
	},
	{
		path: "*",
		element: <LandingPage />,
	},
]);

export default routes;