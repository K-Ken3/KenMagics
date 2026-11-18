import Image from 'next/image';
import clsx from 'clsx';

type LogoMarkProps = {
  className?: string;
  variant?: 'paper' | 'ink';
  priority?: boolean;
  sizes?: string;
};

export function LogoMark({ className, variant = 'paper', priority = false, sizes }: LogoMarkProps) {
  return (
    <span className={clsx('logo-mark', className)}>
      <Image
        src={variant === 'ink' ? '/logo-mark-ink.png' : '/logo-mark.png'}
        alt=""
        width={660}
        height={766}
        priority={priority}
        sizes={sizes ?? '(max-width: 700px) 120px, 280px'}
        className="logo-mark__img"
      />
    </span>
  );
}
