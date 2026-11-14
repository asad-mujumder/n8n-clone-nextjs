'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema } from '../schema';
import AuthLayout from './auth-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { LoginInputValues, LoginOutputValues } from '../schema';
import Link from 'next/link';
import SocialButtons from './social-buttons';
import { signIn } from '@/lib/auth-client';

const LoginForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<LoginInputValues, unknown, LoginOutputValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginOutputValues) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          toast.success('Logged in successfully', { position: 'top-center' });
          setIsSubmitting(false);
          router.replace('/');
          router.refresh();
        },
        onError(context) {
          setIsSubmitting(false);
          toast.error(context.error.message, { position: 'top-center' });
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting ?? isSubmitting;

  return (
    <AuthLayout>
      <Card className="w-11/12 max-w-md p-4">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <SocialButtons isPending={isPending} />
          <div>
            <form
              id="login-form"
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        id="login-form-email"
                        name="login-form-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="john@doe.com"
                        autoComplete="off"
                        className="h-9"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-form-password">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="login-form-password"
                        name="login-form-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="off"
                        className="h-9"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Field
            orientation="horizontal"
            className="flex items-center justify-center"
          >
            <Button
              type="button"
              size="lg"
              variant="outline"
              disabled={isPending}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              form="login-form"
              disabled={isPending}
            >
              Log in
            </Button>
          </Field>
          <p>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-link underline underline-offset-4
                hover:text-link-hover"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default LoginForm;
