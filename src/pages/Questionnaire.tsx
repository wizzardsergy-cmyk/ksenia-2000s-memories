import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FlowerDecoration from "@/components/FlowerDecoration";
import { Video, StopCircle, Play } from "lucide-react";

const questions = [
  "Имя",
  "Сколько тебе лет?",
  "Домашний адрес",
  "Домашний телефон",
  "Любимая еда?",
  "Любимый напиток?",
  "Любимый цвет?",
  "Любимый цветок?",
  "Любимое дерево?",
  "Любимое животное?",
  "Любимая птица?",
  "Любимый город?",
  "Любимая книга?",
  "Любимый фильм?",
  "Любимый мультфильм?",
  "Любимый персонаж?",
  "Любимый актёр?",
  "Любимая актриса?",
  "Любимый певец?",
  "Любимая певица?",
  "На кого ты хотел быть похожим (твой кумир)?",
  "Твоё хобби?",
  "Любимое время года?",
  "Любимый месяц?",
  "Любимое число?",
  "Любимые женские имена?",
  "Любимые мужские имена?",
  "Любимая игрушка?",
  "Любимый писатель?",
  "Какое твоё самое хорошее качество?",
  "Какое твоё самое плохое качество?",
  "Что ты ценишь в людях?",
  "Любимая песня?",
  "Любимая фраза?",
  "Любимый фрукт?",
  "Любимое время суток?",
  "Почему ты решил(а) заполнить эту анкету?",
  "Что тебе нужно для счастья?",
  "О чём ты мечтаешь?"
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    
    if (!userId || !name) {
      navigate("/");
      return;
    }

    setUserName(name);

    // Check if user already submitted
    checkExistingQuestionnaire(userId);
  }, [navigate]);

  const checkExistingQuestionnaire = async (userId: string) => {
    const { data } = await supabase
      .from("questionnaires")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      toast.info("Вы уже заполнили анкету!");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Запись началась! 🎥");
    } catch (error) {
      console.error("Recording error:", error);
      toast.error("Не удалось начать запись. Проверьте разрешения камеры.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Запись остановлена! ✅");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      toast.error("Ошибка авторизации");
      navigate("/");
      return;
    }

    // Check if all questions are answered
    const unanswered = questions.findIndex((_, i) => !answers[i]?.trim());
    if (unanswered !== -1) {
      toast.error(`Пожалуйста, ответьте на вопрос ${unanswered + 1}`);
      setLoading(false);
      return;
    }

    // Check if video is recorded
    if (!videoBlob) {
      toast.error("Пожалуйста, запишите видеопоздравление! 🎥");
      setLoading(false);
      return;
    }

    try {
      // Upload video to storage
      const fileName = `${userId}-${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('video-greetings')
        .upload(fileName, videoBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('video-greetings')
        .getPublicUrl(fileName);

      // Insert questionnaire
      const { error } = await supabase.from("questionnaires").insert({
        user_id: userId,
        answers: answers,
        video_url: publicUrl
      });

      if (error) throw error;

      toast.success("Спасибо за заполнение анкеты! 💝");
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Ошибка при отправке анкеты");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden notebook-background">
      <FlowerDecoration />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <Card className="border-4 shadow-2xl mb-6">
          <CardHeader className="gradient-pink text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center text-shadow-glow">
              Анкета для {userName} 📝✨
            </CardTitle>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          {questions.map((question, index) => (
            <Card key={index} className="border-2 flower-pattern">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor={`q${index}`} className="text-lg font-semibold">
                    {index + 1}. {question}
                  </Label>
                  {index === questions.length - 1 || index === questions.length - 2 ? (
                    <Textarea
                      id={`q${index}`}
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="Ваш ответ..."
                      className="min-h-24 border-2"
                      required
                    />
                  ) : (
                    <Input
                      id={`q${index}`}
                      type="text"
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="Ваш ответ..."
                      className="border-2"
                      required
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-2 flower-pattern">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  🎥 Видеопоздравление (обязательно)
                </Label>
                
                <div className="space-y-4">
                  <video
                    ref={videoPreviewRef}
                    className="w-full max-w-md mx-auto rounded-lg border-4"
                    controls={!isRecording}
                    src={videoUrl || undefined}
                  />

                  <div className="flex gap-2 justify-center">
                    {!isRecording && !videoBlob && (
                      <Button
                        type="button"
                        onClick={startRecording}
                        className="gradient-pink border-2 border-white/50"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Начать запись
                      </Button>
                    )}

                    {isRecording && (
                      <Button
                        type="button"
                        onClick={stopRecording}
                        variant="destructive"
                        className="border-2"
                      >
                        <StopCircle className="w-4 h-4 mr-2" />
                        Остановить запись
                      </Button>
                    )}

                    {videoBlob && !isRecording && (
                      <Button
                        type="button"
                        onClick={() => {
                          setVideoBlob(null);
                          setVideoUrl("");
                          startRecording();
                        }}
                        className="gradient-pink border-2 border-white/50"
                      >
                        Записать заново
                      </Button>
                    )}
                  </div>

                  {videoBlob && (
                    <p className="text-center text-sm text-green-600 font-semibold">
                      ✅ Видео записано!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full text-xl py-8 gradient-pink border-2 border-white/50 shadow-lg hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить анкету 💝"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;