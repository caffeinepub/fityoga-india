import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <Link to="/dashboard">
        <Button variant="outline" size="sm" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </Link>
      <h1 className="font-display text-2xl font-bold mb-4">Profile</h1>
      <p className="text-muted-foreground">
        Your profile settings will appear here.
      </p>
    </div>
  );
}
