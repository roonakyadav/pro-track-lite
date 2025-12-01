# Contributing to ProTrack Lite

Thank you for your interest in contributing to ProTrack Lite! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/pro-track-lite.git
   cd pro-track-lite
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   # or
   npm start
   ```
5. Open [http://localhost:8000](http://localhost:8000) in your browser

## 🔧 Development Guidelines

### Code Style
- Use modern JavaScript (ES6+)
- Follow camelCase naming convention
- Use descriptive variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused (single responsibility)

### Commit Conventions
We follow conventional commit format:
```
type(scope): description

Types:
- feat: New features
- fix: Bug fixes
- docs: Documentation updates
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks
```

### Pull Request Process
1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request with a clear description

## 📁 Project Structure

```
protrack-lite/
├── css/
│   └── styles.css          # Custom styles
├── js/
│   ├── tasks.js           # Core task management
│   ├── analytics.js       # Charts and statistics
│   └── theme.js           # Theme management
├── index.html             # Main application
├── insights.html          # Analytics dashboard
├── 404.html              # Error page
├── package.json           # Project metadata
├── README.md              # Project documentation
└── LICENSE                # MIT license
```

## 🎯 Feature Ideas

Looking for ways to contribute? Here are some ideas:

### Beginner Friendly
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Enhance accessibility (ARIA labels, focus management)
- [ ] Add print styles for task lists

### Intermediate
- [ ] Add data export/import functionality
- [ ] Implement task categories/groups
- [ ] Add task templates
- [ ] Create a task sharing feature

### Advanced
- [ ] Add drag-and-drop task reordering
- [ ] Implement PWA (Progressive Web App) features
- [ ] Add offline sync capability
- [ ] Create a backend API for multi-device sync

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information
- Screenshots if applicable

## 💡 Feature Requests

Have an idea for a new feature? Open an issue with:
- Clear description of the feature
- How it would work
- Why it would be valuable
- Any design considerations

## 📝 Documentation

Documentation improvements are always welcome:
- Update README.md
- Add code comments
- Create tutorials
- Improve setup instructions

## 🎉 Recognition

Contributors will be:
- Listed in the contributors section
- Acknowledged in release notes
- Featured in project updates

## 📞 Support

Need help? Reach out via:
- [GitHub Issues](https://github.com/roonakyadav/pro-track-lite/issues)
- [GitHub Discussions](https://github.com/roonakyadav/pro-track-lite/discussions)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
