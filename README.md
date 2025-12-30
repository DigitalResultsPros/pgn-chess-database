
# PGN Chess Database

A web-based application to store, analyze, and replay your favorite chess games. This tool is perfect for chess enthusiasts and students of the game who want to keep a personal database of their games.

## Features

- **PGN Database**: Store your chess games in PGN (Portable Game Notation) format.
- **Game Viewer**: Replay games on a beautiful, interactive chessboard.
- **Move Navigation**: Navigate through games using intuitive controls (buttons, slider, keyboard arrows).
- **Game Analysis**: See the board state at any point in the game.
- **Customizable Themes**: Choose from multiple chessboard themes to customize your experience.
- **Local Storage**: Your PGNs are saved in your browser's local storage, so your data is private and persists between sessions.
- **Add and Delete**: Easily add new games by pasting PGN content and delete games you no longer need.

## Tech Stack

- **Frontend**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (or your favorite package manager)

### Installation

1.  Clone the repository:
    ```bash
    git clone git@github.com:DigitalResultsPros/pgn-chess-database.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd pgn-chess-database
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Usage

1.  **Adding a Game**:
    -   Navigate to the "Database" page.
    -   Paste your PGN content into the text area under "Add New Game".
    -   Click "Save Game".

2.  **Viewing a Game**:
    -   On the "Database" page, click on any game card to open it in the viewer.

3.  **Replaying a Game**:
    -   Use the navigation buttons (`<<`, `<`, `>`, `>>`) to move through the game.
    -   Click on any move in the move list to jump to that position.
    -   Use the left and right arrow keys on your keyboard for quick navigation.
    -   Drag the slider to quickly scrub through the game.

## Folder Structure

```
/
├── public/
└── src/
    ├── components/         # React components
    │   ├── Chessboard.tsx
    │   ├── DatabasePage.tsx
    │   ├── Header.tsx
    │   ├── LandingPage.tsx
    │   └── ViewerPage.tsx
    ├── hooks/              # Custom React hooks
    │   └── usePgnStore.ts
    ├── services/           # Business logic and external services
    │   └── pgnService.ts
    ├── styles/             # Styling and themes
    │   └── themes.ts
    ├── types/              # TypeScript types and interfaces
    ├── App.tsx             # Main application component
    └── main.tsx            # Application entry point
```

