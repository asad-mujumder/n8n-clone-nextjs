import SignupForm from '@/features/auth/components/signup-form';
import { requireUnauth } from '@/server/auth/session';

const Signup = async () => {
  await requireUnauth();

  return (
    <>
      <SignupForm />
    </>
  );
};

export default Signup;
