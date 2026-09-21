type EmbossedLeavesProps = {
  className?: string;
};

function EmbossedLeaves({ className }: EmbossedLeavesProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 140"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M92 128c2-22 8-48 28-68" />
        <path d="M118 64c12-4 22-2 30 8-14 6-26 10-30-8z" />
        <path d="M108 78c10-2 18 2 24 12-12 4-20 6-24-12z" />
        <path d="M98 96c8 0 16 6 18 16-10 2-16 2-18-16z" />
        <path d="M86 128c-8-24-28-44-52-52" />
        <path d="M36 78c-10-6-14-16-12-26 12 6 20 14 12 26z" />
        <path d="M48 90c-8-4-12-12-10-22 10 6 16 12 10 22z" />
        <path d="M62 108c-6-2-12-8-12-18 8 4 12 10 12 18z" />
        <path d="M90 118c18-10 38-10 54 2" />
        <path d="M142 116c8 4 12 12 10 22-8-4-14-10-10-22z" />
      </g>
    </svg>
  );
}

export default EmbossedLeaves;
