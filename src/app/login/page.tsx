import LoginForm from '@/components/login-form';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect('/');
  }
  return <LoginForm />;
}
