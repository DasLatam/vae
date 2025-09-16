// src/components/Logo.tsx
export function Logo() {
  return (
    <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Fondo celeste claro con bordes redondeados */}
      <rect width="100" height="100" rx="16" fill="#E0F2FE" />
      {/* Emoji centrado */}
      <text x="50" y="52" dominantBaseline="middle" textAnchor="middle" fontSize="60">
        🗳️
      </text>
    </svg>
  );
}