import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { signupSchema } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

function LanguageSelector() {
  const { i18n: i18nHook } = useTranslation();
  const currentLang = i18nHook.language?.slice(0, 2) || 'en';

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('childbloom-lang', code);
  };

  return (
    <div className="mb-6">
      <p className="text-micro font-semibold uppercase tracking-wider text-center mb-3" style={{ color: '#AEAEB2' }}>
        Choose language / भाषा चुनें
      </p>
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-0.5 justify-center flex-wrap">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
            style={currentLang === lang.code ? {
              background: 'linear-gradient(135deg, #FB7185, #F43F5E)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(244,63,94,0.3)',
            } : {
              background: 'rgba(255,255,255,0.7)',
              color: '#636366',
              border: '1px solid rgba(209,213,219,0.6)',
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      await signUp(data.email, data.password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="rounded-3xl p-8 sm:p-10 text-center animate-scale-in"
        style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.75)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.8)',
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(244,63,94,0.1)' }}
        >
          <svg className="w-8 h-8" style={{ color: '#F43F5E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-h2 font-serif mb-2" style={{ color: '#1C1C1E' }}>{t('auth.checkEmail')}</h2>
        <p className="text-body mb-8 leading-relaxed" style={{ color: '#8E8E93' }}>
          {t('auth.confirmationSent')}
        </p>
        <Link
          to="/login"
          className="font-semibold transition-colors hover:opacity-80"
          style={{ color: '#F43F5E' }}
        >
          {t('auth.backToSignIn')}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-8 sm:p-10"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.75)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8)',
      }}
    >
      {/* Language selector — shown prominently on signup */}
      <LanguageSelector />

      <h2 className="text-h2 font-serif text-center mb-1" style={{ color: '#1C1C1E' }}>
        {t('auth.createAccount')}
      </h2>
      <p className="text-body text-center mb-8" style={{ color: '#8E8E93' }}>
        {t('auth.startJourney')}
      </p>

      {error && (
        <div className="rounded-2xl p-4 mb-6 flex items-center gap-2.5 animate-scale-in" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#DC2626' }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-caption">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label={t('auth.email')}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t('auth.password')}
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label={t('auth.confirmPassword')}
          type="password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {t('auth.createAccount')}
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full" style={{ borderTop: '1px solid rgba(209,213,219,0.6)' }} />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-micro uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.9)', color: '#AEAEB2' }}>
            {t('auth.or')}
          </span>
        </div>
      </div>

      <p className="text-body text-center" style={{ color: '#8E8E93' }}>
        {t('auth.haveAccount')}{' '}
        <Link
          to="/login"
          className="font-semibold transition-colors hover:opacity-80"
          style={{ color: '#F43F5E' }}
        >
          {t('auth.signIn')}
        </Link>
      </p>
    </div>
  );
}
