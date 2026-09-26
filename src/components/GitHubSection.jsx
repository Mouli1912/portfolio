import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function GitHubSection() {
  const [profile, setProfile] = useState(null);
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
      <div className="rounded-[2rem] border border-[#DDD3C3] bg-[#FFFDF8] p-8 shadow-[0_10px_30px_rgba(29,29,27,0.04)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#B58A55]">GitHub</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1D1D1B]">Live developer activity</h2>
            <p className="mt-4 max-w-2xl text-[#68645D]">A transparent view into repository momentum, community presence, and the languages shaping recent work.</p>
          </div>
          {profile ? (
            <div className="flex flex-wrap gap-3 text-sm text-[#68645D]">
              <span className="rounded-full border border-[#DDD3C3] bg-[#EDE5D6] px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1B]">Followers: {profile.followers}</span>
              <span className="rounded-full border border-[#DDD3C3] bg-[#EDE5D6] px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1B]">Repos: {profile.public_repos}</span>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-[1.5rem] border border-[#DDD3C3] bg-[#F7F3EA] p-4">
            {loading ? (
              <div className="h-48 animate-pulse rounded-[1.2rem] bg-[#EDE5D6]" />
            ) : (
              <img
                src={`https://ghchart.rschong.com/${profile?.login || 'Mouli1912'}?theme=github-light`}
                alt="GitHub contribution graph"
                className="h-full w-full rounded-[1.2rem] object-cover"
              />
            )}
          </motion.div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-[#DDD3C3] bg-[#F7F3EA] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B58A55]">Languages</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {languages.length ? languages.map((language) => (
                  <span key={language} className="rounded-full border border-[#DDD3C3] bg-[#FFFDF8] px-3.5 py-1.5 text-xs font-medium text-[#1D1D1B]">{language}</span>
                )) : <span className="text-[#68645D]">No language data available yet.</span>}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[#DDD3C3] bg-gradient-to-br from-[#EDE5D6]/80 to-[#F7F3EA] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B58A55]">Profile</p>
              <p className="mt-3 text-[#68645D]">{profile?.bio || 'Building polished digital experiences with React, design systems, and thoughtful motion.'}</p>
              <a
                href={profile?.html_url}
                className="mt-4 inline-flex rounded-full bg-[#1D1D1B] px-5 py-2 text-xs font-semibold text-[#F7F3EA] transition-all hover:bg-[#B58A55] hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
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
