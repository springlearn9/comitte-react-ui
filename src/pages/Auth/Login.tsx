import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../utils/validators';
import { LoginPayload } from '../../utils/types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useEffect } from 'react';

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: LoginPayload) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username or Email"
            type="text"
            placeholder="john@example.com"
            registration={register('usernameOrEmail')}
            error={errors.usernameOrEmail?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            registration={register('password')}
            error={errors.password?.message}
          />
          <div className="flex items-center justify-between mt-6">
            <Button type="submit" isLoading={isLoading}>
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/request-password-reset" className="font-bold text-sm text-primary hover:text-primary-dark">
              Forgot Password?
            </Link>
          </div>
           <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-primary-dark">
                  Sign up
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;