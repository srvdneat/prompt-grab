import React, { useState, useEffect } from 'react';
import { Star, Clock, Copy, Download, History } from 'lucide-react';
import { usePromptStore } from '../store/promptStore';

export const PromptEditor: React.FC = () => {
  const {
    selectedPromptId,
    getPromptById,
    updatePrompt,
    toggleFavorite,
    folders,
    tags,
  } = usePromptStore();

  const prompt = selectedPromptId ? getPromptById(selectedPromptId) : null;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);

  // Update form when prompt changes
  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title);
      setContent(prompt.content);
      setSelectedTags(prompt.tags);
      setSelectedFolder(prompt.folderId || '');
    }
  }, [prompt]);

  // Autosave on content change
  useEffect(() => {
    if (prompt && (title !== prompt.title || content !== prompt.content || 
        JSON.stringify(selectedTags) !== JSON.stringify(prompt.tags) ||
        selectedFolder !== (prompt.folderId || ''))) {
      const timeoutId = setTimeout(() => {
        updatePrompt(prompt.id, {
          title,
          content,
          tags: selectedTags,
          folderId: selectedFolder || undefined,
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [title, content, selectedTags, selectedFolder, prompt, updatePrompt]);

  const handleCopyToClipboard = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.content);
    }
  };

  const handleExport = () => {
    if (prompt) {
      const data = {
        title: prompt.title,
        content: prompt.content,
        tags: prompt.tags,
        createdAt: prompt.createdAt,
        updatedAt: prompt.updatedAt,
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!prompt) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No prompt selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a prompt from the list to edit
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
      {/* Editor Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium bg-transparent border-none outline-none text-gray-900 dark:text-gray-100"
              placeholder="Untitled Prompt"
            />
            <button
              onClick={() => toggleFavorite(prompt.id)}
              className={`p-1 rounded transition-colors ${
                prompt.isFavorite
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={prompt.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-5 h-5 ${prompt.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyToClipboard}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Export prompt"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Version history"
            >
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Updated {new Date(prompt.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>v{prompt.version}</span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your prompt here..."
              className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 space-y-6">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Folder
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="input-field text-sm"
              aria-label="Select folder"
            >
              <option value="">No folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTags([...selectedTags, tag.name]);
                      } else {
                        setSelectedTags(selectedTags.filter(t => t !== tag.name));
                      }
                    }}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 