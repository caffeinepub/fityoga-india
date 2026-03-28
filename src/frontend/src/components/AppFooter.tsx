import { Dumbbell, Heart } from "lucide-react";

export default function AppFooter() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">
            <span className="text-primary">GymCoach</span> Pro
          </span>
        </div>
        <p>
          © {year}. Built with{" "}
          <Heart className="w-3 h-3 inline text-secondary fill-current" /> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
        <div className="flex items-center gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}
