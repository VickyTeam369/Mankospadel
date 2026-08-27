let players = [
  { name: 'Nico Salas', hand: 'Drive', level: '4ta', points: 1240, status: 'Disponible', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80' },
  { name: 'Tomi Aguirre', hand: 'Reves', level: '4ta', points: 1190, status: 'En cancha', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=80' },
  { name: 'Facu Rivas', hand: 'Drive', level: '5ta', points: 980, status: 'Disponible', img: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=500&q=80' },
  { name: 'Santi Vera', hand: 'Reves', level: '5ta', points: 910, status: 'Lesion leve', img: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=500&q=80' },
  { name: 'Fran Molina', hand: 'Drive', level: '6ta', points: 770, status: 'Disponible', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=500&q=80' },
  { name: 'Juli Benitez', hand: 'Reves', level: '6ta', points: 730, status: 'Disponible', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80' }
];

const tournamentPhotos = [
  'WhatsApp Image 2026-05-15 at 22.38.02.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.03.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.03 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.03 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.04.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.04 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.04 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.05.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.05 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.05 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.06.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.06 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.06 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.07.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.07 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.07 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.07 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.07 (4).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.08.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.08 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.08 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.08 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.09.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.09 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.09 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.09 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.10.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.10 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.10 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.10 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.11.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.11 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.11 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.11 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.12.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.12 (1).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.12 (2).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.12 (3).jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.13.jpeg',
  'WhatsApp Image 2026-05-15 at 22.38.13 (1).jpeg'
];

const sponsors = [
  { name: 'Bullpadel Store', type: 'Indumentaria', tier: 'Main sponsor' },
  { name: 'Cancha Norte', type: 'Complejo', tier: 'Sede oficial' },
  { name: 'Hidra Sport', type: 'Bebidas', tier: 'Hidratacion' },
  { name: 'Fisio Pro', type: 'Kinesiologia', tier: 'Salud deportiva' }
];

const groupRows = [
  ['Mankos A', 3, 3, 0, '+16', 9],
  ['La Banda del Globo', 3, 2, 1, '+8', 6],
  ['Revesados', 3, 1, 2, '-4', 3],
  ['Los del Tercer Set', 3, 0, 3, '-20', 0]
];

const bracketRounds = [
  {
    label: 'Cuartos',
    matches: [
      ['Mankos A', 'Los del Tercer Set', '6-2 / 6-4'],
      ['La Banda del Globo', 'Revesados', '7-6 / 4-6 / 10-8'],
      ['Mankos B', 'Pared y Vidrio', 'Pendiente'],
      ['Drive Club', '?ltimo Punto', 'Pendiente']
    ]
  },
  {
    label: 'Semis',
    matches: [
      ['Mankos A', 'La Banda del Globo', 'En vivo'],
      ['Por definir', 'Por definir', 'Pendiente']
    ]
  },
  {
    label: 'Final',
    matches: [['Por definir', 'Por definir', 'Domingo 20:00']]
  }
];

const nextMatches = [
  { court: 'Cancha 1', match: 'Mankos A vs La Banda del Globo', time: 'Ahora', stage: 'Semifinal' },
  { court: 'Cancha 2', match: 'Mankos B vs Pared y Vidrio', time: '19:30', stage: 'Cuartos' },
  { court: 'Cancha 3', match: 'Drive Club vs ?ltimo Punto', time: '20:15', stage: 'Cuartos' }
];

let exhibitionSettings = {
  exhibitionTitle: 'Exhibicion Mankos Padel',
  exhibitionDescription: 'Jugamos todas las semanas los lunes y miercoles.',
  playdayVenue: '@puntosport'
};

let exhibitionConfirmed = {
  0: ['Nico Salas', 'Tomi Aguirre', 'Facu Rivas', 'Santi Vera'],
  2: ['Fran Molina', 'Juli Benitez', 'Nico Salas', 'Facu Rivas'],
  5: []
};

let exhibitionSchedule = {
  0: {
    type: 'exhibition',
    enabled: true,
    time: '20:00',
    venue: '@puntosport',
    matches: [
      { group: 'Grupo A', time: '20:00', court: 'Cancha 1', teamA: 'Nico Salas / Tomi Aguirre', teamB: 'Facu Rivas / Santi Vera', result: 'Pendiente' }
    ]
  },
  2: {
    type: 'exhibition',
    enabled: true,
    time: '20:00',
    venue: '@puntosport',
    matches: [
      { group: 'Grupo A', time: '20:00', court: 'Cancha 1', teamA: 'Fran Molina / Juli Benitez', teamB: 'Nico Salas / Facu Rivas', result: 'Pendiente' }
    ]
  }
};

const state = {
  view: 'torneos',
  teamAScore: 4,
  teamBScore: 3,
  sets: '6-4, 3-6',
  selectedAgendaDay: null,
  pairsModalOpen: false,
  pairMatchesModalOpen: false,
  resultsModalOpen: false,
  resultsLockedModalOpen: false,
  galleryModalOpen: false,
  selectedGalleryPhoto: 0,
  selectedPairKey: '',
  registrationModalOpen: false,
  liveFollowModalOpen: false,
  introVideoOpen: true,
  pairs: [
    ['Nico Salas', 'Tomi Aguirre'],
    ['Facu Rivas', 'Santi Vera'],
    ['Fran Molina', 'Juli Benitez']
  ]
};

const liveConfig = {
  tournamentDate: '2026-06-13',
  youtubeUrl: 'https://www.youtube.com/'
};

const nextTournament = {
  title: 'Proximo Torneo Mankos',
  date: 'Sabado 13 de junio',
  time: 'Desde las 15:00',
  venue: 'Punto Sport',
  category: 'Categoria libre por parejas',
  spots: 'Cupos limitados',
  whatsappNumber: '5493516698856',
  whatsappText: 'Info para el torneo'
};

const root = document.getElementById('root');

async function loadSiteData() {
  try {
    let response = await fetch('/api/public-data?ts=' + Date.now());
    if (!response.ok) response = await fetch('./src/data/site-data.json?ts=' + Date.now());
    if (!response.ok) return;

    const data = await response.json();
    if (Array.isArray(data.players)) players = data.players;
    if (data.settings) exhibitionSettings = { ...exhibitionSettings, ...data.settings };
    if (data.exhibitionConfirmed) exhibitionConfirmed = data.exhibitionConfirmed;
    if (data.exhibitionSchedule) exhibitionSchedule = data.exhibitionSchedule;
  } catch (error) {
    console.warn('No se pudo cargar la configuracion editable.', error);
  }
}

function icon(name) {
  const icons = {
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4ZM5 6H3v2a4 4 0 0 0 4 4M19 6h2v2a4 4 0 0 1-4 4"/></svg>',
    users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    money: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/></svg>',
    ad: '<svg viewBox="0 0 24 24"><path d="M3 11v3a2 2 0 0 0 2 2h2l4 4v-4l8-3V6l-8 3H5a2 2 0 0 0-2 2Z"/><path d="M19 8.5a4 4 0 0 1 0 2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    radio: '<svg viewBox="0 0 24 24"><path d="M4.9 19.1a10 10 0 0 1 14.2 0M8.5 15.5a5 5 0 0 1 7 0M12 12h.01M12 3v9"/></svg>',
    live: '<svg viewBox="0 0 24 24"><path d="M5 5h14v14H5z"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    reset: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 3v6h6"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="m8 5 12 7-12 7V5Z"/></svg>',
    dice: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/></svg>',
    crown: '<svg viewBox="0 0 24 24"><path d="m3 7 5 5 4-8 4 8 5-5-2 12H5L3 7Z"/></svg>',
    video: '<svg viewBox="0 0 24 24"><path d="M15 10l5-3v10l-5-3v-4ZM3 6h12v12H3z"/></svg>',
    rain: '<svg viewBox="0 0 24 24"><path d="M17.5 18a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.2-1.7A4.5 4.5 0 0 0 6.5 18h11Z"/><path d="M8 20v2M12 19v2M16 20v2"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M3 21l1.7-5.1A8.4 8.4 0 1 1 8 19.2L3 21Z"/><path d="M9.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4l.8 1.8c.1.3.1.5-.1.7l-.4.5c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2.1 2 .3.2.5.2.7 0l.6-.7c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.6 0 .6-.4 1.3-.9 1.5-.6.3-1.5.3-2.8-.2-2.4-.9-4.3-2.9-5.2-5.2-.5-1.2-.5-2.2-.2-2.8Z"/></svg>'
    ,
    calendar: '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>'
  };
  return `<span class="icon">${icons[name] || ''}</span>`;
}

function setView(view) {
  state.view = view;
  render();
}

function addPoint(team) {
  if (team === 'a') state.teamAScore += 1;
  if (team === 'b') state.teamBScore += 1;
  render();
}

function resetScore() {
  state.teamAScore = 0;
  state.teamBScore = 0;
  render();
}

function shufflePairs() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  state.pairs = [
    [shuffled[0].name, shuffled[1].name],
    [shuffled[2].name, shuffled[3].name],
    [shuffled[4].name, shuffled[5].name]
  ];
  render();
}

function openAgendaDay(dayKey) {
  state.selectedAgendaDay = dayKey;
  state.pairsModalOpen = false;
  state.pairMatchesModalOpen = false;
  state.resultsModalOpen = false;
  state.resultsLockedModalOpen = false;
  state.selectedPairKey = '';
  render();
}

function closeAgendaDay() {
  state.selectedAgendaDay = null;
  state.pairsModalOpen = false;
  state.pairMatchesModalOpen = false;
  state.resultsModalOpen = false;
  state.resultsLockedModalOpen = false;
  state.selectedPairKey = '';
  render();
}

function showAgendaPairs() {
  state.pairsModalOpen = true;
  state.pairMatchesModalOpen = false;
  state.selectedPairKey = '';
  render();
}

function closeAgendaPairs() {
  state.pairsModalOpen = false;
  state.pairMatchesModalOpen = false;
  state.selectedPairKey = '';
  render();
}

function selectAgendaPair(pairKey) {
  state.selectedPairKey = pairKey;
  state.pairMatchesModalOpen = true;
  render();
}

function closePairMatches() {
  state.pairMatchesModalOpen = false;
  render();
}

function openResultsModal() {
  const day = weekAgenda().find((agendaDay) => agendaDay.key === state.selectedAgendaDay);
  if (!canViewResultsFor(day)) {
    state.resultsLockedModalOpen = true;
    state.resultsModalOpen = false;
    render();
    return;
  }

  state.resultsModalOpen = true;
  state.resultsLockedModalOpen = false;
  render();
}

function closeResultsModal() {
  state.resultsModalOpen = false;
  state.resultsLockedModalOpen = false;
  render();
}

function openRegistrationModal() {
  state.registrationModalOpen = true;
  render();
}

function closeRegistrationModal() {
  state.registrationModalOpen = false;
  render();
}

function openGalleryModal(photoIndex = 0) {
  state.selectedGalleryPhoto = Number(photoIndex) || 0;
  state.galleryModalOpen = true;
  render();
}

function closeGalleryModal() {
  state.galleryModalOpen = false;
  render();
}

function selectGalleryPhoto(photoIndex) {
  state.selectedGalleryPhoto = Number(photoIndex) || 0;
  render();
}

function openLiveFollowModal() {
  state.liveFollowModalOpen = true;
  render();
}

function closeLiveFollowModal() {
  state.liveFollowModalOpen = false;
  render();
}

function closeIntroVideo() {
  state.introVideoOpen = false;
  render();
}

function isTournamentLive() {
  return new Date().toISOString().slice(0, 10) === liveConfig.tournamentDate;
}

function render() {
  const liveClass = isTournamentLive() ? 'is-live' : 'is-off';
  root.innerHTML = `
    <main>
      <header class="hero">
        <nav class="topbar" aria-label="Principal">
          <div class="brand-row">
            <div class="brand">
              <span class="brand-mark">
                <img src="./src/assets/mankos-icon.png" alt="Torneo de Mankos">
                <a class="admin-secret-link" href="./admin.html" aria-label="Ingresar al panel privado"></a>
              </span>
              <span>Torneo de Mankos</span>
            </div>
            <a class="live-link ${liveClass}" href="${liveConfig.youtubeUrl}" target="_blank" rel="noopener" aria-label="Abrir transmision en vivo por YouTube">
              ${icon('live')}
              <span>LIVE</span>
            </a>
          </div>
          <div class="nav-actions">
            ${navButton('torneos', 'Torneos', 'trophy')}
            <a href="./sponsors.html" target="_blank" rel="noopener">${icon('ad')}<span>Sponsors</span></a>
            <a href="https://www.instagram.com/mankos.padel/" target="_blank" rel="noopener">${icon('instagram')}<span>Instagram</span></a>
          </div>
          <div class="sponsor-ribbon" aria-label="Sponsors oficiales">
            <div class="sponsor-track">
              ${sponsorStrip()}
              ${sponsorStrip()}
            </div>
          </div>
        </nav>
        <section class="hero-grid">
          <div class="hero-copy">
            ${highlightSlider()}
            <div class="hero-actions">
              <button class="primary inscription-button" data-open-registration type="button">${icon('calendar')} Inscribirse Proximo Torneo</button>
            </div>
          </div>
        </section>
      </header>
      <section class="content">${screen()}</section>
      ${agendaModal()}
      ${registrationModal()}
      ${liveFollowModal()}
      ${galleryModal()}
      ${introVideo()}
    </main>
  `;

  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });
  document.querySelectorAll('[data-point]').forEach((button) => {
    button.addEventListener('click', () => addPoint(button.dataset.point));
  });
  document.querySelectorAll('[data-reset]').forEach((button) => button.addEventListener('click', resetScore));
  document.querySelectorAll('[data-shuffle]').forEach((button) => button.addEventListener('click', shufflePairs));
  document.querySelectorAll('[data-agenda-day]').forEach((button) => {
    button.addEventListener('click', () => openAgendaDay(button.dataset.agendaDay));
  });
  document.querySelectorAll('[data-close-agenda]').forEach((button) => button.addEventListener('click', closeAgendaDay));
  document.querySelectorAll('[data-view-pairs]').forEach((button) => button.addEventListener('click', showAgendaPairs));
  document.querySelectorAll('[data-close-pairs]').forEach((button) => button.addEventListener('click', closeAgendaPairs));
  document.querySelectorAll('[data-close-pair-matches]').forEach((button) => button.addEventListener('click', closePairMatches));
  document.querySelectorAll('[data-open-results]').forEach((button) => button.addEventListener('click', openResultsModal));
  document.querySelectorAll('[data-close-results]').forEach((button) => button.addEventListener('click', closeResultsModal));
  document.querySelectorAll('[data-select-pair]').forEach((button) => {
    button.addEventListener('click', () => selectAgendaPair(decodeURIComponent(button.dataset.selectPair)));
  });
  document.querySelectorAll('[data-results-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeResultsModal();
    });
  });
  document.querySelectorAll('[data-pair-matches-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closePairMatches();
    });
  });
  document.querySelectorAll('[data-pairs-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeAgendaPairs();
    });
  });
  document.querySelectorAll('[data-agenda-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeAgendaDay();
    });
  });
  document.querySelectorAll('[data-open-registration]').forEach((button) => button.addEventListener('click', openRegistrationModal));
  document.querySelectorAll('[data-close-registration]').forEach((button) => button.addEventListener('click', closeRegistrationModal));
  document.querySelectorAll('[data-registration-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeRegistrationModal();
    });
  });
  document.querySelectorAll('[data-open-gallery]').forEach((button) => {
    button.addEventListener('click', () => openGalleryModal(button.dataset.openGallery));
  });
  document.querySelectorAll('[data-select-gallery]').forEach((button) => {
    button.addEventListener('click', () => selectGalleryPhoto(button.dataset.selectGallery));
  });
  document.querySelectorAll('[data-close-gallery]').forEach((button) => button.addEventListener('click', closeGalleryModal));
  document.querySelectorAll('[data-gallery-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeGalleryModal();
    });
  });
  document.querySelectorAll('[data-open-live-follow]').forEach((button) => button.addEventListener('click', openLiveFollowModal));
  document.querySelectorAll('[data-close-live-follow]').forEach((button) => button.addEventListener('click', closeLiveFollowModal));
  document.querySelectorAll('[data-live-follow-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeLiveFollowModal();
    });
  });
  document.querySelectorAll('[data-intro-video]').forEach((video) => {
    video.addEventListener('ended', closeIntroVideo);
    video.addEventListener('error', closeIntroVideo);
  });
  document.querySelectorAll('[data-sets]').forEach((input) => {
    input.addEventListener('input', (event) => {
      state.sets = event.target.value;
      document.querySelectorAll('[data-sets]').forEach((other) => {
        if (other !== event.target) other.value = event.target.value;
      });
    });
  });
}

function introVideo() {
  if (!state.introVideoOpen) return '';
  return `
    <div class="intro-video-backdrop" role="dialog" aria-modal="true" aria-label="Video de bienvenida">
      <section class="intro-video-card">
        <video data-intro-video src="./src/assets/intro-mankos.mp4" autoplay muted playsinline preload="auto"></video>
      </section>
    </div>
  `;
}

function navButton(id, label, iconName) {
  return `<button class="${state.view === id ? 'active' : ''}" data-view="${id}">${icon(iconName)}<span>${label}</span></button>`;
}

function sponsorStrip() {
  return `
    <span><img src="./src/assets/sponsors/slider/punto-sport.png" alt="Punto Sport"></span>
    <span><img src="./src/assets/sponsors/slider/ayres.png" alt="Ayres"></span>
    <span><img src="./src/assets/sponsors/slider/multi-espacios.png" alt="Multi Espacios"></span>
    <span><img src="./src/assets/sponsors/slider/ever-win.png" alt="Ever Win"></span>
    <span><img src="./src/assets/sponsors/slider/onix.png" alt="Onix"></span>
    <span><img src="./src/assets/sponsors/slider/balancing.png" alt="Balancing"></span>
    <span><img src="./src/assets/sponsors/slider/de-botanas.png" alt="De Botanas"></span>
    <span><img src="./src/assets/sponsors/slider/korfit.png" alt="Korfit"></span>
    <span><img src="./src/assets/sponsors/slider/sgi.png" alt="SGI"></span>
    <span><img src="./src/assets/sponsors/slider/letonia.png" alt="Letonia"></span>
    <span><img src="./src/assets/sponsors/slider/pick-bet.png" alt="Pick Bet"></span>
  `;
}

function livePanel() {
  return `
    <aside class="live-panel">
      <div class="live-header">
        <span><i></i> En vivo</span>
        <strong>Semifinal</strong>
      </div>
      <div class="teams-score">
        <button class="score-team" data-point="a"><span>Mankos A</span><strong>${state.teamAScore}</strong></button>
        <span class="score-divider">vs</span>
        <button class="score-team" data-point="b"><span>La Banda</span><strong>${state.teamBScore}</strong></button>
      </div>
      <label class="set-input">Sets <input data-sets value="${state.sets}" /></label>
      <div class="panel-actions">
        <button data-reset title="Reiniciar puntos">${icon('reset')}</button>
        <button class="primary" data-point="a">${icon('plus')} Punto Mankos</button>
      </div>
    </aside>
  `;
}

function highlightSlider() {
  const slideDuration = tournamentPhotos.length * 4;
  return `
    <aside class="highlight-panel">
      <button class="slider" data-open-gallery="0" type="button" aria-label="Abrir galeria de fotos del torneo" style="--slide-duration: ${slideDuration}s">
        ${tournamentPhotos.map((photo, index) => `
          <img
            src="./Fotos%20Torneo/${encodeURIComponent(photo)}"
            alt="Momento destacado ${index + 1} del torneo"
            style="--slide-index: ${index}"
          >
        `).join('')}
      </button>
      <div class="highlight-caption">
        <span>Momentos destacados</span>
        <strong>Ultimo torneo Mankos</strong>
      </div>
    </aside>
  `;
}

function galleryModal() {
  if (!state.galleryModalOpen) return '';
  const safeIndex = Math.min(Math.max(state.selectedGalleryPhoto, 0), tournamentPhotos.length - 1);
  const selected = tournamentPhotos[safeIndex];

  return `
    <div class="gallery-modal-backdrop" data-gallery-backdrop>
      <section class="gallery-modal" role="dialog" aria-modal="true" aria-label="Galeria del torneo">
        <button class="modal-close" data-close-gallery type="button" aria-label="Cerrar">&times;</button>
        <span>Galeria</span>
        <h3>Momentos destacados</h3>
        <figure class="gallery-preview">
          <img src="./Fotos%20Torneo/${encodeURIComponent(selected)}" alt="Foto seleccionada del torneo">
        </figure>
        <div class="gallery-thumbs" aria-label="Seleccionar foto">
          ${tournamentPhotos.map((photo, index) => `
            <button class="${index === safeIndex ? 'is-selected' : ''}" data-select-gallery="${index}" type="button" aria-label="Ver foto ${index + 1}">
              <img src="./Fotos%20Torneo/${encodeURIComponent(photo)}" alt="">
            </button>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function screen() {
  if (state.view === 'jugadores') return playersView();
  if (state.view === 'patrocinadores') return sponsorsView();
  if (state.view === 'instagram') return instagramView();
  if (state.view === 'vivo') return liveView();
  return tournamentView();
}

function tournamentView() {
  return `
    <div class="screen tournament-screen">
      <section class="podium-board">
        <article class="champions-card">
          <div>
            <span>Ganadores ultimo torneo</span>
            <p>Campeones Vigentes "MANKOS PADEL 8.0."</p>
          </div>
          <img class="champions-official" src="./src/assets/campeones-edicion-8.png" alt="F. Maubecin y J. Uanini, campeones vigentes de Mankos Padel">
        </article>
        ${exhibitionAgenda()}
      </section>
      <div class="layout-two">
        <div class="block">
          <h3>Proximos partidos</h3>
          <div class="match-list">
            ${nextMatches.map((item) => `
              <article class="match-row">
                <span>${item.time}</span>
                <div><strong>${item.match}</strong><small>${item.stage} &middot; ${item.court}</small></div>
                <b>&rsaquo;</b>
              </article>
            `).join('')}
          </div>
        </div>
        <div class="block">
          <div class="block-title">
            <h3>Sorteo de parejas</h3>
            <button data-shuffle title="Sortear parejas">${icon('dice')}</button>
          </div>
          <div class="pair-grid">
            ${state.pairs.map((pair, index) => `
              <div class="pair"><span>Pareja ${index + 1}</span><strong>${pair[0]}</strong><strong>${pair[1]}</strong></div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="layout-two wide-left">
        <div class="block">
          <h3>Cuadro eliminatorio</h3>
          <div class="bracket">
            ${bracketRounds.map((round) => `
              <div class="round">
                <h4>${round.label}</h4>
                ${round.matches.map((match) => `
                  <div class="bracket-match"><span>${match[0]}</span><span>${match[1]}</span><small>${match[2]}</small></div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="block">
          <h3>Grupo A</h3>
          <table>
            <thead><tr><th>Equipo</th><th>J</th><th>G</th><th>P</th><th>Dif</th><th>Pts</th></tr></thead>
            <tbody>${groupRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function exhibitionAgenda() {
  const days = weekAgenda();
  return `
    <article class="exhibition-calendar">
      <div class="agenda-head">
        <span>Agenda semanal</span>
        <h3>${exhibitionSettings.exhibitionTitle}</h3>
        <p>${exhibitionSettings.exhibitionDescription}</p>
      </div>
      <div class="agenda-grid" aria-label="Calendario semanal de exhibicion">
        ${days.map((day) => `
          <button class="agenda-day ${day.play ? 'is-playday' : ''} ${day.type === 'tournament' ? 'is-tournament' : ''} ${day.suspended ? 'is-suspended' : ''}" data-agenda-day="${day.key}" type="button" aria-label="Ver confirmados para ${day.label} ${day.date}">
            <strong>${day.label}</strong>
            <b>${day.date}</b>
            ${day.time ? `<em>${day.time}</em>` : ''}
            ${day.venue ? `<i>${day.venue}</i>` : ''}
            <small>${day.suspended ? 'Sus.' : day.type === 'tournament' ? 'Torneo' : day.play ? 'Ver' : 'Sin fecha'}</small>
          </button>
        `).join('')}
      </div>
      <button class="live-follow-button" data-open-live-follow type="button">${icon('video')} Seguimiento en vivo</button>
    </article>
  `;
}

function agendaModal() {
  if (!state.selectedAgendaDay) return '';

  const day = weekAgenda().find((item) => item.key === state.selectedAgendaDay);
  if (!day) return '';
  const confirmedCount = day.confirmed.length;
  const eventName = day.type === 'tournament' ? 'Torneo Mankos' : 'Fecha privada';
  const venueAddress = venueAddressFor(day.venue);
  const canViewPairs = day.play && !day.suspended && day.pairs.length > 0;
  const pairButtonLabel = day.pairs.length ? 'Ver Parejas' : 'Parejas sin cargar';
  const podium = finalPodiumFor(day);

  return `
    <div class="agenda-modal-backdrop" data-agenda-backdrop>
      <section class="agenda-modal" role="dialog" aria-modal="true" aria-label="Grupo confirmado">
        <button class="modal-close" data-close-agenda type="button" aria-label="Cerrar">&times;</button>
        <div class="agenda-modal-hero">
          <span>${day.play ? eventName : 'Sin fecha'}</span>
          <h3>${day.label} ${day.date}</h3>
          <div class="agenda-meta-row">
            ${day.time ? `<strong>${day.time} hs</strong>` : ''}
          </div>
          ${day.play ? `
            <div class="venue-address">
              <small>Direccion</small>
              <strong>${venueAddress}</strong>
              ${day.venue ? `<span>${day.venue}</span>` : ''}
            </div>
          ` : ''}
        </div>
        <div class="club-stats" aria-label="Resumen del grupo">
          <div><strong>${confirmedCount}</strong><small>Confirmados</small></div>
        </div>
        ${day.suspended ? `<div class="weather-suspended-banner">${icon('rain')}<strong>Suspendido por mal clima</strong><small>La fecha queda pausada hasta nuevo aviso.</small></div>` : ''}
        <div class="modal-section-title compact-title">
          <span>Club Mankos</span>
          <strong>${day.play ? 'Integrantes confirmados' : 'Sin confirmados'}</strong>
        </div>
        <div class="confirmed-list">
          ${(day.confirmed.length ? day.confirmed : ['Sin confirmados']).map((name) => `
            <div class="confirmed-player">
              <b aria-hidden="true">✓</b>
              <strong>${name}</strong>
            </div>
          `).join('')}
        </div>
        ${podium.length ? `
          <div class="date-podium">
            <span>Podio final</span>
            ${podium.map((team, index) => `
              <article class="place-${index + 1}">
                <b>${index + 1}</b>
                <strong>${team}</strong>
                <small>${index === 0 ? '1er puesto' : index === 1 ? '2do puesto' : '3er puesto'}</small>
              </article>
            `).join('')}
          </div>
        ` : ''}
        <button class="view-pairs-button" data-view-pairs type="button" ${canViewPairs ? '' : 'disabled'}>
          ${pairButtonLabel}
        </button>
        <button class="view-results-button" data-open-results type="button" ${day.suspended ? 'disabled' : ''}>
          Ver resultados
        </button>
        <button class="back-main-button" data-close-agenda type="button">
          Volver al menu principal
        </button>
      </section>
      ${state.pairsModalOpen && canViewPairs ? pairsModal(day) : ''}
      ${state.resultsModalOpen ? resultsModal(day) : ''}
      ${state.resultsLockedModalOpen ? resultsLockedModal() : ''}
    </div>
  `;
}

function pairsModal(day) {
  const selectedPair = state.selectedPairKey;
  const selectedMatches = selectedPair ? pairMatchesFor(day, selectedPair) : [];

  return `
    <div class="pairs-modal-backdrop" data-pairs-backdrop>
      <section class="pairs-modal" role="dialog" aria-modal="true" aria-label="Parejas de la fecha">
        <button class="modal-close" data-close-pairs type="button" aria-label="Cerrar">&times;</button>
        <span>Parejas</span>
        <h3>Con quien jugas</h3>
        <div class="simple-pairs-list">
          ${day.pairs.map((pair, index) => `
            <button class="${selectedPair === pairKey(pair) ? 'is-selected' : ''}" data-select-pair="${encodeURIComponent(pairKey(pair))}" type="button">
              <small>Pareja ${index + 1}</small>
              <div>
                <strong>${pair[0]}</strong>
                <b>con</b>
                <strong>${pair[1]}</strong>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
      ${state.pairMatchesModalOpen && selectedPair ? pairMatchesModal(day, selectedPair, selectedMatches) : ''}
    </div>
  `;
}

function pairMatchesModal(day, selectedPair, selectedMatches) {
  return `
    <div class="pair-matches-backdrop" data-pair-matches-backdrop>
      <section class="pair-matches-modal" role="dialog" aria-modal="true" aria-label="Enfrentamientos de la pareja">
        <button class="modal-close" data-close-pair-matches type="button" aria-label="Cerrar">&times;</button>
        <span>Tus enfrentamientos</span>
        <h3>${selectedPair}</h3>
        <p>Estos son los partidos que tienen que jugar y la cancha asignada para cada turno.</p>
        <div class="pair-match-panel">
          ${selectedMatches.length ? selectedMatches.map((match) => {
            const finished = isFinishedMatch(match);
            return `
            <article class="${finished ? 'is-finished' : 'is-pending'}">
              <b>Turno ${match.round || 1}</b>
              <strong>vs ${match.opponent}</strong>
              <div>
                <small>Cancha</small>
                <span>${match.court || day.venue || exhibitionSettings.playdayVenue}</span>
              </div>
              <em>${finished ? `Finalizado &middot; ${match.result}` : 'Pendiente'}</em>
            </article>
          `;
          }).join('') : '<p>No hay partidos cargados para esta pareja.</p>'}
        </div>
      </section>
    </div>
  `;
}

function isFinishedMatch(match) {
  const result = String(match.result || '').trim();
  const score = parseScore(result);
  return Boolean(score) && score[0] !== score[1] && Math.max(score[0], score[1]) === 6;
}

function parseScore(result = '') {
  const match = String(result).trim().match(/^(\d+)\s*[-/]\s*(\d+)$/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
}

function resultsModal(day) {
  const standings = buildPublicStandings(day.matches || []);
  const groupEntries = Object.entries(standings);

  return `
    <div class="results-modal-backdrop" data-results-backdrop>
      <section class="results-modal" role="dialog" aria-modal="true" aria-label="Resultados y clasificacion">
        <button class="modal-close" data-close-results type="button" aria-label="Cerrar">&times;</button>
        <span>Resultados</span>
        <h3>Tabla y cruces</h3>
        ${groupEntries.length ? `
          ${groupEntries.length === 1 ? singleGroupResults(groupEntries[0][1]) : multiGroupResults(groupEntries, day)}
        ` : '<p class="results-empty">Todavia no hay partidos cargados.</p>'}
      </section>
    </div>
  `;
}

function resultsLockedModal() {
  return `
    <div class="results-modal-backdrop" data-results-backdrop>
      <section class="results-modal results-modal--notice" role="dialog" aria-modal="true" aria-label="Resultados no habilitados">
        <button class="modal-close" data-close-results type="button" aria-label="Cerrar">&times;</button>
        <span>Resultados</span>
        <h3>Aun no estan habilitados</h3>
        <p class="results-empty">Los resultados se habilitan cuando llega el horario del torneo, una vez que se jueguen los partidos.</p>
      </section>
    </div>
  `;
}

function singleGroupResults(rows) {
  return `
    <div class="podium-results">
      ${rows.slice(0, 3).map((row, index) => `
        <article>
          <b>${index + 1}</b>
          <strong>${row.team}</strong>
          <small>${row.points} pts · Dif ${row.diff}</small>
        </article>
      `).join('')}
    </div>
    ${standingsTable(rows)}
  `;
}

function multiGroupResults(groupEntries, day) {
  return `
    <div class="group-results-grid">
      ${groupEntries.map(([group, rows]) => `
        <section>
          <h4>${group}</h4>
          ${standingsTable(rows)}
        </section>
      `).join('')}
    </div>
    ${knockoutTemplate(groupEntries, day.bracket)}
  `;
}

function standingsTable(rows) {
  return `
    <table class="results-table">
      <thead><tr><th>Pareja</th><th>PJ</th><th>G</th><th>P</th><th>Dif</th><th>Pts</th></tr></thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${row.team}</td>
            <td>${row.played}</td>
            <td>${row.won}</td>
            <td>${row.lost}</td>
            <td>${row.diff}</td>
            <td>${row.points}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function knockoutTemplate(groupEntries, savedBracket = {}) {
  const qualifiers = groupEntries.map(([group, rows]) => ({
    group,
    first: rows[0]?.team || `${group} 1`,
    second: rows[1]?.team || `${group} 2`
  }));
  const firstRound = qualifiers.flatMap((item, index) => {
    const next = qualifiers[(index + 1) % qualifiers.length];
    if (!next || item.group === next.group) return [];
    return [{
      label: `${item.group} 1 vs ${next.group} 2`,
      teamA: item.first,
      teamB: next.second
    }];
  });
  const left = firstRound.filter((_, index) => index % 2 === 0);
  const right = firstRound.filter((_, index) => index % 2 === 1);
  const stageLabel = firstRound.length > 2 ? 'Cuartos' : 'Semis';
  const savedFirstRound = savedBracket?.quarter?.length ? savedBracket.quarter : savedBracket?.semi;
  const visibleFirstRound = savedFirstRound?.length ? savedFirstRound : firstRound;
  const finalMatch = savedBracket?.final?.[0] || { teamA: 'Ganador lado A', teamB: 'Ganador lado B', result: 'Pendiente' };
  const leftMatches = visibleFirstRound.filter((_, index) => index % 2 === 0);
  const rightMatches = visibleFirstRound.filter((_, index) => index % 2 === 1);

  return `
    <div class="world-bracket">
      <div class="bracket-side">
        <h4>${stageLabel}</h4>
        ${leftMatches.map((match) => bracketCard(match.label, match.teamA, match.teamB, match.result)).join('')}
      </div>
      <div class="bracket-center">
        <span>Final</span>
        <strong>${finalMatch.teamA}</strong>
        <b>vs</b>
        <strong>${finalMatch.teamB}</strong>
        ${isFinishedMatch(finalMatch) ? `<em>${finalMatch.result}</em>` : ''}
      </div>
      <div class="bracket-side is-right">
        <h4>${stageLabel}</h4>
        ${rightMatches.map((match) => bracketCard(match.label, match.teamA, match.teamB, match.result)).join('')}
      </div>
    </div>
  `;
}

function bracketCard(label, teamA, teamB, result = '') {
  return `
    <article class="bracket-card">
      <small>${label}</small>
      <div><strong>${teamA}</strong></div>
      <div><strong>${teamB}</strong></div>
      ${isFinishedMatch({ result }) ? `<em>${result}</em>` : ''}
    </article>
  `;
}

function buildPublicStandings(matches) {
  const groups = {};
  matches.forEach((match) => {
    groups[match.group] ||= {};
    [match.teamA, match.teamB].filter(Boolean).forEach((team) => {
      groups[match.group][team] ||= {
        team,
        played: 0,
        won: 0,
        lost: 0,
        for: 0,
        against: 0,
        diff: 0,
        points: 0
      };
    });

    const score = parseScore(match.result);
    if (!score || score[0] === score[1] || Math.max(score[0], score[1]) !== 6) return;

    const [scoreA, scoreB] = score;
    const teamA = groups[match.group][match.teamA];
    const teamB = groups[match.group][match.teamB];
    teamA.played += 1;
    teamB.played += 1;
    teamA.for += scoreA;
    teamA.against += scoreB;
    teamB.for += scoreB;
    teamB.against += scoreA;
    teamA.diff = teamA.for - teamA.against;
    teamB.diff = teamB.for - teamB.against;

    if (scoreA > scoreB) {
      teamA.won += 1;
      teamA.points += 3;
      teamB.lost += 1;
    } else {
      teamB.won += 1;
      teamB.points += 3;
      teamA.lost += 1;
    }
  });

  return Object.fromEntries(Object.entries(groups).map(([group, rows]) => [
    group,
    Object.values(rows).sort((a, b) => b.points - a.points || b.diff - a.diff || b.for - a.for || a.team.localeCompare(b.team))
  ]));
}

function finalPodiumFor(day) {
  const standings = buildPublicStandings(day.matches || []);
  const groups = Object.values(standings);
  if (!groups.length) return [];

  if (groups.length === 1) {
    const rows = groups[0];
    const allPlayed = rows.length >= 3 && rows.every((row) => row.played > 0);
    return allPlayed ? rows.slice(0, 3).map((row) => row.team) : [];
  }

  const finalMatch = day.bracket?.final?.[0];
  if (!isFinishedMatch(finalMatch || {})) return [];
  const finalWinner = winnerFromPublicMatch(finalMatch);
  const second = finalWinner === finalMatch.teamA ? finalMatch.teamB : finalMatch.teamA;
  const thirdMatch = day.bracket?.third?.[0];
  const third = isFinishedMatch(thirdMatch || {}) ? winnerFromPublicMatch(thirdMatch) : '';

  return [finalWinner, second, third].filter(Boolean);
}

function winnerFromPublicMatch(match) {
  const score = parseScore(match?.result);
  if (!score) return '';
  return score[0] > score[1] ? match.teamA : match.teamB;
}

function pairKey(pair) {
  return pair.join(' / ');
}

function pairMatchesFor(day, selectedPair) {
  return (day.matches || [])
    .filter((match) => match.teamA === selectedPair || match.teamB === selectedPair)
    .map((match) => ({
      ...match,
      opponent: match.teamA === selectedPair ? match.teamB : match.teamA
    }))
    .sort((a, b) => (a.round || 1) - (b.round || 1));
}

function canViewPairsFor(day) {
  return Boolean(day?.play && day.pairs?.length);
}

function canViewResultsFor(day) {
  if (!day?.play || !day.time) return false;
  const startsAt = new Date(`${day.key}T${day.time}:00`);
  if (Number.isNaN(startsAt.getTime())) return false;
  return Date.now() >= startsAt.getTime();
}

function venueAddressFor(venue = '') {
  const normalized = String(venue).toLowerCase();
  if (normalized.includes('puntosport') || normalized.includes('punto sport')) {
    return 'Dean Funes 3651, Cordoba';
  }
  return venue || exhibitionSettings.playdayVenue || 'Direccion a confirmar';
}

function registrationModal() {
  if (!state.registrationModalOpen) return '';

  const whatsappUrl = `https://wa.me/${nextTournament.whatsappNumber}?text=${encodeURIComponent(nextTournament.whatsappText)}`;

  return `
    <div class="registration-modal-backdrop" data-registration-backdrop>
      <section class="registration-modal" role="dialog" aria-modal="true" aria-label="Inscripcion al proximo torneo">
        <button class="modal-close" data-close-registration type="button" aria-label="Cerrar">&times;</button>
        <span>${nextTournament.spots}</span>
        <h3>${nextTournament.title}</h3>
        <div class="registration-details">
          <div>
            ${icon('calendar')}
            <strong>${nextTournament.date}</strong>
            <small>${nextTournament.time}</small>
          </div>
          <div>
            ${icon('trophy')}
            <strong>${nextTournament.category}</strong>
            <small>${nextTournament.venue}</small>
          </div>
        </div>
        <a class="whatsapp-button" href="${whatsappUrl}" target="_blank" rel="noopener">
          ${icon('whatsapp')}
          Contactar por WhatsApp
        </a>
      </section>
    </div>
  `;
}

function liveFollowModal() {
  if (!state.liveFollowModalOpen) return '';

  const days = weekAgenda().filter((day) => day.play);
  const matches = days.flatMap((day) => (day.matches || []).map((match) => ({ ...match, day: `${day.label} ${day.date}` })));
  const groups = [...new Set(matches.map((match) => match.group || 'Grupo A'))];

  return `
    <div class="live-follow-backdrop" data-live-follow-backdrop>
      <section class="live-follow-modal" role="dialog" aria-modal="true" aria-label="Seguimiento en vivo">
        <button class="modal-close" data-close-live-follow type="button" aria-label="Cerrar">&times;</button>
        <span>Seguimiento en vivo</span>
        <h3>Tabla de grupos</h3>
        <p>Partidos organizados desde el panel de administrador.</p>
        <div class="group-tabs">
          ${groups.map((group) => `<strong>${group}</strong>`).join('')}
        </div>
        <div class="live-match-list">
          ${matches.length ? matches.map((match) => `
            <article class="live-match-card">
              <div>
                <span>${match.group || 'Grupo A'} · ${match.day}</span>
                <strong>${match.teamA || 'Pareja A'} vs ${match.teamB || 'Pareja B'}</strong>
                <small>${match.time || 'Horario a confirmar'} · ${match.court || exhibitionSettings.playdayVenue}</small>
              </div>
              <b>${match.result || 'Pendiente'}</b>
            </article>
          `).join('') : '<p class="empty-live-follow">Todavia no hay partidos cargados en el admin.</p>'}
        </div>
      </section>
    </div>
  `;
}

function weekAgenda() {
  const labels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - day + 1);

  return labels.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    const schedule = exhibitionSchedule[index] || {};
    const isCurrentDate = schedule.dateKey === key;
    return {
      label,
      key,
      date: date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }),
      type: schedule.type || (schedule.enabled ? 'exhibition' : 'none'),
      play: schedule.enabled ?? (index === 0 || index === 2),
      time: schedule.time || '',
      venue: schedule.venue || exhibitionSettings.playdayVenue,
      suspended: Boolean(schedule.suspended),
      confirmed: isCurrentDate ? exhibitionConfirmed[index] || [] : [],
      pairs: isCurrentDate ? schedule.pairs || [] : [],
      matches: isCurrentDate ? schedule.matches || [] : [],
      bracket: isCurrentDate ? schedule.bracket || {} : {}
    };
  });
}

function playersView() {
  return `
    <div class="screen">
      ${sectionHead('Plantel', 'Jugadores del equipo', `${icon('plus')} Agregar jugador`)}
      <div class="players-grid">
        ${players.map((player) => `
          <article class="player-card">
            <img src="${player.img}" alt="">
            <div><span>${player.hand || 'Jugador'}</span><h3>${player.name}</h3><p>${player.hand || 'Mano a confirmar'}</p></div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

function sponsorsView() {
  return `
    <div class="screen">
      ${sectionHead('Alianzas', 'Patrocinadores', `${icon('plus')} Nuevo sponsor`)}
      <div class="sponsor-grid">
        ${sponsors.map((sponsor) => `
          <article class="sponsor-card">
            <div class="sponsor-logo">${sponsor.name.slice(0, 2).toUpperCase()}</div>
            <span>${sponsor.tier}</span>
            <h3>${sponsor.name}</h3>
            <p>${sponsor.type}</p>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

function instagramView() {
  return `
    <div class="screen">
      ${sectionHead('Redes sociales', 'Instagram oficial', `${icon('instagram')} Abrir Instagram`)}
      <div class="layout-two">
        <div class="block instagram-block">
          <h3>@torneodemankos</h3>
          <p>Espacio preparado para mostrar publicaciones, reels, historias destacadas y anuncios del torneo.</p>
          <div class="insta-preview">
            <span>Fixture</span>
            <span>Resultados</span>
            <span>Mejores puntos</span>
            <span>Sponsors</span>
          </div>
        </div>
        <div class="block">
          <h3>Contenido para publicar</h3>
          <div class="match-list">
            <article class="match-row"><span>Hoy</span><div><strong>Semifinal en vivo</strong><small>Historia + reel post partido</small></div><b>&rsaquo;</b></article>
            <article class="match-row"><span>20:00</span><div><strong>Final del torneo</strong><small>Post fijo con resultado y campeones</small></div><b>&rsaquo;</b></article>
            <article class="match-row"><span>Dom</span><div><strong>Agradecimiento sponsors</strong><small>Carrusel con logos y menciones</small></div><b>&rsaquo;</b></article>
          </div>
        </div>
      </div>
    </div>
  `;
}

function liveView() {
  return `
    <div class="screen">
      ${sectionHead('Centro de transmision', 'Seguimiento en vivo', `${icon('video')} Conectar stream`)}
      <div class="live-layout">
        <div class="stream">
          <img src="./src/assets/padel-hero-bg.png" alt="">
          <div class="stream-overlay"><button>${icon('play')}</button><span>Transmision oficial</span></div>
        </div>
        ${livePanel()}
      </div>
      <div class="ticker">
        ${nextMatches.map((item) => `<span>${icon('crown')} ${item.stage}: ${item.match} &middot; ${item.time}</span>`).join('')}
      </div>
    </div>
  `;
}

function sectionHead(eyebrow, title, buttonText) {
  return `
    <section class="section-head">
      <div><p class="eyebrow">${icon('radio')} ${eyebrow}</p><h2>${title}</h2></div>
      <button class="primary">${buttonText}</button>
    </section>
  `;
}

loadSiteData().finally(render);

