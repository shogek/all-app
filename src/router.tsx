import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ChecklistNotePage from './components/pages/checklist-note/checklist-note-page'
import ErrorPage from './components/pages/error/error-page'
import HomePage from './components/pages/home/home-page'
import RootPage from './components/pages/root/root-page'

const routes: RouteObject[] = [
  {
    path: '/all-app/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'checklist-note/:checklistNoteId',
        element: <ChecklistNotePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
