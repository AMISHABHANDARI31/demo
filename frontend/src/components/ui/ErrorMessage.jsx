import { AlertCircle } from 'lucide-react';

function ErrorMessage({ message = 'Something went wrong' }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
