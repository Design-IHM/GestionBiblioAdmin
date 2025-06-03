import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Dashboard from "./components/layout/Dashboard.tsx";

// Dashboard Components
import Overview from './pages/Overview.tsx';
import Books from './pages/Books.tsx';
import Users from './pages/Users.tsx';
import Loans from './pages/Loans.tsx';
import Returns from './pages/Returns.tsx';
import OrgConfiguration from "./components/theme/OrgConfiguration.tsx";
import ThemePreview from "./components/theme/ThemePreview.tsx";
import UnderDevelopment from './pages/UnderDevelopment.tsx';


const routes = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		children: [
			{
				index: true, // Default dashboard page
				element: <Overview />,
			},
			{
				path: "books",
				element: <Books />,
			},
			{
				path: "users",
				element: <Users />,
			},
			{
				path: "loans",
				element: <Loans />,
			},
			{
				path: "returns",
				element: <Returns />,
			},
			{
				path: "settings",
				element: <OrgConfiguration />,
			},
			{
				path: "theme",
				element: <ThemePreview />,
			},
			{
				path: "*",
				element: <UnderDevelopment sectionName="Requested" />,
			}
		]
	},
	{
		path: "*",
		element: <Landing />,
	},
]);

export default routes;