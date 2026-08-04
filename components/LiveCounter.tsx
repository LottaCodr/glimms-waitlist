async function getCount(): Promise<number> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/stats`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    return data.count ?? parseInt(process.env.NEXT_PUBLIC_BASE_COUNT ?? '2847');
  } catch {
    return parseInt(process.env.NEXT_PUBLIC_BASE_COUNT ?? '2847');
  }
}

export async function LiveCounter() {
  const count = await getCount();

  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="font-display text-4xl text-cream tracking-tight">
          {count.toLocaleString('en-US')}
        </p>
        <p className="font-sans text-xs text-muted mt-0.5">
          <span className="text-cream">people</span> on the waitlist
        </p>
      </div>
      <div className="flex -space-x-2.5">
        {['A', 'O', 'F', '+'].map((l, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-ink3 border-2 border-ink
                       flex items-center justify-center text-xs font-medium text-warm"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
