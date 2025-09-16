// src/app/icon.tsx
import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          background: '#E0F2FE', // Mismo fondo que el logo
          borderRadius: '6px',
        }}
      >
        🗳️
      </div>
    ),
    {
      ...size,
    }
  )
}