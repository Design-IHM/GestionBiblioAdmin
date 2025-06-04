import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ConfigProvider } from './components/theme/ConfigProvider.tsx';
import {DEFAULT_ORGANIZATION} from "./config/firebase.ts";
import './utils/i18n';

function App() {
  return (
    <ConfigProvider orgName={DEFAULT_ORGANIZATION}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;