# Deep Work Tracker

A simple, beautiful React app for tracking your deep work sessions.  
Mark the days you did deep work, see your progress by month, and enjoy a minimal UI.  
Your data never leaves your browser.

## Features

- 📅 **Monthly Calendar:** See months from May 2025 to December 2025
- 🟦 **Today Highlighted:** Current date is highlighted in blue
- ✅ **Mark Deep Work:** Click a date to toggle deep work done for that day (visually indicated)
- 🔄 **Persistence:** Your marked days are saved in your browser (localStorage), even after reloads
- ⬅️➡️ **Month Navigation:** Go left/right through available months easily
- 🛡 **Private:** No login, no cloud — just your local device

## Getting Started

 **Run the App**
    ```bash
    npm run dev
    ```

 **Open in Browser**
    Visit [http://localhost:5173/](http://localhost:5173/) (default Vite port).

## Tech Stack

- [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
- [TailwindCSS](https://tailwindcss.com/) for rapid styling
- **Persistence:** `localStorage` (no cloud, no backend)

## Customization

- Want to reset all data? Open the browser console and run:
  ```js
  localStorage.removeItem('checkedDates');
