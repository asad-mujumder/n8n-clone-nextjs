'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const LogoutBtn = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      size="lg"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace('/login');
              router.refresh();
            },
            onError: (context) => {
              toast.error(context.error.message, { position: 'top-center' });
            },
          },
        });
      }}
    >
      Log out
    </Button>
  );
};

export default LogoutBtn;
