import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
          Post Manager
        </Link>
        <nav className="flex gap-6 text-sm font-medium" aria-label="Main">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                'rounded px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
                isActive ? 'text-sky-700' : 'text-slate-600 hover:text-slate-900',
              ].join(' ')
            }
          >
            All posts
          </NavLink>
          <NavLink
            to="/posts/new"
            className={({ isActive }) =>
              [
                'rounded px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
                isActive ? 'text-sky-700' : 'text-slate-600 hover:text-slate-900',
              ].join(' ')
            }
          >
            New post
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
