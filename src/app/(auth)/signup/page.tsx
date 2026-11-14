import SignupForm from '@/features/auth/components/signup-form';
import { requireUnauth } from '@/server/auth/session';

const Signup = async () => {
  await requireUnauth();

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
