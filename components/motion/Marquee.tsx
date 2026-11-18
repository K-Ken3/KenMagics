'use client';

import clsx from 'clsx';

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
};

export function Marquee({ items, className, reverse = false, separator = '✦' }: MarqueeProps) {
  const track = (
    <div className="marquee__group">
      {items.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          <span className="marquee__sep">{separator}</span>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={clsx('marquee', reverse && 'marquee--reverse', className)}>
      <div className="marquee__track">
        {track}
        <div aria-hidden="true">{track}</div>
      </div>
    </div>
  );
}
