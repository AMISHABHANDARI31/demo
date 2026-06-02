import { APP_NAME } from '../../constants/appConstants';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p>Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}

export default Footer;
