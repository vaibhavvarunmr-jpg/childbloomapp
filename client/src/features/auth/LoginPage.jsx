import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
      <h2 className="text-h2 font-serif text-center mb-1" style={{ color: '#1C1C1E' }}>
        {t('auth.welcomeBack')}
      </h2>
      <p className="text-body text-center mb-8" style={{ color: '#8E8E93' }}>
        {t('auth.signInContinue')}
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
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {t('auth.signIn')}
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
        {t('auth.noAccount')}{' '}
        <Link
          to="/signup"
          className="font-semibold transition-colors hover:opacity-80"
          style={{ color: '#F43F5E' }}
        >
          {t('auth.signUpFree')}
        </Link>
      </p>
    </div>
  );
}
