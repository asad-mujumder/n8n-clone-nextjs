'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schema';
import type { SignupInputValues, SignupOutputValues } from '../schema';
import { toast } from 'sonner';
import SocialButtons from './social-buttons';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/auth-client';
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<SignupInputValues, unknown, SignupOutputValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupOutputValues) => {
    await signUp.email(
      {
        name: values.firstName + ' ' + values.lastName,
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          toast.success('Signed up successfully', { position: 'top-center' });
          setIsSubmitting(false);
          router.replace('/login');
        },
        onError(context) {
          setIsSubmitting(false);
          toast.error(context.error.message, { position: 'top-center' });
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting || isSubmitting;

  return (
    <Card className="w-full p-4">
      <CardHeader className="text-center">
        <CardTitle>Welcome to N8N Clone</CardTitle>
        <CardDescription>Create AI automations</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <SocialButtons isPending={isPending} />
        <div>
          <form
            id="signup-form"
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="firstName"
                      name="firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
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
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="lastName"
                      name="lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      name="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="john@doe.com"
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      name="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
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
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      name="password"
                      aria-invalid={fieldState.invalid}
                      className="h-9"
                      placeholder="********"
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
            type="reset"
            variant="outline"
            size="lg"
            onClick={() => form.reset()}
            disabled={isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="signup-form"
            size="lg"
            disabled={isPending}
          >
            Signup
          </Button>
        </Field>
        <p>
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-link underline underline-offset-4
              hover:text-link-hover"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
