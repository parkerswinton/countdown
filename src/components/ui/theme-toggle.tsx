import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "./theme-provider";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
      className="size-8"
    >
      <Sun className="dark:scale-0" />
      <Moon className="absolute scale-0 dark:scale-100" />
    </Button>
  );
};
