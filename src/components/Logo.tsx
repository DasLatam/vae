// src/components/Logo.tsx
export function Logo() {
  return (
    <svg width="50" height="50" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="20" fill="#F0F8FF"/>
      <path d="M20 30H100L60 70L20 30Z" fill="#75AADB"/>
      <path d="M25 35L60 70L95 35" stroke="#F5D47A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 70V95" stroke="#F5D47A" strokeWidth="6" strokeLinecap="round"/>
      <rect x="20" y="90" width="80" height="10" fill="#75AADB"/>
    </svg>
  );
}