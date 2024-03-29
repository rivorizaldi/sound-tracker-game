
"use client"

import SoundTracker from '@/component/SoundTracker';
import '@aarsteinmedia/dotlottie-player';
import type { DotLottiePlayer } from '@aarsteinmedia/dotlottie-player';
import { useEffect, useRef } from 'react';

export default function Home() {
  const animation = useRef<DotLottiePlayer | null>(null)


  useEffect(() => {
    // animation.current?.controls = false
  }, [])

  return (
    <main className="grid place-content-center h-screen">

      <dotlottie-player
        ref={animation}
        src="https://lottie.host/5d62e276-2990-4d74-b714-aad7e334910a/dXFj7LrkVl.json"
        autoplay={null}
        controls={null}
        loop={null}
        subframe=""
        style={{
          width: '320px',
          height: '400px',
          margin: 'auto'
        }}
      />

      <SoundTracker throttleInterval={100} onReadPower={(value: number) => {
        animation.current?.seek(`${value}%`)
      }} />
    </main>
  );
}
