import { useEffect, useState } from "react";

const SoundTracker = ({ throttleInterval, onReadPower }: { throttleInterval: number, onReadPower: (value: number) => void }) => {
    const [averagePower, setAveragePower] = useState(0);

    useEffect(() => {
        let audioContext: AudioContext;
        let analyser: AnalyserNode;
        let dataArray: Uint8Array;
        let lastUpdate = 0;

        const monitorMicrophone = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                analyser = audioContext.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);

                const update = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const total = dataArray.reduce((acc, val) => acc + val, 0);
                    const average = ~~(total / bufferLength);

                    const now = Date.now();
                    if (average > 0 && now - lastUpdate >= throttleInterval) {
                        setAveragePower(average);
                        onReadPower(average)
                        lastUpdate = now;
                    }

                    requestAnimationFrame(update);
                };

                update();
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        monitorMicrophone();

        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [throttleInterval]);

    return (
        <></>
    )
}

export default SoundTracker