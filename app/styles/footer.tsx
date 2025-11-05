export default function Footer() {
  return (
    <footer className="text-sm text-center space-y-1 text-[var(--text-light)] m-12">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-[var(--brand)] font-medium">
          AI English Tutor
        </span>
        . All rights reserved.
      </p>
      <p>Powered by Google Gemini</p>
    </footer>
  );
}
