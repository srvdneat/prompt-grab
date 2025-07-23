import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folderId?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  history: PromptVersion[];
}

export interface PromptVersion {
  id: string;
  content: string;
  timestamp: Date;
  version: number;
}

export interface Folder {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
}

interface PromptStore {
  // State
  prompts: Prompt[];
  folders: Folder[];
  tags: Tag[];
  selectedPromptId: string | null;
  selectedFolderId: string | null;
  selectedTagId: string | null;
  searchQuery: string;
  isDarkMode: boolean;
  viewMode: 'grid' | 'list';

  // Actions
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'history'>) => void;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;
  duplicatePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt'>) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  
  addTag: (tag: Omit<Tag, 'id' | 'createdAt'>) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  
  setSelectedPrompt: (id: string | null) => void;
  setSelectedFolder: (id: string | null) => void;
  setSelectedTag: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Computed
  getFilteredPrompts: () => Prompt[];
  getPromptById: (id: string) => Prompt | undefined;
  getFolderById: (id: string) => Folder | undefined;
  getTagById: (id: string) => Tag | undefined;
}

// Sample data
const sampleFolders: Folder[] = [
  { id: '1', name: 'Work', createdAt: new Date() },
  { id: '2', name: 'Personal', createdAt: new Date() },
  { id: '3', name: 'Ideas', createdAt: new Date() },
];

const sampleTags: Tag[] = [
  { id: '1', name: 'writing', createdAt: new Date() },
  { id: '2', name: 'coding', createdAt: new Date() },
  { id: '3', name: 'creative', createdAt: new Date() },
  { id: '4', name: 'productivity', createdAt: new Date() },
];

const samplePrompts: Prompt[] = [
  {
    id: '1',
    title: 'Code Review Assistant',
    content: `You are an expert code reviewer. Please review the following code and provide:

1. **Code Quality Assessment**
   - Identify potential bugs, performance issues, and security vulnerabilities
   - Suggest improvements for readability and maintainability
   - Check for adherence to best practices and coding standards

2. **Specific Feedback**
   - Highlight specific lines or sections that need attention
   - Provide concrete suggestions for improvement
   - Explain the reasoning behind your recommendations

3. **Overall Rating**
   - Rate the code on a scale of 1-10
   - Provide a brief summary of the most critical issues

Please be constructive and specific in your feedback.`,
    tags: ['coding', 'productivity'],
    folderId: '1',
    isFavorite: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    version: 1,
    history: [{
      id: '1',
      content: 'Sample content',
      timestamp: new Date('2024-01-15'),
      version: 1,
    }],
  },
  {
    id: '2',
    title: 'Creative Writing Prompts',
    content: `Generate creative writing prompts that are:

**Characteristics:**
- Unique and thought-provoking
- Suitable for various genres (fiction, poetry, creative non-fiction)
- Open-ended enough to inspire multiple interpretations
- Challenging but accessible

**Format:**
- Provide 5-10 prompts per request
- Include a mix of different styles and themes
- Add brief context or inspiration for each prompt
- Consider different skill levels (beginner to advanced)

**Themes to include:**
- Human relationships and emotions
- Nature and environment
- Technology and society
- Historical events or periods
- Fantasy and speculative elements`,
    tags: ['writing', 'creative'],
    folderId: '2',
    isFavorite: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    version: 1,
    history: [{
      id: '2',
      content: 'Sample content',
      timestamp: new Date('2024-01-10'),
      version: 1,
    }],
  },
  {
    id: '3',
    title: 'Productivity System Designer',
    content: `You are a productivity expert. Help me design a personalized productivity system based on my needs and preferences.

**My Information:**
- [Describe your work style, goals, and current challenges]
- [Mention any existing tools or methods you use]
- [Specify your main productivity goals]

**Please provide:**
1. **System Overview**
   - A high-level framework that fits my needs
   - Key principles and methodologies to follow
   - Recommended tools and apps

2. **Daily Workflow**
   - Morning and evening routines
   - Task management approach
   - Time blocking strategies

3. **Implementation Plan**
   - Step-by-step setup process
   - Timeline for adoption
   - Metrics to track progress

4. **Customization Options**
   - How to adapt the system as needs change
   - Troubleshooting common issues
   - Integration with existing habits`,
    tags: ['productivity'],
    folderId: '1',
    isFavorite: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    version: 1,
    history: [{
      id: '3',
      content: 'Sample content',
      timestamp: new Date('2024-01-05'),
      version: 1,
    }],
  },
];

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      // Initial state with sample data
      prompts: samplePrompts,
      folders: sampleFolders,
      tags: sampleTags,
      selectedPromptId: null,
      selectedFolderId: null,
      selectedTagId: null,
      searchQuery: '',
      isDarkMode: false,
      viewMode: 'list',

      // Actions
      addPrompt: (promptData) => {
        const newPrompt: Prompt = {
          ...promptData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          history: [{
            id: crypto.randomUUID(),
            content: promptData.content,
            timestamp: new Date(),
            version: 1,
          }],
        };
        
        set((state) => ({
          prompts: [...state.prompts, newPrompt],
          selectedPromptId: newPrompt.id,
        }));
      },

      updatePrompt: (id, updates) => {
        set((state) => ({
          prompts: state.prompts.map((prompt) => {
            if (prompt.id === id) {
              const updatedPrompt = {
                ...prompt,
                ...updates,
                updatedAt: new Date(),
                version: prompt.version + 1,
              };
              
              // Add to history if content changed
              if (updates.content && updates.content !== prompt.content) {
                updatedPrompt.history = [
                  ...prompt.history,
                  {
                    id: crypto.randomUUID(),
                    content: updates.content,
                    timestamp: new Date(),
                    version: updatedPrompt.version,
                  },
                ];
              }
              
              return updatedPrompt;
            }
            return prompt;
          }),
        }));
      },

      deletePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.filter((prompt) => prompt.id !== id),
          selectedPromptId: state.selectedPromptId === id ? null : state.selectedPromptId,
        }));
      },

      duplicatePrompt: (id) => {
        const prompt = get().getPromptById(id);
        if (prompt) {
          const duplicatedPrompt: Prompt = {
            ...prompt,
            id: crypto.randomUUID(),
            title: `${prompt.title} (Copy)`,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
            history: [{
              id: crypto.randomUUID(),
              content: prompt.content,
              timestamp: new Date(),
              version: 1,
            }],
          };
          
          set((state) => ({
            prompts: [...state.prompts, duplicatedPrompt],
            selectedPromptId: duplicatedPrompt.id,
          }));
        }
      },

      toggleFavorite: (id) => {
        set((state) => ({
          prompts: state.prompts.map((prompt) =>
            prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
          ),
        }));
      },

      addFolder: (folderData) => {
        const newFolder: Folder = {
          ...folderData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          folders: [...state.folders, newFolder],
        }));
      },

      updateFolder: (id, updates) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id ? { ...folder, ...updates } : folder
          ),
        }));
      },

      deleteFolder: (id) => {
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
          prompts: state.prompts.map((prompt) =>
            prompt.folderId === id ? { ...prompt, folderId: undefined } : prompt
          ),
          selectedFolderId: state.selectedFolderId === id ? null : state.selectedFolderId,
        }));
      },

      addTag: (tagData) => {
        const newTag: Tag = {
          ...tagData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          tags: [...state.tags, newTag],
        }));
      },

      updateTag: (id, updates) => {
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === id ? { ...tag, ...updates } : tag
          ),
        }));
      },

      deleteTag: (id) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          prompts: state.prompts.map((prompt) => ({
            ...prompt,
            tags: prompt.tags.filter((tagName) => {
              const tag = state.tags.find((t) => t.id === id);
              return tag ? tagName !== tag.name : true;
            }),
          })),
        }));
      },

      setSelectedPrompt: (id) => {
        set({ selectedPromptId: id });
      },

      setSelectedFolder: (id) => {
        set({ selectedFolderId: id });
      },

      setSelectedTag: (id) => {
        set({ selectedTagId: id });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      // Computed
      getFilteredPrompts: () => {
        const { prompts, searchQuery, selectedFolderId, selectedTagId } = get();
        return prompts.filter((prompt) => {
          const matchesSearch = searchQuery === '' || 
            prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const matchesFolder = !selectedFolderId || prompt.folderId === selectedFolderId;
          const matchesTag = !selectedTagId || (() => {
            const selectedTag = get().tags.find(t => t.id === selectedTagId);
            return selectedTag ? prompt.tags.includes(selectedTag.name) : true;
          })();
          
          return matchesSearch && matchesFolder && matchesTag;
        });
      },

      getPromptById: (id) => {
        return get().prompts.find((prompt) => prompt.id === id);
      },

      getFolderById: (id) => {
        return get().folders.find((folder) => folder.id === id);
      },

      getTagById: (id) => {
        return get().tags.find((tag) => tag.id === id);
      },
    }),
    {
      name: 'prompt-grab-storage',
      partialize: (state) => ({
        prompts: state.prompts,
        folders: state.folders,
        tags: state.tags,
        isDarkMode: state.isDarkMode,
        viewMode: state.viewMode,
      }),
      // Add skipHydration to prevent hydration issues
      skipHydration: true,
    }
  )
); 