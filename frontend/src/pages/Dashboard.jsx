import { CalendarDays, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { authService } from '../services/authService';
import { formatDisplayDate } from '../utils/formatDate';

function Dashboard() {
  const { logout, updateUser, user } = useAuth();
  const profileRequest = useCallback(() => authService.getProfile(), []);
  const { error, execute, isLoading } = useAsync(profileRequest);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await execute();
        updateUser(data.user);
      } catch (caughtError) {
        toast.error(caughtError.message || 'Unable to load profile');
      }
    };

    loadProfile();
  }, [execute, updateUser]);

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-6 shadow-soft md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-brand-600">Protected area</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">Dashboard</h1>
            <p className="mt-2 text-slate-600">
              {isLoading ? 'Loading your profile...' : 'You are signed in and viewing protected content.'}
            </p>
            {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
          </div>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-md border border-slate-200 bg-white p-6">
            <UserRound className="h-8 w-8 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">Profile</h2>
            <p className="mt-2 text-sm text-slate-600">{user?.name || 'Authenticated user'}</p>
          </article>
          <article className="rounded-md border border-slate-200 bg-white p-6">
            <Mail className="h-8 w-8 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">Email</h2>
            <p className="mt-2 text-sm text-slate-600">{user?.email || 'Loading email...'}</p>
          </article>
          <article className="rounded-md border border-slate-200 bg-white p-6">
            <ShieldCheck className="h-8 w-8 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">Verification</h2>
            <p className="mt-2 text-sm text-slate-600">
              {user?.isEmailVerified ? 'Email verified' : 'Email not verified'}
            </p>
          </article>
          <article className="rounded-md border border-slate-200 bg-white p-6">
            <CalendarDays className="h-8 w-8 text-brand-600" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">Today</h2>
            <p className="mt-2 text-sm text-slate-600">{formatDisplayDate(new Date())}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
