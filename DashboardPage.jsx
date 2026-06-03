import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import WeeklyChart from '../components/WeeklyChart';
import styles from './DashboardPage.module.css';

const FALLBACK_WEEKLY = [
  { day: 'Mon', calories: 342 }, { day: 'Tue', calories: 276 },
  { day: 'Wed', calories: 451 }, { day: 'Thu', calories: 190 },
  { day: 'Fri', calories: 418 }, { day: 'Sat', calories: 487 },
  { day: 'Sun', calories: 0 },
];

const MEAL_PLAN = [
  { name: 'Oat porridge + berries', time: 'Breakfast · 7:30 AM', cal: 380 },
  { name: 'Grilled chicken wrap', time: 'Lunch · 12:30 PM', cal: 520 },
  { name: 'Protein smoothie', time: 'Snack · 4:00 PM', cal: 210 },
  { name: 'Salmon + quinoa bowl', time: 'Dinner · 7:00 PM', cal: 650 },
];

const TODAY_WORKOUTS = [
  { name: 'Morning Run', detail: '5.2 km · 28 min', status: 'completed', emoji: '🏃' },
  { name: 'Upper Body Strength', detail: '3 sets · 8 exercises', status: 'next', emoji: '💪' },
  { name: 'Evening Yoga', detail: '20 min · flexibility', status: 'scheduled', emoji: '🧘' },
];

const STATUS_STYLES = {
  completed: { bg: '#1a2e22', color: '#63e2a3', label: 'Done' },
  next:      { bg: '#2a1f0e', color: '#EF9F27', label: 'Next' },
  scheduled: { bg: '#1a1d25', color: '#5a5a5a', label: 'Scheduled' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, workouts, loading, error } = useDashboard();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [aiInput, setAiInput] = useState('');

  const dashUser = data?.user || user;
  const weeklyData = data?.weeklyCalories || FALLBACK_WEEKLY;
  const bmi = dashUser?.bmi || (dashUser?.profile?.heightCm && dashUser?.profile?.weightKg
    ? ((dashUser.profile.weightKg / Math.pow(dashUser.profile.heightCm / 100, 2)).toFixed(1))
    : '22.4');

  const firstName = dashUser?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    setAiInput('');
    // Wire to your NLP/Llama 3 endpoint here
    alert(`AI Coach received: "${aiInput}"`);
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingDot} />
        <span>Loading your dashboard…</span>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar active={activeNav} onNav={setActiveNav} />

      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.greeting}>
              {greeting}, <span className={styles.name}>{firstName}</span>
            </h1>
            <p className={styles.date}>{today} · Week 3 of your 8-week plan</p>
          </div>
          <div className={styles.aiBadge}>
            <span className={styles.dot} />
            AI active
          </div>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {/* Stats row */}
        <div className={styles.statsGrid}>
          <StatCard label="Calories burned" value="487" unit="kcal" change="12% vs yesterday" accent="green" />
          <StatCard label="Steps today" value="7,241" unit="/ 10k" change="4% vs avg" accent="amber" />
          <StatCard label="Heart rate" value="72" unit="bpm" change="Resting" changeUp={false} accent="coral" />
          <StatCard label="Streak" value={`${dashUser?.stats?.streakDays ?? 14}`} unit="days" change="Personal best!" accent="blue" />
        </div>

        {/* Middle section */}
        <div className={styles.midGrid}>
          {/* Today's workouts */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Today's workout
              <span className={styles.cardLink}>View all</span>
            </div>
            {TODAY_WORKOUTS.map((w) => {
              const s = STATUS_STYLES[w.status];
              return (
                <div key={w.name} className={styles.workoutItem}>
                  <div className={styles.exIcon}>{w.emoji}</div>
                  <div>
                    <div className={styles.exName}>{w.name}</div>
                    <div className={styles.exDetail}>{w.detail}</div>
                  </div>
                  <div className={styles.exBadge} style={{ background: s.bg, color: s.color }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity rings */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Activity rings</div>
            <div className={styles.ringWrap}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="58" fill="none" stroke="#1a1d25" strokeWidth="10" />
                <circle cx="70" cy="70" r="58" fill="none" stroke="#63e2a3" strokeWidth="10"
                  strokeDasharray="364.4" strokeDashoffset="91"
                  transform="rotate(-90 70 70)" strokeLinecap="round" />
                <circle cx="70" cy="70" r="44" fill="none" stroke="#1a1d25" strokeWidth="10" />
                <circle cx="70" cy="70" r="44" fill="none" stroke="#EF9F27" strokeWidth="10"
                  strokeDasharray="276.5" strokeDashoffset="83"
                  transform="rotate(-90 70 70)" strokeLinecap="round" />
                <circle cx="70" cy="70" r="30" fill="none" stroke="#1a1d25" strokeWidth="10" />
                <circle cx="70" cy="70" r="30" fill="none" stroke="#378ADD" strokeWidth="10"
                  strokeDasharray="188.5" strokeDashoffset="75"
                  transform="rotate(-90 70 70)" strokeLinecap="round" />
                <text x="70" y="66" textAnchor="middle" fill="#e8e6df" fontSize="18"
                  fontFamily="Space Mono, monospace" fontWeight="700">75%</text>
                <text x="70" y="80" textAnchor="middle" fill="#5a5a5a" fontSize="9"
                  fontFamily="DM Sans, sans-serif">overall</text>
              </svg>
              <div className={styles.ringStats}>
                {[
                  { label: 'Move', val: '75%', color: '#63e2a3' },
                  { label: 'Exercise', val: '70%', color: '#EF9F27' },
                  { label: 'Stand', val: '60%', color: '#378ADD' },
                  { label: 'Streak', val: `${dashUser?.stats?.streakDays ?? 14}`, color: '#e8e6df' },
                ].map((r) => (
                  <div key={r.label} className={styles.ringStat}>
                    <div className={styles.ringStatVal} style={{ color: r.color }}>{r.val}</div>
                    <div className={styles.ringStatLabel}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meal plan */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Meal plan <span className={styles.cardLink}>Edit</span>
            </div>
            {MEAL_PLAN.map((m) => (
              <div key={m.name} className={styles.mealItem}>
                <div>
                  <div className={styles.mealName}>{m.name}</div>
                  <div className={styles.mealTime}>{m.time}</div>
                </div>
                <div className={styles.mealCal}>{m.cal} kcal</div>
              </div>
            ))}
            <div className={styles.mealTotal}>
              <span>Total · {MEAL_PLAN.reduce((s, m) => s + m.cal, 0)} kcal</span>
              <span style={{ color: 'var(--accent)' }}>Target: 1,900 kcal</span>
            </div>
          </div>
        </div>

        {/* AI Coach */}
        <div className={styles.aiCard}>
          <div className={styles.cardTitle}>AI Coach — Llama 3</div>
          <div className={styles.aiMsg}>
            <strong>AI Coach: </strong>
            Great job completing your morning run, {firstName}! Based on your heart rate data and
            muscle fatigue patterns, I recommend starting your upper body session after a 15-minute
            rest. Your form score improved 8% this week — keep it up! 💪
          </div>
          <div className={styles.aiInputRow}>
            <input
              className={styles.aiInput}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
              placeholder="Ask your AI coach anything…"
            />
            <button className={styles.aiSend} onClick={handleAiSend}>Send</button>
          </div>
        </div>

        {/* Bottom: weekly chart + BMI */}
        <div className={styles.bottomGrid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Weekly activity <span className={styles.cardSub}>kcal burned</span></div>
            <WeeklyChart data={weeklyData} />
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Body stats</div>
            <div className={styles.bmiBox}>
              <div className={styles.bmiVal}>{bmi}</div>
              <div className={styles.bmiLabel}>BMI · Normal range</div>
            </div>
            <div className={styles.bodyGrid}>
              {[
                { label: 'Weight', val: `${dashUser?.profile?.weightKg ?? 58} kg`, color: 'var(--amber)' },
                { label: 'Height', val: `${dashUser?.profile?.heightCm ?? 161} cm`, color: 'var(--blue)' },
                { label: 'Body fat', val: '21%', color: 'var(--accent)' },
                { label: 'VO2 score', val: '92%', color: 'var(--coral)' },
              ].map((b) => (
                <div key={b.label} className={styles.bodyCell}>
                  <div className={styles.bodyCellVal} style={{ color: b.color }}>{b.val}</div>
                  <div className={styles.bodyCellLabel}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
