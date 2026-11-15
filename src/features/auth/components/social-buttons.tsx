'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SocialButtons = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-9 w-full"
        disabled={isPending}
      >
        <Image
          src="/images/logos/github.svg"
          alt="Github"
          width={20}
          height={20}
        />
        Continue with Github
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-9 w-full"
        disabled={isPending}
      >
        <Image
          src="/images/logos/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        Continue with Google
      </Button>
    </div>
  );
};

export default SocialButtons;
