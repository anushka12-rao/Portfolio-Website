import React, { useState, useEffect, useMemo } from 'react';
import { Trophy } from 'lucide-react';
import AchievementCard from '../../components/achievement/AchievementCard';
import { achievementService } from '../../services/achievementService';
import { mockAchievements } from '../../utils/mockData';

export default function Achievements() {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementService.getPublicAchievements()
      .then((data) => {
        if (data && data.length > 0) setAchievements(data);
      })
      .catch((err) => console.warn('Using default achievements:', err))
      .finally(() => setLoading(false));
  }, []);

  const sortedAchievements = useMemo(() => {
    return [...achievements]
      .filter((a) => a.visible !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [achievements]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>Milestones & Certifications</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Recognitions & Credentials
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Industry certifications, hackathon awards, leadership honors, and professional milestones achieved across my engineering career.
        </p>
      </div>

      <div className="space-y-6">
        {sortedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement._id || achievement.title}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
}
