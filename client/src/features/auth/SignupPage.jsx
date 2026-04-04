import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

export default function SignupPage() {
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
      <Card className="p-8 text-center backdrop-blur-xl bg-white/80 border-white/50 shadow-soft-lg animate-scale-in">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
          <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Check your email</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          We've sent you a confirmation link. Click it to activate your account and get started.
        </p>
        <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 text-sm transition-colors">
          Back to sign in
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-8 backdrop-blur-xl bg-white/80 border-white/50 shadow-soft-lg">
      <h2 className="text-2xl font-serif font-bold text-gray-900 text-center mb-1">Create your account</h2>
      <p className="text-sm text-gray-500 text-center mb-8">Start your child's development journey</p>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl p-4 mb-6 flex items-center gap-2 animate-scale-in">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200/60" /></div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white/80 px-3 text-gray-400">or</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
