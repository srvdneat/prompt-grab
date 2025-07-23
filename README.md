# Prompt Grab

A beautiful, native macOS-style prompt repository app for storing, organizing, and retrieving text prompts. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### Core Functionality
- **Prompt Management**: Create, edit, duplicate, and delete prompts
- **Smart Organization**: Organize prompts with folders and tags
- **Search & Filter**: Powerful search with Cmd+K shortcut
- **Favorites**: Star important prompts for quick access
- **Version History**: Automatic version tracking with history
- **Autosave**: Never lose your work with automatic saving

### User Experience
- **Native macOS Feel**: Clean, minimalist design inspired by native macOS apps
- **Dark/Light Mode**: Toggle between themes with native controls
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Responsive Design**: Works seamlessly across different screen sizes
- **Drag & Drop**: Intuitive folder organization

### Advanced Features
- **Export Options**: Export prompts as JSON or plain text
- **Copy to Clipboard**: One-click copying of prompt content
- **Grid/List Views**: Choose your preferred viewing mode
- **Local Storage**: All data persists locally in your browser
- **Version Control**: Track changes with automatic version history

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prompt-grab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Focus search bar |
| `⌘N` | Create new prompt |
| `⌘S` | Save current prompt |
| `⌘F` | Find in current prompt |
| `⌘D` | Toggle dark mode |
| `⌘G` | Toggle grid/list view |

## 🎨 Design Philosophy

Prompt Grab embodies the **Superhuman for prompt engineers** philosophy:

- **Minimalist Aesthetic**: Clean lines, high contrast, grayscale palette
- **Native Feel**: Inspired by Notion, Linear, Raycast, and Obsidian
- **Precision & Clarity**: Every element serves a purpose
- **Elegant Typography**: Beautiful, readable text with proper spacing
- **Keyboard-First**: Designed for power users who prefer keyboard navigation

## 🏗️ Architecture

### Tech Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Lucide React** for icons
- **Local Storage** for data persistence

### Key Components
- `Layout`: Main app structure with sidebar and content
- `Sidebar`: Navigation, folders, and tags
- `Header`: Search, actions, and view controls
- `PromptList`: Display prompts in list or grid view
- `PromptEditor`: Rich text editor with metadata
- `PromptCard`: Individual prompt display component

### State Management
The app uses Zustand for lightweight, performant state management:
- **Prompts**: CRUD operations with version history
- **Folders**: Hierarchical organization
- **Tags**: Flexible categorization
- **UI State**: View modes, selections, and preferences

## 📁 Data Structure

### Prompt
```typescript
interface Prompt {
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
```

### Folder
```typescript
interface Folder {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
}
```

### Tag
```typescript
interface Tag {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
}
```

## 🎯 Use Cases

### For Developers
- Store code review templates
- Organize debugging prompts
- Maintain documentation templates
- Keep API testing prompts

### For Writers
- Creative writing prompts
- Content templates
- Research questions
- Editorial guidelines

### For Productivity
- Meeting templates
- Email templates
- Task management prompts
- Goal setting frameworks

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Project Structure
```
src/
├── components/          # React components
│   ├── Layout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── PromptList.tsx
│   ├── PromptCard.tsx
│   └── PromptEditor.tsx
├── store/              # State management
│   └── promptStore.ts
├── App.tsx             # Main app component
└── index.css           # Global styles
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Notion, Linear, Raycast, and Obsidian
- Built with modern React patterns and best practices
- Designed for the macOS aesthetic and user experience
- Special thanks to the open source community

---

**Prompt Grab** - Where prompts find their home. 🏠
