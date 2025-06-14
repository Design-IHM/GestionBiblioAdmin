import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Dashboard from "./components/layout/Dashboard.tsx";

// Dashboard Components
import Overview from './pages/Overview.tsx';
import Books from './pages/Books.tsx';
import Users from './pages/Users.tsx';
import Loans from './pages/Loans.tsx';
import OrgConfiguration from "./components/theme/OrgConfiguration.tsx";
import UnderDevelopment from './pages/UnderDevelopment.tsx';
import DefaultLayout from "./components/layout/DefaultLayout.tsx";
import Reservations from './pages/Returns.tsx';
import Archives from './pages/Archives.tsx';



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
				element: <DefaultLayout />,
				children: [
					{
						index: true, // Default dashboard page
						element: <Books />,
					},
					{
						path: ":departement", // Route for viewing a specific book
						element: <DefaultLayout />,
						children: [
							{
								index: true, // Default dashboard page
								element: <UnderDevelopment sectionName="Departement Books"/>,
							},
							{
								path: ":bookId", // Route for viewing a specific book
								element: <UnderDevelopment sectionName="Books Detail"/>
							}
						]
					}
				]
			},
			{
				path: "thesis",
				element: <DefaultLayout />,
				children: [
					{
						index: true, // Default dashboard page
						element: <UnderDevelopment sectionName="Thesis"/>,
					},
					{
						path: ":departement", // Route for viewing a specific book
						element: <DefaultLayout />,
						children: [
							{
								index: true, // Default dashboard page
								element: <UnderDevelopment sectionName="Departement Thesis"/>,
							},
							{
								path: ":thesisId", // Route for viewing a specific book
								element: <UnderDevelopment sectionName="Thesis Detail"/>
							}
						]
					}
				]
			},
			{
				path: "addDocuments",
				element: <DefaultLayout />,
				children: [
					{
						index: true, // Default dashboard page
						element: <UnderDevelopment sectionName="Add Book"/>,
					},
					{
						path: ":thesis", // Route for viewing a specific book
						element: <UnderDevelopment sectionName="Add Thesis"/>
					}
				]
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
				path: "reservations",
				element: <Reservations />,
			},
			{
				path: "settings",
				element: <OrgConfiguration />,
			},
			{
				path: "archives",
				element: <Archives/>,
			},
			{
				path: "profile",
				element: <UnderDevelopment sectionName="Profile" />,
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