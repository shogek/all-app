import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ChecklistNotePage from './components/pages/checklist-note/checklist-note-page'
import ErrorPage from './components/pages/error/error-page'
import HomePage from './components/pages/home/home.page'

const routes: RouteObject[] = [
  {
    path: '/all-app/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/all-app/checklist-note/:checklistNoteId',
    element: <ChecklistNotePage />,
    errorElement: <ErrorPage />,
  },
]

export const router = createBrowserRouter(routes)
