import Link from 'next/link';

export function Footer() {
  const year = new Date(Date.now()).getFullYear();

  return (
    <footer className="border-t border-white/[0.06] px-6 md:px-20 py-10
                       flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-display text-lg tracking-widest text-muted">
        Glimm<span className="text-gold">s</span>
      </span>

      <div className="flex gap-8">
        {[
          { label: 'Privacy',     href: '/privacy'      },
          { label: 'Contact',     href: 'mailto:hello@glimms.ai' },
          { label: 'Twitter',     href: 'https://twitter.com/glimmsai' },
          { label: 'Instagram',   href: 'https://instagram.com/glimmsai' },
        ].map(l => (
          <Link
            key={l.label}
            href={l.href}
            className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted
                       hover:text-cream transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <span className="font-mono text-[10px] text-muted tracking-wider">
        © {year} Top One Percent · Lagos, Nigeria
      </span>
    </footer>
  );
}
