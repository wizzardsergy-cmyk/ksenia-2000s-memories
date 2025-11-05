import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FlowerDecoration from "@/components/FlowerDecoration";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Questionnaire {
  id: string;
  user_id: string;
  answers: any;
  video_url: string | null;
  submitted_at: string;
}

interface User {
  id: string;
  name: string;
  gender: string;
}

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

const Admin = () => {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState<(Questionnaire & { user: User })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/");
      return;
    }

    fetchQuestionnaires();
  }, [navigate]);

  const fetchQuestionnaires = async () => {
    try {
      const { data: questionnairesData, error: questionnairesError } = await supabase
        .from("questionnaires")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (questionnairesError) throw questionnairesError;

      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, name, gender");

      if (usersError) throw usersError;

      const combined = questionnairesData.map(q => ({
        ...q,
        user: usersData.find(u => u.id === q.user_id)!
      }));

      setQuestionnaires(combined);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Ошибка загрузки анкет");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    document.body.classList.remove("theme-blue");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl gradient-pink text-white px-6 py-3 rounded-lg">
          Загрузка... ✨
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <FlowerDecoration />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Card className="border-4 shadow-2xl mb-6">
          <CardHeader className="gradient-pink text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-shadow-glow">
                С Днём Рождения, Ксения! 🎉💝
              </CardTitle>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/50"
              >
                Выйти
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 text-center flower-pattern">
            <p className="text-xl font-semibold mb-2">
              Получено анкет: {questionnaires.length} 💌
            </p>
            <p className="text-muted-foreground">
              Твои друзья приготовили для тебя особенные поздравления!
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {questionnaires.map((q) => (
            <Collapsible key={q.id}>
              <Card className="border-2 overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className={`${q.user.gender === 'female' ? 'gradient-pink' : 'bg-gradient-to-r from-blue-400 to-cyan-400'} text-white cursor-pointer hover:opacity-90 transition-opacity`}>
                    <CardTitle className="text-2xl font-bold flex items-center justify-between">
                      <span>
                        {q.user.gender === 'female' ? '💖' : '💙'} {q.user.name}
                      </span>
                      <span className="text-lg">👇 Открыть</span>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-6 space-y-4 flower-pattern">
                    {questions.map((question, index) => (
                      <div key={index} className="bg-white/60 p-4 rounded-lg border-2">
                        <p className="font-semibold text-sm mb-1">
                          {index + 1}. {question}
                        </p>
                        <p className="text-base pl-4">
                          {q.answers[index] || "—"}
                        </p>
                      </div>
                    ))}

                    {q.video_url && (
                      <div className="bg-white/60 p-4 rounded-lg border-2">
                        <p className="font-semibold text-sm mb-2">
                          🎥 Видеопоздравление:
                        </p>
                        <video
                          controls
                          className="w-full max-w-md mx-auto rounded-lg border-2"
                          preload="metadata"
                          controlsList="nodownload"
                        >
                          <source src={q.video_url} type="video/webm" />
                          <source src={q.video_url} type="video/mp4" />
                          <p className="text-sm text-muted-foreground p-4">
                            Ваш браузер не поддерживает воспроизведение видео. 
                            <a href={q.video_url} target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                              Скачать видео
                            </a>
                          </p>
                        </video>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground text-right">
                      Отправлено: {new Date(q.submitted_at).toLocaleString('ru-RU')}
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}

          {questionnaires.length === 0 && (
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <p className="text-xl text-muted-foreground">
                  Пока нет заполненных анкет. Скоро они появятся! ✨
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;