import React, { useState } from 'react';
import { 
  Folder, 
  Tag, 
  Star, 
  Settings, 
  Search,
  FolderPlus,
  Plus as TagPlus
} from 'lucide-react';
import { usePromptStore } from '../store/promptStore';

export const Sidebar: React.FC = () => {
  const {
    folders,
    tags,
    selectedFolderId,
    selectedTagId,
    setSelectedFolder,
    setSelectedTag,
    addFolder,
    addTag,
    getFilteredPrompts,
  } = usePromptStore();

  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder({ name: newFolderName.trim() });
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({ name: newTagName.trim() });
      setNewTagName('');
      setShowNewTagInput(false);
    }
  };

  const handleTagClick = (tagId: string) => {
    if (selectedTagId === tagId) {
      setSelectedTag(null); // Deselect if already selected
    } else {
      setSelectedTag(tagId);
    }
  };

  const allPrompts = getFilteredPrompts();
  const favoritePrompts = allPrompts.filter(p => p.isFavorite);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Prompt Grab
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="p-4 space-y-2">
          <div className="sidebar-item" onClick={() => {
            setSelectedFolder(null);
            setSelectedTag(null);
          }}>
            <Search className="w-4 h-4 mr-3" />
            <span>All Prompts</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {allPrompts.length}
            </span>
          </div>
          
          <div className="sidebar-item" onClick={() => {
            setSelectedFolder(null);
            setSelectedTag(null);
          }}>
            <Star className="w-4 h-4 mr-3" />
            <span>Favorites</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {favoritePrompts.length}
            </span>
          </div>
        </div>

        {/* Folders */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Folders</h3>
            <button
              onClick={() => setShowNewFolderInput(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Add new folder"
            >
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>
          
          {showNewFolderInput && (
            <div className="mb-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddFolder();
                  if (e.key === 'Escape') setShowNewFolderInput(false);
                }}
                placeholder="Folder name"
                className="input-field text-sm"
                autoFocus
              />
            </div>
          )}
          
          <div className="space-y-1">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`sidebar-item ${selectedFolderId === folder.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedFolder(folder.id);
                  setSelectedTag(null); // Clear tag selection when folder is selected
                }}
              >
                <Folder className="w-4 h-4 mr-3" />
                <span className="flex-1">{folder.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {allPrompts.filter(p => p.folderId === folder.id).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</h3>
            <button
              onClick={() => setShowNewTagInput(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Add new tag"
            >
              <TagPlus className="w-4 h-4" />
            </button>
          </div>
          
          {showNewTagInput && (
            <div className="mb-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTag();
                  if (e.key === 'Escape') setShowNewTagInput(false);
                }}
                placeholder="Tag name"
                className="input-field text-sm"
                autoFocus
              />
            </div>
          )}
          
          <div className="space-y-1">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`sidebar-item ${selectedTagId === tag.id ? 'active' : ''}`}
                onClick={() => handleTagClick(tag.id)}
              >
                <Tag className="w-4 h-4 mr-3" />
                <span className="flex-1">{tag.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {allPrompts.filter(p => p.tags.includes(tag.name)).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="sidebar-item w-full">
          <Settings className="w-4 h-4 mr-3" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}; 