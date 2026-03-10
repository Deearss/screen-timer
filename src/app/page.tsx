import TimerPage from "@/components/timer/TimerPage";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen py-6 px-4">
      <div className="w-full max-w-110 sm:max-w-130 space-y-2.5">
        <TimerPage />
      </div>
    </main>
  );
}
