"use client";

export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(200,168,130,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(43,69,112,0.04) 0%, transparent 40%)",
        }}
      />

      {/* Subtle dot pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="24" cy="24" r="1" fill="#9B7B4F" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
