import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider
      themes={["light", "dark"]}
      attribute="class"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}
