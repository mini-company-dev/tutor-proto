module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/mini-studio-ui/dist/**/*.js",
  ],
  safelist: [
    // spacing
    "p-3",
    "px-5",
    "py-2.5",
    "p-10",

    // text
    "text-lg",
    "text-2xl",
    "text-sm",
    "text-white",
    "text-gray-400",
    "text-[var(--text)]",
    "text-[var(--text-light)]",

    // background
    "bg-white",
    "bg-white/40",
    "bg-white/80",
    "bg-transparent",
    "bg-black/40",
    "bg-black/60",
    "bg-[var(--brand)]",

    // border / shadow / radius
    "border",
    "border-gray-200",
    "shadow-inner",
    "shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
    "rounded-xl",
    "rounded-full",

    // flex / layout / position
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "relative",
    "absolute",
    "overflow-hidden",
    "inset-0",
    "w-full",
    "h-full",
    "z-10",
    "z-50",
  ],

  theme: {},
  plugins: [],
};
