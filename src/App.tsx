import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ConfigProvider } from './components/ConfigProvider';
import {DEFAULT_ORGANIZATION} from "./config/firebase.ts";

function App() {
  return (
    <ConfigProvider orgName={DEFAULT_ORGANIZATION}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;