function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-semibold uppercase text-brand-600">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>}
    </div>
  );
}

export default PageHeader;
