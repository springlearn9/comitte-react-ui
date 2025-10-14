import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { requestResetSchema } from '../../utils/validators';
import { PasswordResetPayload } from '../../utils/types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const RequestReset = () => {
  const { requestReset, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetPayload>({
    resolver: yupResolver(requestResetSchema),
  });

  const onSubmit = (data: PasswordResetPayload) => {
    requestReset(data, () => navigate('/reset-password'));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 mb-8">Enter your email and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            registration={register('email')}
            error={errors.email?.message}
          />
          <div className="mt-6">
            <Button type="submit" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Remembered your password?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-primary-dark">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestReset;