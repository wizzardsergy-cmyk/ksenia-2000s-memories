import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FlowerDecoration from "@/components/FlowerDecoration";

const Login = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("name", name)
        .eq("pin", pin)
        .single();

      if (error || !user) {
        toast.error("Неверное имя или пароль");
        setLoading(false);
        return;
      }

      // Store user data in localStorage
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userGender", user.gender);
      localStorage.setItem("isAdmin", user.is_admin.toString());

      // Apply theme based on gender
      if (user.gender === "male") {
        document.body.classList.add("theme-blue");
      } else {
        document.body.classList.remove("theme-blue");
      }

      toast.success(`Добро пожаловать, ${user.name}!`);

      if (user.is_admin) {
        navigate("/admin");
      } else {
        navigate("/questionnaire");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FlowerDecoration />
      
      <Card className="w-full max-w-md relative z-10 border-4 shadow-2xl">
        <CardHeader className="text-center gradient-pink text-white rounded-t-lg">
          <CardTitle className="text-4xl font-bold text-shadow-glow mb-2">
            🎂 С Днём Рождения! 🎂
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Специально для Ксении Мурадовой ✨
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flower-pattern">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                Ваше имя
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-lg border-2 focus:ring-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin" className="text-lg font-semibold">
                Пин-код (4 цифры)
              </Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                required
                className="text-lg text-center text-2xl tracking-widest border-2 focus:ring-4"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-6 gradient-pink border-2 border-white/50 shadow-lg hover:scale-105 transition-transform"
              disabled={loading || pin.length !== 4}
            >
              {loading ? "Вход..." : "Войти 💝"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;