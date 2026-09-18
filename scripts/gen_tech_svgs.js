import fs from 'fs';
import path from 'path';

const dir = path.resolve('public', 'images', 'tech');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'python.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#1e1e2f" stroke="#3776ab" stroke-width="16"/>
    <g transform="translate(100, 100) scale(0.61)">
      <path fill="#3776ab" d="M255.5 0c-66.8 0-62.7 28.9-62.7 28.9l.1 29.9h63.8v9.1H166.3s-41.5-4.7-41.5 41.5v61.4c0 38.6 33.6 40.5 33.6 40.5h20.1v-28.5s-1.1-33.6 33-33.6h57.4s31.8.5 31.8-31v-87.1s4.8-40.2-55.2-40.2zm-32.9 24.6c6.4 0 11.6 5.2 11.6 11.6s-5.2 11.6-11.6 11.6-11.6-5.2-11.6-11.6 5.2-11.6 11.6-11.6z"/>
      <path fill="#ffd43b" d="M256.5 512c66.8 0 62.7-28.9 62.7-28.9l-.1-29.9h-63.8v-9.1h90.4s41.5 4.7 41.5-41.5v-61.4c0-38.6-33.6-40.5-33.6-40.5h-20.1v28.5s1.1 33.6-33 33.6h-57.4s-31.8-.5-31.8 31v87.1s-4.8 40.2 55.2 40.2zm32.9-24.6c-6.4 0-11.6-5.2-11.6-11.6s5.2-11.6 11.6-11.6 11.6 5.2 11.6 11.6-5.2 11.6-11.6 11.6z"/>
    </g>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#ffd43b" text-anchor="middle">PYTHON</text>
  </svg>`,

  'pytorch.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#1b1b24" stroke="#ee4c2c" stroke-width="16"/>
    <path fill="#ee4c2c" d="M285.5 120a10 10 0 0 0-14.1 0l-58.4 58.4a84 84 0 1 0 102.5 0l-15.9-15.9a61.5 61.5 0 1 1-72.5 0l44.3-44.3a10 10 0 0 0 0-14.1z"/>
    <circle cx="302" cy="168" r="16" fill="#ee4c2c"/>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#ee4c2c" text-anchor="middle">PYTORCH</text>
  </svg>`,

  'tensorflow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#181a20" stroke="#ff6f00" stroke-width="16"/>
    <g transform="translate(136, 120) scale(0.95)">
      <path fill="#e53935" d="M120 0L240 70V150L190 120V260L120 220V0Z"/>
      <path fill="#ff9800" d="M120 0L0 70V150L50 120V260L120 220V0Z"/>
      <path fill="#ffa726" d="M120 220L190 260L120 300L50 260L120 220Z"/>
    </g>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ff9800" text-anchor="middle">TENSORFLOW</text>
  </svg>`,

  'ros2.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#16192b" stroke="#22314e" stroke-width="16"/>
    <circle cx="256" cy="220" r="28" fill="#58a6ff"/>
    <circle cx="180" cy="220" r="24" fill="#ffffff"/>
    <circle cx="332" cy="220" r="24" fill="#ffffff"/>
    <circle cx="200" cy="150" r="24" fill="#ffffff"/>
    <circle cx="312" cy="150" r="24" fill="#ffffff"/>
    <circle cx="200" cy="290" r="24" fill="#ffffff"/>
    <circle cx="312" cy="290" r="24" fill="#ffffff"/>
    <circle cx="256" cy="120" r="22" fill="#58a6ff"/>
    <circle cx="256" cy="320" r="22" fill="#58a6ff"/>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#58a6ff" text-anchor="middle">ROS 2</text>
  </svg>`,

  'docker.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#111f2e" stroke="#2496ed" stroke-width="16"/>
    <g fill="#2496ed" transform="translate(80, 160) scale(0.7)">
      <rect x="160" y="60" width="45" height="45" rx="6"/>
      <rect x="215" y="60" width="45" height="45" rx="6"/>
      <rect x="270" y="60" width="45" height="45" rx="6"/>
      <rect x="105" y="115" width="45" height="45" rx="6"/>
      <rect x="160" y="115" width="45" height="45" rx="6"/>
      <rect x="215" y="115" width="45" height="45" rx="6"/>
      <rect x="270" y="115" width="45" height="45" rx="6"/>
      <rect x="325" y="115" width="45" height="45" rx="6"/>
      <path d="M470 180c-15-5-55-10-85 10-25-18-60-15-70-15H20c-10 40 10 110 90 140 90 35 240 35 320-30 45-38 50-95 40-105z"/>
    </g>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="46" font-weight="bold" fill="#2496ed" text-anchor="middle">DOCKER</text>
  </svg>`,

  'aws.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#171d26" stroke="#ff9900" stroke-width="16"/>
    <g transform="translate(100, 150) scale(0.62)">
      <text x="250" y="150" font-family="Arial, sans-serif" font-size="160" font-weight="900" fill="#ffffff" text-anchor="middle">aws</text>
      <path d="M80 230c100 65 240 65 340 0" fill="none" stroke="#ff9900" stroke-width="24" stroke-linecap="round"/>
      <polygon points="420,205 445,235 410,245" fill="#ff9900"/>
    </g>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#ff9900" text-anchor="middle">AWS BEDROCK</text>
  </svg>`,

  'fastapi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#102322" stroke="#05998b" stroke-width="16"/>
    <path fill="#05998b" d="M280 100L180 260h70l-30 120 120-170h-70z"/>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#05998b" text-anchor="middle">FASTAPI</text>
  </svg>`,

  'cpp.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <circle cx="256" cy="256" r="240" fill="#14233c" stroke="#00599c" stroke-width="16"/>
    <g transform="translate(120, 130) scale(0.9)">
      <text x="90" y="170" font-family="Arial, sans-serif" font-size="180" font-weight="900" fill="#00599c" text-anchor="middle">C</text>
      <text x="180" y="130" font-family="Arial, sans-serif" font-size="110" font-weight="900" fill="#659ad2">++</text>
    </g>
    <text x="256" y="440" font-family="Arial, sans-serif" font-size="46" font-weight="bold" fill="#659ad2" text-anchor="middle">C++ / DSA</text>
  </svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, name), content.trim());
}
console.log('Successfully generated tech stack SVGs');
