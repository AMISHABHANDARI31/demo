import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
};

function Button({
  as: Component = 'button',
  children,
  className = '',
  disabled = false,
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const buttonProps =
    Component === 'button'
      ? {
          disabled: disabled || isLoading,
          type,
        }
      : {
          'aria-disabled': disabled || isLoading,
        };

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </Component>
  );
}

export default Button;
