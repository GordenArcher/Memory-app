import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
const App = lazy(() => import("./App.jsx"))
import { AuthContextprovider } from './utils/context/AuthContext.jsx'
import { PageLoad } from './components/PageLoad.jsx'

createRoot(document.getElementById('memory_app')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextprovider>
      <Suspense fallback={ <PageLoad />}>
        <App />
      </Suspense>
      
    </AuthContextprovider>
    </BrowserRouter>
  </StrictMode>,
)
