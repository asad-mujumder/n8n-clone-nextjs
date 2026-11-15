import AuthContainer from '@/features/auth/components/auth-container';

const AuthLayout = ({ children }: LayoutProps<'/'>) => {
  return <AuthContainer>{children}</AuthContainer>;
};

export default AuthLayout;
