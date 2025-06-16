import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Dashboard from "./components/layout/Dashboard.tsx";

// Dashboard Components
import Overview from './pages/Overview.tsx';
import Users from './pages/Users.tsx';
import Loans from './pages/Loans.tsx';

import OrgConfiguration from "./components/theme/OrgConfiguration.tsx";
import UnderDevelopment from './pages/UnderDevelopment.tsx';
import DefaultLayout from "./components/layout/DefaultLayout.tsx";
import Reservations from './pages/Returns.tsx';
import Archives from './pages/Archives.tsx';

import Departements from "./pages/Departements.tsx";
import Catalogue from "./pages/Catalogue.tsx";
import BookDetails from "./pages/BookDetails.tsx";
import AddBook from "./pages/AddBook.tsx";
import ThesisCatalogue from "./pages/ThesisCatalogue.tsx";
import ThesisDepartment from "./pages/ThesisDepartment.tsx";
import AddThesis from "./pages/AddThesis.tsx";
import ThesisDetails from "./pages/ThesisDetails.tsx";
import Profile from './pages/Profile.tsx';


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
						element: <Departements/>,
					},
					{
						path: ":departmentName", // Route for viewing a specific book
						element: <DefaultLayout />,
						children: [
							{
								index: true, // Default dashboard page
								element: <Catalogue />
							},
							{
								path: ":bookId", // Route for viewing a specific book
								element: <BookDetails/>
							},
							{
								path: "add", // Route for viewing a specific book
								element: <AddBook/>
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
						element: <ThesisDepartment/>
					},
					{
						path: ":departmentName", // Route for viewing a specific book
						element: <DefaultLayout />,
						children: [
							{
								index: true, // Default dashboard page
								element: <ThesisCatalogue />
							},
							{
								path: ":thesisId", // Route for viewing a specific book
								element: <ThesisDetails/>
							},
							{
								path: "add", // Route for viewing a specific book
								element: <AddThesis/>
							}
						]
					}
				]
			},
			{
				path: "messages",
				element: <DefaultLayout />,
				children: [
					{
						index: true, // Default dashboard page
						element: <UnderDevelopment sectionName="Chat"/>,
					},
					{
						path: ":messageId", // Route for viewing a specific book
						element: <UnderDevelopment sectionName="Specific Chat"/>
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
				element: <Profile/>,
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