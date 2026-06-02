import { LogOut, Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button';
import { APP_NAME, ROUTES } from '../../constants/appConstants';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to={ROUTES.HOME} className="text-lg font-bold text-slate-950">
          {APP_NAME}
        </NavLink>
        <div className="hidden items-center gap-1 md:flex">
          <NavLink to={ROUTES.HOME} className={linkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to={ROUTES.DASHBOARD} className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={logout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          ) : (
            <>
              <Button as={Link} to={ROUTES.LOGIN} variant="ghost">
                Login
              </Button>
              <Button as={Link} to={ROUTES.REGISTER}>
                Register
              </Button>
            </>
          )}
        </div>
        <button
          className="inline-flex rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          type="button"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
