import { Fragment } from 'react';

/**
 * Renders copy where [bracketed] words use the serif accent style.
 */
export function AccentText({ text }: { text: string }) {
  const parts = text.split(/\[([^\]]+)\]/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span className="serif" key={index}>
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
