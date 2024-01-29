import { useState } from "react";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    if (theme === "dark") {
      return setTheme("light");
    }

    if (theme === "light") {
      return setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleTheme}
      aria-label="Change theme">
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </Button>
  );
};
