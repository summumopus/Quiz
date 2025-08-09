import { Outlet, Link } from 'react-router-dom'
import { useCompare } from './shared/store/compare'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <div data-theme="medical" className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
        <div className="container-responsive flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-brand-700">
            <span className="inline-block w-8 h-8 rounded bg-brand-500 text-white grid place-content-center">M</span>
            MedCompare
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <CompareNavButton />
            <a href="#" className="btn btn-primary btn-sm">Live chat</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container-responsive py-8 text-sm text-gray-500">
          © {new Date().getFullYear()} MedCompare. For demonstration purposes only.
        </div>
      </footer>
      <ChatWidget />
    </div>
  )
}

function CompareNavButton() {
  const { ids, getUrl } = useCompare()
  const url = getUrl()
  return (
    <Link to={url} className="btn btn-ghost btn-sm">Compare ({ids.length})</Link>
  )
}
