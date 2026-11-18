import clsx from 'clsx';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'header' | 'footer';
};

export function Container({ as: Tag = 'div', className, ...props }: ContainerProps) {
  return <Tag className={clsx('shell', className)} {...props} />;
}
