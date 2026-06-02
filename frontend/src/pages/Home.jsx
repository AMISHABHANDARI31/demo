import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/appConstants';

const features = [
  {
    title: 'Scalable structure',
    description: 'Feature folders, route guards, shared UI, and service modules are ready to grow.',
    icon: Workflow,
  },
  {
    title: 'Production basics',
    description: 'Axios interceptors, environment variables, loading states, and error surfaces are included.',
    icon: ShieldCheck,
  },
  {
    title: 'Modern experience',
    description: 'Tailwind CSS, Framer Motion, toasts, forms, and icons are wired from the start.',
    icon: Sparkles,
  },
];

function Home() {
  return (
    <section className="px-4 py-20">
      <PageHeader
        eyebrow="Frontend starter"
        title="A clean React foundation for serious product work"
        description="Launch with routing, authentication structure, API services, reusable components, and polished defaults already in place."
      />
      <div className="mt-10 flex justify-center gap-3">
        <Button as={Link} to={ROUTES.REGISTER}>
          Get started
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button as={Link} to={ROUTES.LOGIN} variant="secondary">
          Sign in
        </Button>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Icon className="h-8 w-8 text-brand-600" aria-hidden="true" />
              <h2 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
