import { useState } from 'react';
import { ConfigProvider } from './components/ConfigProvider';
import OrgConfiguration from './components/OrgConfiguration';
import OrgSelector from './components/OrgSelector';

function App() {
  const [selectedOrg, setSelectedOrg] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Organization Configuration
          </h1>
          <p className="text-gray-600">
            View organization settings and information
          </p>
        </div>

        <OrgSelector
          onOrgSelect={setSelectedOrg}
          selectedOrg={selectedOrg}
        />

        {selectedOrg && (
          <ConfigProvider orgName={selectedOrg}>
            <OrgConfiguration />
          </ConfigProvider>
        )}
      </div>
    </div>
  );
}

export default App;