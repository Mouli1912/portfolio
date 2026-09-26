import React from 'react';

function SectionHeading({ theme, eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#B58A55]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold sm:text-4xl text-[#1D1D1B] tracking-tight">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-[#68645D]">{description}</p>
    </div>
  );
}

export default SectionHeading;
