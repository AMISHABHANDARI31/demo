import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/appConstants';

function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Button as={Link} className="mt-8" to={ROUTES.HOME}>
          Go home
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
