import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function GitHubSection({ theme }) {
  const [profile, setProfile] = useState(null);
  const isDark = theme === 'dark';
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/Mouli1912');
        const userData = await userResponse.json();
        const reposResponse = await fetch('https://api.github.com/users/Mouli1912/repos?per_page=100');
        const reposData = await reposResponse.json();
        const languageSet = [...new Set(reposData.map((repo) => repo.language).filter(Boolean))];
        setProfile(userData);
        setLanguages(languageSet);
      } catch (error) {
        console.error('GitHub profile fetch failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className={`rounded-[2rem] border p-8 backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-900/70 shadow-[0_0_80px_rgba(30,64,175,0.18)]' : 'border-slate-200 bg-white/80 shadow-[0_0_60px_rgba(148,163,184,0.20)]'}`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">GitHub</p>
            <h2 className={`mt-3 text-3xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Live developer activity</h2>
            <p className={`mt-4 max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>A transparent view into repository momentum, community presence, and the languages shaping recent work.</p>
          </div>
          {profile ? (
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-700">Followers: {profile.followers}</span>
              <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-2 text-fuchsia-700">Repos: {profile.public_repos}</span>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div whileHover={{ y: -6 }} className={`overflow-hidden rounded-[1.5rem] border p-4 ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200 bg-slate-100/80'}`}>
            {loading ? (
              <div className={`h-48 animate-pulse rounded-[1.2rem] ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            ) : (
              <img
                src={`https://ghchart.rschong.com/${profile?.login || 'Mouli1912'}?theme=github-dark`}
                alt="GitHub contribution graph"
                className="h-full w-full rounded-[1.2rem] object-cover"
              />
            )}
          </motion.div>

          <div className="space-y-4">
            <div className={`rounded-[1.5rem] border p-5 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
              <p className={`text-sm uppercase tracking-[0.3em] ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`}>Languages</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {languages.length ? languages.map((language) => (
                  <span key={language} className={`rounded-full border px-3 py-2 text-sm ${isDark ? 'border-white/10 bg-slate-900/80 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>{language}</span>
                )) : <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>No language data available yet.</span>}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-5">
              <p className={`text-sm uppercase tracking-[0.3em] ${isDark ? 'text-fuchsia-200' : 'text-fuchsia-700'}`}>Profile</p>
              <p className={`mt-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{profile?.bio || 'Building polished digital experiences with React, design systems, and thoughtful motion.'}</p>
              <a href={profile?.html_url} className={`mt-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium ${isDark ? 'text-cyan-200' : 'text-cyan-700'}`} target="_blank" rel="noreferrer">
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GitHubSection;
