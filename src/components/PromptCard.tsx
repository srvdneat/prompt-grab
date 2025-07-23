import React from 'react';
import { Star, Clock, Tag, Folder, MoreVertical, Trash2 } from 'lucide-react';
import { Prompt } from '../store/promptStore';

interface PromptCardProps {
  prompt: Prompt;
  isSelected: boolean;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, isSelected, onClick, onDelete }) => {
  return (
    <div
      className={`card p-4 cursor-pointer transition-all duration-200 hover:shadow-lg group ${
        isSelected ? 'ring-2 ring-gray-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {prompt.title}
          </h3>
          {prompt.isFavorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          {onDelete && (
            <button 
              className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-gray-400 hover:text-red-500 transition-colors"
              title="Delete prompt"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button 
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
        {prompt.content}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>
            {new Date(prompt.updatedAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {prompt.folderId && (
            <div className="flex items-center space-x-1">
              <Folder className="w-3 h-3" />
            </div>
          )}
          
          {prompt.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>{prompt.tags.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 