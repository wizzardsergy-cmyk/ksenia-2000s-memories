import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FlowerDecoration from "@/components/FlowerDecoration";

const questions = [
  "Имя",
  "Сколько тебе лет?",
  "Из какого ты города?",
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
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

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

    try {
      const { error } = await supabase.from("questionnaires").insert({
        user_id: userId,
        answers: answers,
        video_url: videoUrl || null
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
    <div className="min-h-screen p-4 relative overflow-hidden">
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
              <div className="space-y-2">
                <Label htmlFor="video" className="text-lg font-semibold">
                  🎥 Ссылка на видеопоздравление (необязательно)
                </Label>
                <Input
                  id="video"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="border-2"
                />
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