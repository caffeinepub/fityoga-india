import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "how many days should i workout",
    a: "3-5 days per week is ideal for beginners. As you progress, you can increase to 5-6 days.",
  },
  {
    q: "what should i eat for muscle gain",
    a: "Focus on high-protein foods: eggs, chicken, paneer, lentils, Greek yogurt, and cottage cheese. Aim for 1.6-2g protein per kg of bodyweight.",
  },
  {
    q: "how much water should i drink",
    a: "At least 3-4 liters per day when working out. Increase to 5L on intense training days.",
  },
  {
    q: "how long until i see results",
    a: "Visible changes appear in 4-8 weeks with consistent effort. Body composition shifts in 12 weeks. Stay consistent!",
  },
  {
    q: "best time to workout",
    a: "Morning workouts boost metabolism all day. Evening workouts have peak strength performance. Both work - pick what's sustainable for you.",
  },
  {
    q: "what to eat before workout",
    a: "30-60 min before: banana + peanut butter, or oats + protein. Avoid heavy meals 2 hours before training.",
  },
  {
    q: "what to eat after workout",
    a: "Within 30 min: protein shake or Greek yogurt. Within 2 hours: balanced meal with protein + carbs (rice + dal + chicken).",
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    const keywords = faq.q.split(" ").filter((w) => w.length > 3);
    if (keywords.some((k) => lower.includes(k))) {
      return faq.a;
    }
  }
  return "Great question! Focus on consistency, proper nutrition, and adequate rest. Feel free to ask about workouts, diet, or recovery! 💪";
}

let msgCounter = 0;
function nextId() {
  msgCounter += 1;
  return `msg-${msgCounter}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      from: "bot",
      text: "Hi! I'm your GymCoach AI assistant 🏋️ Ask me anything about workouts, diet, or fitness!",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: nextId(), from: "user", text: input.trim() };
    const botMsg: Message = {
      id: nextId(),
      from: "bot",
      text: getBotResponse(input.trim()),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-80 bg-card border border-border rounded-2xl shadow-teal overflow-hidden"
            data-ocid="chat.panel"
          >
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-foreground">
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">
                  GymCoach Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground"
                data-ocid="chat.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ScrollArea className="h-56 px-3 py-2">
              <div className="flex flex-col gap-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2 p-3 border-t border-border">
              <Input
                placeholder="Ask about workouts, diet..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="text-xs h-8"
                data-ocid="chat.input"
              />
              <Button
                size="icon"
                className="h-8 w-8 bg-primary text-primary-foreground shrink-0"
                onClick={sendMessage}
                data-ocid="chat.send.button"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-teal pulse-teal hover:bg-primary/90 transition-colors"
        data-ocid="chat.open_modal_button"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
