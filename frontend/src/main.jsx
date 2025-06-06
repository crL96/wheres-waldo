import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import StartGame from './components/startGame/StartGame.jsx';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartGame />
  },
  {
    path: "game",
    element: <App />
  },
  {
    path: "leaderboard",
    element: <Leaderboard />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
