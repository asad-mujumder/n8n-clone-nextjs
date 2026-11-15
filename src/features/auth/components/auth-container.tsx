import Image from 'next/image';
import { ReactNode } from 'react';

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-muted
        p-6 md:p-10"
    >
      <div
        className="flex w-full max-w-md flex-col items-center justify-center
          gap-4"
      >
        <div className="flex items-center justify-center gap-2 font-medium">
          <Image
            alt="Logo"
            src="/images/logos/logo.svg"
            width={30}
            height={30}
          />{' '}
          n8n Clone
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
