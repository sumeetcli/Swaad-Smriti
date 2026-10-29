import React from 'react';
import { TEAM_MEMBERS, COURSE_INFO } from '../data/dishes';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Header */}
      <header className="pb-6 border-b border-[var(--border-warm)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="stamp-badge">
            Academic Project
          </span>
          <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
            COURSE ARCHIVE
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          About Swaad Smriti
        </h1>
        <p className="font-heading italic text-lg sm:text-xl text-[#B3261E] dark:text-[#E25B53] mt-2">
          {COURSE_INFO.tagline}
        </p>
      </header>

      {/* Project Purpose */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 sm:p-8 recipe-card-stitch space-y-4">
        <div className="flex items-center gap-2.5 text-[#B3261E] dark:text-[#E25B53]">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
            Project Purpose
          </h2>
        </div>
        <p className="text-base text-[var(--text-primary)] leading-relaxed font-serif">
          {COURSE_INFO.purpose}
        </p>
      </section>

      {/* Course Details */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-[#5B7A3A] dark:text-[#799F4E]">
          <GraduationCap className="w-5 h-5" />
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
            Course & Institution
          </h2>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] block font-mono">
                Course
              </span>
              <span className="font-heading font-semibold text-[var(--text-primary)] text-base">
                {COURSE_INFO.courseName}
              </span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] block font-mono">
                Institution
              </span>
              <span className="font-heading font-semibold text-[var(--text-primary)] text-base">
                {COURSE_INFO.institution}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Student Team */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-3">
          <div className="flex items-center gap-2.5 text-[#B3261E] dark:text-[#E25B53]">
            <Users className="w-5 h-5" />
            <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              Student Team
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            6 CONTRIBUTORS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.rollNo}
              className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-5 recipe-card-stitch relative hover:border-amber-600/30 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base text-[var(--text-primary)]">
                  {member.name}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] mt-1 tracking-wider">
                  Roll No: {member.rollNo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
