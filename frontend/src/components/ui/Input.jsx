import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { error, id, label, className = '', type = 'text', ...props },
  ref,
) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
          error ? 'border-red-400' : 'border-slate-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
