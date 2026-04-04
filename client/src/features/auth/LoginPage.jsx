import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/validators';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

export default function LoginPage() {
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
    <Card className="p-8 backdrop-blur-xl bg-white/80 border-white/50 shadow-soft-lg">
      <h2 className="text-2xl font-serif font-bold text-gray-900 text-center mb-1">Welcome back</h2>
      <p className="text-sm text-gray-500 text-center mb-8">Sign in to continue tracking your child's growth</p>

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
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200/60" /></div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white/80 px-3 text-gray-400">or</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Sign up free
        </Link>
      </p>
    </Card>
  );
}
