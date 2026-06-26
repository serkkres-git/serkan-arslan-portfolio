import React from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden relative z-50">
      <video
        src={src}
        poster={poster}
        className="max-h-full max-w-full h-full object-contain"
        controls
        autoPlay
        playsInline
      />
    </div>
  );
}

export default VideoPlayer;
