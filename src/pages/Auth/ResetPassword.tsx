import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { resetPasswordSchema } from '../../utils/validators';
import { PasswordUpdatePayload } from '../../utils/types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useEffect } from 'react';

const ResetPassword = () => {
  const { performReset, isLoading } = useAuth();
  const location = useLocation();

  // Pre-fill token from URL query param if it exists (e.g., /reset-password?token=XYZ)
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get('token') || '';

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<PasswordUpdatePayload & { confirmPassword: string }>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenFromUrl
    }
  });

  useEffect(() => {
    if (tokenFromUrl) {
      setValue('token', tokenFromUrl);
    }
  }, [tokenFromUrl, setValue]);

  const onSubmit = (data: PasswordUpdatePayload) => {
    performReset(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Set New Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Reset Token"
            type="text"
            placeholder="Enter token from email"
            registration={register('token')}
            error={errors.token?.message}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="********"
            registration={register('newPassword')}
            error={errors.newPassword?.message}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="********"
            registration={register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <div className="mt-6">
            <Button type="submit" isLoading={isLoading}>
              Reset Password
            </Button>
          </div>
           <div className="mt-4 text-center text-sm text-gray-600">
              <Link to="/login" className="font-bold text-primary hover:text-primary-dark">
                  Back to Login
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;