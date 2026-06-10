import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { useAsync } from '../hooks/useAsync';
import { authService } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const registerRequest = useCallback((values) => authService.register(values), []);
  const { error, execute, isLoading } = useAsync(registerRequest);

  const onSubmit = async (values) => {
    try {
      const data = await execute(values);
      toast.success(data.message || 'OTP sent to your email');
      navigate(ROUTES.VERIFY_REGISTER_OTP, {
        state: {
          email: values.email,
        },
      });
    } catch (caughtError) {
      toast.error(caughtError.message || 'Registration failed');
    }
  };

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Start with a secure account and protected dashboard.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage message={error.message} />}
          <Input
            id="name"
            label="Name"
            placeholder="Your name"
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
            })}
          />
          <Input
            id="register-email"
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
            id="register-password"
            label="Password"
            type="password"
            placeholder="Create a password"
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
            Register
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered?{' '}
          <Link className="font-semibold text-brand-600 hover:text-brand-700" to={ROUTES.LOGIN}>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
