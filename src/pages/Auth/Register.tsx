import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerSchema } from '../../utils/validators';
import { RegisterPayload } from '../../utils/types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Register = () => {
  const { register: registerUser, isLoading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload & { confirmPassword: string }>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterPayload) => {
    registerUser(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            type="text"
            placeholder="johndoe"
            registration={register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            registration={register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Mobile (Optional)"
            type="tel"
            placeholder="123-456-7890"
            registration={register('mobile')}
            error={errors.mobile?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            registration={register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="********"
            registration={register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <div className="mt-6">
            <Button type="submit" isLoading={isLoading}>
              Register
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:text-primary-dark">
                  Sign in
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;