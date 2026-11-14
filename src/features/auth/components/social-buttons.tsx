import { Button } from '@/components/ui/button';

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
        Continue with Github
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-9 w-full"
        disabled={isPending}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default SocialButtons;
