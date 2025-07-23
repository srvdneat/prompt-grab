import React from 'react';
import { Layout } from './components/Layout';
import { PromptList } from './components/PromptList';
import { PromptEditor } from './components/PromptEditor';
import { usePromptStore } from './store/promptStore';

function App() {
  const { isDarkMode } = usePromptStore();

  // Apply dark mode to document
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Layout>
      <div className="flex h-full">
        {/* Prompt List */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
          <PromptList />
        </div>
        
        {/* Prompt Editor */}
        <div className="w-1/2">
          <PromptEditor />
        </div>
      </div>
    </Layout>
  );
}

export default App;
