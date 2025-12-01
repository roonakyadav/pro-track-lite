# ProTrack Lite - Task & Productivity Web App

A professional, productive Task & Productivity Web Application built with modern web technologies. ProTrack Lite helps you manage tasks efficiently with a clean interface, analytics, and persistent storage.

## 🌟 Live Demo

[View Live Demo on GitHub Pages](https://roonakyadav.github.io/pro-track-lite/)

## 🚀 Features

### Core Functionality
- **Task Management**: Add, edit, delete, and mark tasks as completed
- **Priority System**: High, medium, and low priority tasks with color-coded badges
- **Due Dates**: Set due dates with overdue reminders
- **Tags**: Categorize tasks with customizable tags
- **Persistent Storage**: All data saved in LocalStorage (no backend required)

### Advanced Features
- **Search & Filtering**: Find tasks by title, description, tag, status, or priority
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Auto-sorting**: Tasks sorted by due date (closest first) and priority
- **Dark/Light Theme**: Toggle between themes with LocalStorage persistence
- **Mobile Responsive**: Optimized for mobile, tablet, and desktop
- **Expandable Cards**: Click to expand task descriptions

### Analytics & Insights
- **Completion Ratio**: Pie chart showing completed vs pending tasks
- **Productivity Trend**: Line chart of daily task completion over the last 7 days
- **Task Distribution**: Bar chart breaking down tasks by priority level
- **Summary Dashboard**: Key metrics at a glance (total, completed, pending, overdue)

### UI/UX Features
- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Heroicons Integration**: Beautiful icons throughout the app
- **Accessible Forms**: Proper form validation and user feedback

## 🛠️ Technology Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript (Vanilla ES6+)
- **Charts**: Chart.js for data visualization
- **Icons**: Heroicons for consistent iconography
- **Storage**: Browser LocalStorage for data persistence
- **Responsive**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

```
protrack-lite/
├── index.html          # Main dashboard and task manager
├── insights.html       # Analytics and charts page
├── 404.html           # Error page fallback
├── css/
│   └── styles.css     # Custom styles and animations
├── js/
│   ├── tasks.js       # Task management functionality
│   ├── analytics.js   # Charts and statistics
│   └── theme.js       # Dark/light theme toggle
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for CDN resources (Tailwind, Chart.js, Heroicons)

### Installation
1. **Clone or Download**: Download the project files to your local machine

2. **Open in Browser**: Open `index.html` directly in your web browser

   ```bash
   # Simply open the HTML file in your browser
   open index.html
   ```

3. **Optional - Web Server**: For better file loading, serve via a local web server

   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Using Node.js (if installed)
   npx serve .

   # Then open http://localhost:8000/index.html
   ```

## 📖 Usage Guide

### Adding Tasks
1. Fill in the **Task Title** (required)
2. Optionally add a **Description**
3. Select **Priority** (High/Medium/Low)
4. Set **Due Date** (required)
5. Add a **Tag** for categorization (optional)
6. Click **"Add Task"**

### Managing Tasks
- **Mark Complete**: Click the checkbox next to a task
- **Edit Task**: Click the edit icon (pencil) on any task card
- **Delete Task**: Click the trash icon on any task card
- **Expand Description**: Click "Show Description" to view full details

### Filtering & Search
- **Search**: Type in the search bar to find tasks by title, description, or tag
- **Filter by Status**: Choose All/Pending/Completed
- **Filter by Priority**: Choose All/High/Medium/Low
- **Filter by Tag**: Type a specific tag to filter

### Viewing Analytics
- Navigate to **"Insights"** from the sidebar
- View completion statistics and productivity trends
- Charts automatically update when you complete tasks

### Theme Toggle
- Click the sun/moon icon in the header to switch themes
- Theme preference is automatically saved

## 🎨 Design Principles

### Color Coding
- **High Priority**: Red badges and borders
- **Medium Priority**: Yellow badges and borders
- **Low Priority**: Green badges and borders
- **Overdue Tasks**: Red due date text

### Interactions
- **Hover Effects**: Cards lift slightly on hover
- **Smooth Transitions**: All state changes are animated
- **Loading States**: Immediate feedback on form submissions
- **Visual Feedback**: Color changes indicate different states

### Responsive Design
- **Mobile**: Stack navigation, full-width forms, touch-friendly buttons
- **Tablet**: 2-column layouts where appropriate
- **Desktop**: Full sidebar, multi-column layouts

## 🔧 Customization

### Adding New Features
The codebase is modular and extensible. Key areas for customization:

- **Task Properties**: Extend the task data model in `tasks.js`
- **New Filters**: Add dropdowns or controls in the filter section
- **Chart Types**: Integrate new Chart.js chart types in `analytics.js`
- **Themes**: Modify color schemes in Tailwind CSS classes

### Styling
- **Tailwind Classes**: All styling uses Tailwind for easy customization
- **CSS Variables**: Use CSS custom properties for theming
- **Component Classes**: Consistent naming for reusable styles

## 🐛 Troubleshooting

### Common Issues

**Tasks not saving:**
- Ensure your browser supports LocalStorage
- Check browser console for errors
- Clear browser cache if issues persist

**Charts not loading:**
- Check internet connection (Chart.js loads from CDN)
- Verify console for JavaScript errors
- Refresh the page

**Mobile menu not working:**
- Check that JavaScript is enabled
- Ensure viewport meta tag is present
- Test on different screen sizes

**Theme not persisting:**
- Clear browser cache
- Check LocalStorage permissions in browser settings

## 📊 Data Storage

All task data is stored locally in your browser's LocalStorage:

- **Tasks**: `protrack-tasks` key
- **Theme**: `theme` key
- **Data Persistence**: No expiration, survives browser restarts

## 🚀 Deployment

### GitHub Pages
1. Commit all files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the `main` branch as source
4. Access via `https://yourusername.github.io/repository-name/`

### Other Hosting
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect GitHub repository
- **Firebase**: Use Firebase Hosting
- **Traditional Hosting**: Upload files to web server

### Offline Usage
The app works completely offline after the first load (CDN resources cached) and can be used as a Progressive Web App (PWA) with minimal setup.

## 🛡️ Privacy & Security

- **No Data Collection**: Everything stays on your device
- **Local Storage Only**: No server communication
- **No Trackers**: No analytics or tracking scripts included
- **Self-Contained**: No external dependencies except CDN resources

## 🤝 Contributing

While this is a demo project, suggestions for improvements are welcome! Areas for enhancement:

- [ ] Enhanced editing modals
- [ ] Task categories/groups
- [ ] Drag-and-drop reordering
- [ ] Email notifications for due dates
- [ ] Export/import functionality
- [ ] Time tracking features

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute as needed.

## 🙏 Credits

- **Tailwind CSS**: Modern CSS framework
- **Chart.js**: Beautiful data visualizations
- **Heroicons**: Consistent icon system
- **JavaScript**: Vanilla ES6+ for clean, lightweight code

---

## 📈 Recent Updates

### v1.0.2 (Latest)
- Added browser notifications for due date reminders
- Enhanced accessibility with ARIA labels
- Improved meta descriptions and SEO
- Added code documentation headers
- Performance optimizations

### v1.0.1
- Added live demo link
- Version info in page titles
- Enhanced error pages

### v1.0.0 (Initial Release)
- Complete task management system
- Analytics dashboard with charts
- LocalStorage persistence
- Responsive design
- Dark/light theme support

---

**Built with ❤️ using modern web technologies**

Happy task management! 🚀
