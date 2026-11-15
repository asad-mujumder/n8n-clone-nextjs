import LoginForm from '@/features/auth/components/login-form';
import { requireUnauth } from '@/server/auth/session';

const Login = async () => {
  await requireUnauth();
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
