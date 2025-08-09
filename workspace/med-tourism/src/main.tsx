import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'

import LandingPage from './pages/LandingPage'
import ResultsPage from './pages/ResultsPage'
import OfferDetailPage from './pages/OfferDetailPage'
import ComparePage from './pages/ComparePage'
import OffersListPage from './pages/OffersListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'offers', element: <OffersListPage /> },
      { path: 'offer/:offerId', element: <OfferDetailPage /> },
      { path: 'compare', element: <ComparePage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
