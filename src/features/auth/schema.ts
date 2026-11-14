import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(100, 'First name can at most 100 characters long'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(100, 'Last name can at most 100 characters long'),
    email: z.email('Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(30, 'Password must be at most 30 characters long'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: "Passwords don't match",
  });

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type SignupInputValues = z.input<typeof signupSchema>;
export type SignupOutputValues = z.output<typeof signupSchema>;
export type LoginInputValues = z.input<typeof loginSchema>;
export type LoginOutputValues = z.output<typeof loginSchema>;
