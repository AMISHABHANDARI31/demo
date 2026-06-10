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

function VerifyRegisterOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location.state?.email || '',
      otp: '',
    },
  });

  const verifyRequest = useCallback((values) => authService.verifyRegisterOtp(values), []);
  const { error, execute, isLoading } = useAsync(verifyRequest);

  const onSubmit = async (values) => {
    try {
      const data = await execute(values);
      login(data);
      toast.success(data.message || 'Email verified successfully');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (caughtError) {
      toast.error(caughtError.message || 'OTP verification failed');
    }
  };

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-950">Verify registration OTP</h1>
        <p className="mt-2 text-sm text-slate-600">Enter the 6-digit OTP sent to your email.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage message={error.message} />}
          <Input
            id="verify-register-email"
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
            id="verify-register-otp"
            label="OTP"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            error={errors.otp?.message}
            {...register('otp', {
              required: 'OTP is required',
              minLength: {
                value: 6,
                message: 'OTP must be 6 digits',
              },
            })}
          />
          <Button className="w-full" type="submit" isLoading={isLoading}>
            Verify OTP
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Need to register again?{' '}
          <Link className="font-semibold text-brand-600 hover:text-brand-700" to={ROUTES.REGISTER}>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default VerifyRegisterOtp;
