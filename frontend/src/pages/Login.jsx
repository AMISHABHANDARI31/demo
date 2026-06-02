import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { authService } from '../services/authService';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginRequest = useCallback((values) => authService.login(values), []);
  const { error, execute, isLoading } = useAsync(loginRequest);

  const onSubmit = async (values) => {
    const data = await execute(values);
    login(data);
    toast.success('Welcome back');
    navigate(from, { replace: true });
  };

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Access your dashboard and continue your work.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage message={error.message} />}
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <Button className="w-full" type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          No account?{' '}
          <Link className="font-semibold text-brand-600 hover:text-brand-700" to={ROUTES.REGISTER}>
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
