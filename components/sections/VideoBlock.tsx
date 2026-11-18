'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

type VideoBlockProps = {
  src: string;
  poster?: string;
  caption?: string;
};

export function VideoBlock({ src, poster, caption }: VideoBlockProps) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  return (
    <figure className="video-block">
      <div className="video-block__frame">
        {playing ? (
          <video ref={video} src={src} poster={poster} controls playsInline autoPlay className="video-block__video" />
        ) : (
          <>
            {poster ? (
              <Image src={poster} alt={caption ?? 'Video poster'} fill sizes="100vw" className="video-block__poster" />
            ) : null}
            <button type="button" className="video-block__play" onClick={() => setPlaying(true)} aria-label="Play video">
              <span aria-hidden="true">▶</span>
              <span className="label">Play</span>
            </button>
          </>
        )}
      </div>
      {caption ? <figcaption className="label">{caption}</figcaption> : null}
    </figure>
  );
}
