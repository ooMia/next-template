import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider
      themes={["light", "dark"]}
      attribute="class"
      disableTransitionOnChange
      storageKey="_herbicide_theme"
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}

//   /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
//   attribute?: string | 'class' | undefined;
//   /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
//   value?: ValueObject | undefined;
//   /** Nonce string to pass to the inline script for CSP headers */
//   nonce?: string | undefined;
//   /** React children */
//   children: React.ReactNode;
