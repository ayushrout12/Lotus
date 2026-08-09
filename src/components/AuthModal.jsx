import { useEffect, useState } from 'react';

function friendlyAuthError(error, fallback = 'Authentication failed. Please try again.') {
  const code = error?.code || '';
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') return 'That email or password is incorrect.';
  if (code === 'auth/email-already-in-use') return 'That email already has an account. Sign in instead.';
  if (code === 'auth/weak-password') return 'Use a password with at least 6 characters.';
  if (code === 'auth/popup-closed-by-user') return 'Google sign-in was cancelled.';
  if (code === 'auth/unauthorized-domain') return 'This domain must be added to Firebase Authorized domains.';
  if (code === 'auth/network-request-failed') return 'Network error. Check your connection and try again.';
  return error?.message || fallback;
}

export default function AuthModal({ onClose, onSignIn, onSignUp, onGoogle, onSuccess }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const complete = () => {
    onSuccess?.();
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) return setError('Enter your email and password.');
    if (mode === 'signup' && password.length < 6) return setError('Use a password with at least 6 characters.');
    setLoading(true);
    try {
      if (mode === 'signin') await onSignIn(email.trim(), password);
      else await onSignUp(email.trim(), password);
      complete();
    } catch (authError) {
      setError(friendlyAuthError(authError));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await onGoogle();
      complete();
    } catch (authError) {
      setError(friendlyAuthError(authError, 'Google sign-in failed.'));
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#f8f5ef]" role="dialog" aria-modal="true" aria-labelledby="lotus-auth-title">
      <div className="min-h-screen grid lg:grid-cols-2">
        <aside className="relative hidden lg:flex min-h-screen overflow-hidden text-white">
          <img src="/auth-bg.png" alt="A peaceful pixel-art lotus pond surrounded by mountains" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102d2b]/75 via-[#173d39]/10 to-[#fff3d8]/5" />
          <div className="relative mt-auto p-14 xl:p-16 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase">
              <span aria-hidden="true">✿</span>
              Lotus
            </div>
            <h2 className="text-5xl xl:text-6xl leading-[0.98] font-semibold text-3d-dark">the ai canvas that<br />designs with you</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 text-3d-dark">
              Prompt a complete site, refine every detail in chat, preview it live, and keep your work safely synced.
            </p>
          </div>
        </aside>

        <main className="relative flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
          <button onClick={onClose} className="absolute right-6 top-6 rounded-full border border-black/10 bg-white/70 p-2.5 text-[#28251f] transition hover:bg-white" aria-label="Close sign-in">
            <i className="ph ph-x text-lg" />
          </button>
          <div className="w-full max-w-[500px]">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <img src="/logo-mark.png" alt="" className="h-9 w-9 object-contain" />
              <span className="text-xl font-semibold text-[#211f1b]">Lotus</span>
            </div>

            <p className="mb-4 text-sm tracking-[0.16em] uppercase text-[#b57a46]">Your work, remembered</p>
            <h1 id="lotus-auth-title" className="text-4xl sm:text-5xl leading-tight font-semibold text-[#211f1b]">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-[#6f685f]">
              {mode === 'signin' ? 'Sign in to generate, edit, preview, and save every Lotus project.' : 'Start building with Lotus and sync your projects across devices.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <label className="block">
                <span className="block text-base text-[#3d3932]">Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" className="mt-2 w-full border-0 border-b border-[#cfc7bc] bg-transparent px-0 py-3 text-lg text-[#211f1b] outline-none placeholder:text-[#aaa198] focus:border-[#211f1b]" />
              </label>
              <label className="block">
                <span className="block text-base text-[#3d3932]">Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} className="mt-2 w-full border-0 border-b border-[#cfc7bc] bg-transparent px-0 py-3 text-lg text-[#211f1b] outline-none placeholder:text-[#aaa198] focus:border-[#211f1b]" />
              </label>

              {error && <div className="rounded-md border border-[#cf8c80]/45 bg-[#fff0ec] px-4 py-3 text-sm text-[#8b3c31]" role="alert">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-md bg-[#1d1c1a] px-5 py-4 text-base font-semibold text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60">
                {loading ? 'Please wait…' : mode === 'signin' ? 'Enter Lotus' : 'Create account'}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4 text-sm text-[#938a80]"><span className="h-px flex-1 bg-[#ddd5cb]" />or<span className="h-px flex-1 bg-[#ddd5cb]" /></div>

            <button type="button" onClick={handleGoogle} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-md border border-[#cfc7bc] bg-white/60 px-5 py-4 text-base text-[#302d28] transition hover:bg-white disabled:opacity-60">
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="mt-8 text-center text-base text-[#746d64]">
              {mode === 'signin' ? 'New to Lotus?' : 'Already have an account?'}{' '}
              <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }} className="font-semibold text-[#c18b4f] hover:text-[#9a6632]">
                {mode === 'signin' ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
