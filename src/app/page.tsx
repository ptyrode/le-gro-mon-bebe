"use client";

import { useEffect, useState } from "react";
import BottomNav, { type View } from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";
import Onboarding from "@/components/Onboarding";
import Settings from "@/components/Settings";
import Timeline from "@/components/Timeline";
import { usePregnancy } from "@/hooks/usePregnancy";
import {
  clampWeek,
  equivalenceForWeek,
  rawGestationalWeek,
} from "@/lib/pregnancy";

export default function Home() {
  const {
    loading,
    state,
    start,
    setCategory,
    setLastPeriodDate,
    setNotificationsEnabled,
    setLastSeenWeek,
    reset,
  } = usePregnancy();
  const [view, setView] = useState<View>("dashboard");

  // Notif Option A : à l'ouverture, si une nouvelle semaine a commencé.
  useEffect(() => {
    if (!state || !state.notifications.enabled) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const week = clampWeek(rawGestationalWeek(state.pregnancy.lastPeriodDate));
    if (week <= state.notifications.lastSeenWeek) return;

    const item = equivalenceForWeek(state.pregnancy.category, week);
    new Notification("Bébé a grandi ! 🎉", {
      body: `Semaine ${week} : bébé fait maintenant la taille d'${item.name} ${item.emoji}`,
    });
    setLastSeenWeek(week);
  }, [state, setLastSeenWeek]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-4xl">
        🍼
      </div>
    );
  }

  if (!state) {
    return <Onboarding onStart={start} />;
  }

  return (
    <>
      {view === "dashboard" && (
        <Dashboard state={state} onSetCategory={setCategory} />
      )}
      {view === "timeline" && <Timeline state={state} />}
      {view === "settings" && (
        <Settings
          state={state}
          onSetCategory={setCategory}
          onSetLastPeriodDate={setLastPeriodDate}
          onSetNotificationsEnabled={setNotificationsEnabled}
          onReset={reset}
        />
      )}
      <BottomNav view={view} onChange={setView} />
    </>
  );
}
