import React from 'react';
import { Star, Clock, Tag, Folder, MoreVertical, Trash2 } from 'lucide-react';
import { usePromptStore } from '../store/promptStore';
import { PromptCard } from './PromptCard';

export const PromptList: React.FC = () => {
  const {
    getFilteredPrompts,
    selectedPromptId,
    setSelectedPrompt,
    deletePrompt,
    viewMode,
  } = usePromptStore();

  const prompts = getFilteredPrompts();

  const handleDeletePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      deletePrompt(id);
    }
  };

  if (prompts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No prompts found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Create your first prompt to get started
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isSelected={selectedPromptId === prompt.id}
              onClick={() => setSelectedPrompt(prompt.id)}
              onDelete={(e) => handleDeletePrompt(prompt.id, e)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group ${
              selectedPromptId === prompt.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            onClick={() => setSelectedPrompt(prompt.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {prompt.title}
                  </h3>
                  {prompt.isFavorite && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {prompt.content}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(prompt.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {prompt.folderId && (
                    <div className="flex items-center space-x-1">
                      <Folder className="w-3 h-3" />
                      <span>Folder</span>
                    </div>
                  )}
                  
                  {prompt.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{prompt.tags.length} tags</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-4">
                <button 
                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete prompt"
                  onClick={(e) => handleDeletePrompt(prompt.id, e)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 