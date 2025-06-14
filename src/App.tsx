import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ConfigProvider } from './components/theme/ConfigProvider.tsx';
import {DEFAULT_ORGANIZATION} from "./config/firebase.ts";
import './utils/i18n';
import {SearchProvider} from "./context/SearchContext.tsx";

function App() {
  return (
    <ConfigProvider orgName={DEFAULT_ORGANIZATION}>
      <SearchProvider>
        <RouterProvider router={routes} />
      </SearchProvider>
    </ConfigProvider>
  );
}

export default App;