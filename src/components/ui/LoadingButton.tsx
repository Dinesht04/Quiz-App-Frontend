import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function LoadingButton() {
  return (
    <Button size="sm" disabled>
      <Loader2Icon className="animate-spin" />
      Please wait
    </Button>
  );
}
