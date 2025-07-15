import { auth } from '@/lib/auth';
import Quiz from '../components/Quiz/Quiz';

export default async function Page () {
  const session = await auth();

  return (
    <div>
      <Quiz session={session} />
    </div>
  );
}
