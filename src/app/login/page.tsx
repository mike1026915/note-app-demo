'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction } from '@/actions/users';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      if (!errorMessage) {
        router.replace('/');
        toast.success('Successfully logged in');
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-24">
      <div className="bg-popover absolute flex w-full max-w-sm flex-col items-center rounded-lg border p-8">
        <h1
          className={`mb-8 text-2xl font-semibold ${isPending && 'opacity-0'}`}
        >
          Create Account
        </h1>
        {isPending && (
          <div className="text-primary absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2">
            <p>Createing account...</p>
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
        <form
          className={`flex w-full flex-col gap-4 ${isPending && '-z-10 opacity-0'}`}
          action={handleClickLoginButton}
        >
          <Input
            type="text"
            name="email"
            placeholder="Email"
            required
            disabled={isPending}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            disabled={isPending}
          />
          <Button disabled={isPending}>Login</Button>

          <p className="mt-3 text-center text-xs">
            Don't have an account?
            <Link
              href="/create-account"
              className="hover:text-primary ml-2 underline transition-colors duration-200 ease-in-out"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
