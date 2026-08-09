import { motion } from 'framer-motion';

const EXAMPLES = [
  {
    label: 'SaaS launch',
    prompt: 'Create a polished SaaS landing page with an editorial hero, feature grid, pricing, testimonials, and a strong final CTA.',
  },
  {
    label: 'Creative studio',
    prompt: 'Create an expressive creative studio website with selected work, services, an about section, and a refined contact page.',
  },
  {
    label: 'Wellness app',
    prompt: 'Create a calm wellness app landing page with benefits, product previews, testimonials, pricing, and an App Store CTA.',
  },
];

const FEATURES = [
  ['01', 'Prompt a complete site', 'Describe the product, audience, pages, and mood. Lotus turns the idea into a coherent frontend.'],
  ['02', 'Refine it in conversation', 'Change the layout, copy, color, or interactions without rebuilding everything from scratch.'],
  ['03', 'Preview and keep your work', 'Inspect the live result, save projects to your account, and export production-ready files.'],
];

export default function LandingPage({ onStartDesigning, onSelectPrompt, onShowBlog }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f6f1e9] text-[#211f1b]">
      <section className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        <div className="relative min-h-[48vh] overflow-hidden lg:min-h-full">
          <img src="/auth-bg.png" alt="Pixel-art lotus pond surrounded by green mountains" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102f2d]/75 via-transparent to-[#fff4dc]/5" />
          <div className="relative flex h-full min-h-[48vh] flex-col justify-between p-7 text-white sm:p-10 lg:min-h-full lg:p-14">
            <div className="flex items-center justify-between text-sm tracking-[0.16em] uppercase">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true">✿</span> Lotus</span>
              <span className="rounded-full border border-white/30 bg-black/10 px-3 py-1 backdrop-blur-sm">AI design canvas</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl pb-2">
              <p className="mb-5 text-sm tracking-[0.18em] uppercase text-white/80">From thought to interface</p>
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-3d-dark sm:text-6xl xl:text-7xl">
                the world’s most thoughtful ai designer
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 text-3d-dark">
                Prompt a site, shape it in conversation, preview it live, and keep every version when it feels right.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center bg-[#fbf8f2] px-6 py-14 sm:px-12 lg:px-16 xl:px-24">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="mx-auto w-full max-w-[620px]">
            <p className="text-sm tracking-[0.17em] uppercase text-[#b47c49]">Design without the blank canvas</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl xl:text-6xl">What do you want to bring to life?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6d665d]">
              Tell Lotus what you are building. Start simple—you can refine every detail after the first draft.
            </p>

            <button type="button" onClick={onStartDesigning} className="group mt-10 w-full border-b border-[#a89f94] py-5 text-left transition hover:border-[#211f1b]">
              <span className="flex items-center justify-between gap-6">
                <span className="text-xl text-[#81796f] group-hover:text-[#211f1b]">Describe your website…</span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#211f1b] text-white transition group-hover:scale-105"><i className="ph ph-arrow-up-right text-lg" /></span>
              </span>
            </button>

            <div className="mt-9">
              <p className="mb-4 text-sm text-[#8b8379]">Or begin with an idea</p>
              <div className="flex flex-wrap gap-2.5">
                {EXAMPLES.map((example) => (
                  <button key={example.label} onClick={() => onSelectPrompt(example.prompt)} className="rounded-full border border-[#d5cdc2] bg-white/50 px-4 py-2.5 text-sm text-[#4d4841] transition hover:border-[#9e9488] hover:bg-white">
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#ded7cd] pt-6 text-sm text-[#746d64]">
              <span className="inline-flex items-center gap-2"><i className="ph ph-check-circle" /> Live preview</span>
              <span className="inline-flex items-center gap-2"><i className="ph ph-check-circle" /> Chat edits</span>
              <span className="inline-flex items-center gap-2"><i className="ph ph-check-circle" /> Saved projects</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[#d9d1c6] bg-[#f6f1e9] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-sm tracking-[0.16em] uppercase text-[#b47c49]">One continuous flow</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">Less juggling.<br />More creating.</h2>
            </div>
            <div className="divide-y divide-[#d9d1c6] border-y border-[#d9d1c6]">
              {FEATURES.map(([number, title, description]) => (
                <div key={number} className="grid gap-4 py-8 sm:grid-cols-[48px_1fr_1.2fr] sm:gap-7">
                  <span className="text-sm text-[#a07654]">{number}</span>
                  <h3 className="text-2xl font-semibold tracking-[-0.025em]">{title}</h3>
                  <p className="leading-relaxed text-[#6d665d]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-t border-[#d9d1c6] bg-[#162f2c] text-white lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
          <p className="text-sm tracking-[0.16em] uppercase text-[#f0c59f]">Built for ideas in motion</p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">Your first draft is only the beginning.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">Sign in once, let Lotus remember your projects, and return whenever the next idea arrives.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={onStartDesigning} className="rounded-md bg-[#f7efe3] px-6 py-3.5 font-semibold text-[#1b2c29] transition hover:bg-white">Start designing</button>
            <button onClick={onShowBlog} className="rounded-md border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">Read the Lotus journal</button>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden">
          <img src="/hero-bg.png" alt="Lotus flowers across a quiet mountain lake" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#16302d]/15" />
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-[#d9d1c6] bg-[#f6f1e9] px-6 py-8 text-sm text-[#716a61] sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20">
        <span>✿ Lotus — design with intention.</span>
        <span>Prompt · refine · preview · save</span>
      </footer>
    </div>
  );
}
