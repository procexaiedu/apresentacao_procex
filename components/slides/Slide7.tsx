"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Square, Upload } from "lucide-react";

interface Slide7Props {
  onNext: () => void;
  goToSlide: (index: number) => void;
}

export default function Slide7({ goToSlide }: Slide7Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Erro ao acessar o microfone. Verifique as permissões.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    setIsUploading(true);

    try {
      // In production, upload to Minio here
      // For now, we'll just send the webhook notification
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUDIO_IN;
      if (!webhookUrl) {
        throw new Error("N8N_WEBHOOK_AUDIO_IN não configurado");
      }

      // Simulate upload
      const fileName = `recording-${Date.now()}.webm`;
      const audioUrl = `${process.env.MINIO_PUBLIC_URL}/${fileName}`;

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioUrl,
          fileName,
          timestamp: new Date().toISOString(),
          duration: recordingTime,
        }),
      });

      // Move to next slide (processing slide)
      goToSlide(7); // Slide 8 (index 7)
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Erro ao enviar áudio. Verifique as configurações.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Dark Studio Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Sobre a Sua Empresa
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Grave um áudio contando sobre seu negócio, desafios e objetivos
          </p>
        </motion.div>

        {/* Recording Interface */}
        <motion.div
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Waveform Visualization */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-8 h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                    animate={{
                      height: [
                        "20%",
                        `${Math.random() * 80 + 20}%`,
                        "20%",
                      ],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer */}
          {isRecording && (
            <motion.div
              className="text-6xl font-mono font-bold text-white mb-8 glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {formatTime(recordingTime)}
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                variant="premium"
                size="xl"
                className="gap-3"
              >
                <Mic className="w-6 h-6" />
                Iniciar Gravação
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                variant="destructive"
                size="xl"
                className="gap-3 animate-pulse"
              >
                <Square className="w-6 h-6" />
                Parar Gravação
              </Button>
            )}

            {audioBlob && !isUploading && (
              <>
                <Button
                  onClick={() => {
                    setAudioBlob(null);
                    setRecordingTime(0);
                  }}
                  variant="outline"
                  size="xl"
                >
                  Regravar
                </Button>
                <Button
                  onClick={uploadAudio}
                  variant="premium"
                  size="xl"
                  className="gap-3"
                >
                  <Upload className="w-6 h-6" />
                  Enviar para Análise
                </Button>
              </>
            )}

            {isUploading && (
              <div className="text-white/70 flex items-center gap-3">
                <motion.div
                  className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Enviando áudio...</span>
              </div>
            )}
          </div>

          {/* Info */}
          <motion.p
            className="text-white/50 text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Nossa IA irá transcrever e analisar tudo que você disser
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
