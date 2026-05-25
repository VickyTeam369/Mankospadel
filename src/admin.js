const loginPanel = document.getElementById('loginPanel');
const editorPanel = document.getElementById('editorPanel');
const loginForm = document.getElementById('loginForm');
const settingsForm = document.getElementById('settingsForm');
const playersEditor = document.getElementById('playersEditor');
const agendaEditor = document.getElementById('agendaEditor');
const addPlayerButton = document.getElementById('addPlayerButton');
const savePlayersButton = document.getElementById('savePlayersButton');
const saveButton = document.getElementById('saveButton');
const statusNode = document.getElementById('status');

let token = sessionStorage.getItem('mankosAdminToken') || '';
let data = null;
let selectedDay = null;
let masterTableOpen = false;
let resultModalMatchIndex = null;
let resultModalBracketStage = '';
let resultModalBracketIndex = null;

const agendaDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
const agendaLabels = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'];

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.style.color = isError ? '#e5484d' : '#04758e';
}

async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor del admin.');
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};
  if (!response.ok) {
    if (response.status === 404 && path.startsWith('/api/')) {
      throw new Error('La API del admin no esta publicada en Vercel. Subi la carpeta api y redeploya.');
    }
    throw new Error(payload.error || `No se pudo completar la accion (${response.status}).`);
  }
  return payload;
}

function showEditor() {
  loginPanel.classList.add('is-hidden');
  editorPanel.classList.remove('is-hidden');
}

function escapeAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function handSelect(value = '') {
  const normalized = value.toLowerCase();
  return `
    <select name="hand">
      <option value="">Elegir</option>
      <option value="Drive" ${normalized === 'drive' ? 'selected' : ''}>Drive</option>
      <option value="Reves" ${normalized === 'reves' ? 'selected' : ''}>Reves</option>
    </select>
  `;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getSchedule(index) {
  data.exhibitionSchedule ||= {};
  data.exhibitionSchedule[index] ||= {
    type: 'none',
    enabled: false,
    time: '',
    venue: '',
    courts: 1,
    courtNumbers: [1],
    groupCount: 1,
    locked: false,
    pairs: [],
    matches: [],
    bracket: {}
  };
  const schedule = data.exhibitionSchedule[index];
  schedule.courtNumbers = normalizeCourtNumbers(schedule.courtNumbers, schedule.courts);
  schedule.courts = schedule.courtNumbers.length;
  if ((!schedule.pairs || !schedule.pairs.length) && Array.isArray(schedule.matches) && schedule.matches.length) {
    schedule.pairs = pairsFromMatches(schedule.matches);
  }
  return data.exhibitionSchedule[index];
}

function splitPairFromMatch(team) {
  if (!team || !team.includes(' / ')) return null;
  const pair = team.split(' / ').map((name) => name.trim()).filter(Boolean);
  return pair.length === 2 ? pair : null;
}

function pairsFromMatches(matches) {
  const seen = new Set();
  return matches.flatMap((match) => [splitPairFromMatch(match.teamA), splitPairFromMatch(match.teamB)])
    .filter(Boolean)
    .filter((pair) => {
      const key = pair.join(' / ');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function normalizeCourtNumbers(value, fallbackCount = 1) {
  const fallback = Array.from({ length: Math.max(1, Number(fallbackCount || 1)) }, (_, index) => index + 1);
  const source = Array.isArray(value) && value.length ? value : fallback;
  const numbers = [...new Set(source.map((item) => Number(item)).filter((item) => item >= 1 && item <= 7))].sort((a, b) => a - b);
  return numbers.length ? numbers : [1];
}

function selectedCourtNumbers() {
  const checked = [...agendaEditor.querySelectorAll('[name="courtNumber"]:checked')].map((input) => Number(input.value));
  return normalizeCourtNumbers(checked, 1);
}

function getConfirmed(index) {
  data.exhibitionConfirmed ||= {};
  data.exhibitionConfirmed[index] ||= [];
  return data.exhibitionConfirmed[index];
}

function renderPlayers() {
  addPlayerButton.textContent = masterTableOpen ? 'Ocultar tabla madre' : 'Ver tabla madre';
  playersEditor.innerHTML = `
    <article class="player-edit-card new-player-card" data-new-player>
      <label>Nombre <input name="name" /></label>
      <label>Mano ${handSelect()}</label>
      <label>Foto URL <input name="img" /></label>
      <button class="add-player-row" type="button" data-add-player-row>Agregar</button>
    </article>
    ${masterTableOpen ? `
      <div class="master-table">
        ${data.players.map((player, index) => `
          <article class="player-edit-card" data-player="${index}">
            <label>Nombre <input name="name" value="${escapeAttr(player.name)}" /></label>
            <label>Mano ${handSelect(player.hand)}</label>
            <label>Foto URL <input name="img" value="${escapeAttr(player.img)}" /></label>
            <button class="remove-player" type="button" data-remove-player="${index}">Eliminar</button>
          </article>
        `).join('')}
      </div>
    ` : ''}
  `;

  document.querySelectorAll('[data-add-player-row]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-new-player]');
      const player = {
        name: card.querySelector('[name="name"]').value.trim(),
        hand: card.querySelector('[name="hand"]').value.trim(),
        img: card.querySelector('[name="img"]').value.trim()
      };
      if (!player.name) {
        setStatus('Agrega al menos el nombre del jugador.', true);
        return;
      }
      data.players.push(player);
      renderPlayers();
      renderAgenda();
      setStatus('Jugador agregado. No te olvides de guardar tabla madre.');
    });
  });

  document.querySelectorAll('[data-remove-player]').forEach((button) => {
    button.addEventListener('click', () => {
      const removed = data.players[Number(button.dataset.removePlayer)]?.name;
      data.players.splice(Number(button.dataset.removePlayer), 1);
      if (removed && data.exhibitionConfirmed) {
        Object.keys(data.exhibitionConfirmed).forEach((day) => {
          data.exhibitionConfirmed[day] = data.exhibitionConfirmed[day].filter((name) => name !== removed);
        });
      }
      renderPlayers();
      renderAgenda();
    });
  });
}

function eventLabel(schedule) {
  if (schedule.locked && schedule.type === 'tournament') return 'Torneo guardado';
  if (schedule.locked && (schedule.type === 'exhibition' || schedule.enabled)) return 'Exhibicion guardada';
  if (schedule.type === 'tournament') return 'Torneo';
  if (schedule.type === 'exhibition' || schedule.enabled) return 'Exhibicion';
  return 'Libre';
}

function renderAgenda() {
  const playerNames = data.players.map((player) => player.name).filter(Boolean);
  agendaEditor.innerHTML = `
    <div class="admin-calendar" aria-label="Calendario semanal">
      ${agendaDays.map((day, index) => {
        const schedule = getSchedule(index);
        return `
          <button class="admin-day ${selectedDay === index ? 'is-selected' : ''} ${schedule.type === 'tournament' ? 'is-tournament' : ''}" data-select-day="${index}" type="button">
            <strong>${agendaLabels[index]}</strong>
            <span>${eventLabel(schedule)}</span>
            ${schedule.locked ? '<small>Establecido</small>' : ''}
          </button>
        `;
      }).join('')}
    </div>
    ${selectedDay === null ? '<p class="agenda-hint">Elegi una fecha para organizar una exhibicion o torneo.</p>' : dayEditorTemplate(playerNames)}
  `;

  agendaEditor.querySelectorAll('[data-select-day]').forEach((button) => {
    button.addEventListener('click', () => {
      saveSelectedDay();
      selectedDay = Number(button.dataset.selectDay);
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-event-type]').forEach((button) => {
    button.addEventListener('click', () => {
      const schedule = getSchedule(selectedDay);
      schedule.type = button.dataset.eventType;
      schedule.enabled = schedule.type !== 'none';
      if (schedule.type === 'none') {
        schedule.pairs = [];
        schedule.matches = [];
        schedule.bracket = {};
      }
      schedule.locked = false;
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[name="confirmedPlayer"]').forEach((input) => {
    input.addEventListener('change', () => {
      saveSelectedDay();
      const schedule = getSchedule(selectedDay);
      const selected = data.exhibitionConfirmed[selectedDay] || [];
      schedule.pairs = (schedule.pairs || []).filter((pair) => pair.every((name) => selected.includes(name)));
      schedule.matches = [];
      schedule.bracket = {};
      schedule.locked = false;
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-save-pairs]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        setStatus('Guardando parejas...');
        await saveAllChanges('Parejas guardadas. Ahora pod\u00e9s sortear tablas.');
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  });

  agendaEditor.querySelectorAll('[name="pairA"], [name="pairB"]').forEach((select) => {
    select.addEventListener('change', () => {
      saveSelectedDay();
      const schedule = getSchedule(selectedDay);
      schedule.matches = [];
      schedule.bracket = {};
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-draw-groups]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        const schedule = getSchedule(selectedDay);
        if (schedule.matches?.length && !window.confirm('Esto va a volver a sortear las tablas y puede pisar el fixture armado y los resultados cargados. Queres continuar?')) {
          return;
        }
        saveSelectedDay();
        schedule.courtNumbers = selectedCourtNumbers();
        schedule.courts = schedule.courtNumbers.length;
        schedule.groupCount = Number(agendaEditor.querySelector('[name="groupCount"]')?.value || suggestedGroupCount(schedule.pairs));
        schedule.matches = buildTournamentMatches(schedule.pairs, schedule.courtNumbers, schedule.groupCount, schedule.time, schedule.venue || data.settings?.playdayVenue || '');
        schedule.bracket = {};
        schedule.locked = false;
        await saveAllChanges('Tablas sorteadas y guardadas.');
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  });

  agendaEditor.querySelectorAll('[name="courtNumber"]').forEach((input) => {
    input.addEventListener('change', () => {
      saveSelectedDay();
      const schedule = getSchedule(selectedDay);
      schedule.courtNumbers = selectedCourtNumbers();
      schedule.courts = schedule.courtNumbers.length;
      schedule.matches = [];
      schedule.bracket = {};
      schedule.locked = false;
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-save-day]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        setStatus('Guardando fecha...');
        getSchedule(selectedDay).locked = true;
        await saveAllChanges('Fecha guardada.');
        selectedDay = null;
        renderAgenda();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  });

  agendaEditor.querySelectorAll('[data-save-result]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await saveMatchResult();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  });

  agendaEditor.querySelectorAll('[data-open-result]').forEach((button) => {
    button.addEventListener('click', () => {
      resultModalMatchIndex = Number(button.dataset.openResult);
      resultModalBracketStage = '';
      resultModalBracketIndex = null;
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-open-bracket-result]').forEach((button) => {
    button.addEventListener('click', () => {
      resultModalMatchIndex = null;
      resultModalBracketStage = button.dataset.bracketStage;
      resultModalBracketIndex = Number(button.dataset.bracketIndex);
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-close-result]').forEach((button) => {
    button.addEventListener('click', () => {
      resultModalMatchIndex = null;
      resultModalBracketStage = '';
      resultModalBracketIndex = null;
      renderAgenda();
    });
  });

  agendaEditor.querySelectorAll('[data-result-backdrop]').forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) {
        resultModalMatchIndex = null;
        resultModalBracketStage = '';
        resultModalBracketIndex = null;
        renderAgenda();
      }
    });
  });
}

function dayEditorTemplate(playerNames) {
  const schedule = getSchedule(selectedDay);
  const confirmed = getConfirmed(selectedDay);
  return `
    <article class="day-editor">
      <h3>${agendaDays[selectedDay]}</h3>
      <div class="event-type">
        <button class="${schedule.type === 'none' || !schedule.enabled ? 'active' : ''}" data-event-type="none" type="button">Sin actividad</button>
        <button class="${schedule.type === 'exhibition' ? 'active' : ''}" data-event-type="exhibition" type="button">Exhibicion</button>
        <button class="${schedule.type === 'tournament' ? 'active gold' : ''}" data-event-type="tournament" type="button">Organizar torneo</button>
      </div>
      <label class="time-field">Horario <input name="eventTime" type="time" value="${escapeAttr(schedule.time || '')}" /></label>
      <label class="venue-field">Lugar de juego <input name="eventVenue" value="${escapeAttr(schedule.venue || data.settings?.playdayVenue || '')}" placeholder="@puntosport" /></label>
      <div class="player-picker" aria-label="Seleccionar jugadores">
        ${playerNames.length ? playerNames.map((name) => `
          <label class="player-check">
            <input name="confirmedPlayer" type="checkbox" value="${escapeAttr(name)}" ${confirmed.includes(name) ? 'checked' : ''} />
            <span>${escapeAttr(name)}</span>
          </label>
        `).join('') : '<p>Primero agrega jugadores en la tabla madre.</p>'}
      </div>
      ${schedule.type !== 'none' && schedule.enabled ? tournamentBuilderTemplate(schedule) : ''}
      <button class="save-day-button" data-save-day type="button">Guardar fecha</button>
      <p>Al guardar, esta fecha se cierra. Podes volver a abrirla para editar.</p>
    </article>
  `;
}

function tournamentBuilderTemplate(schedule) {
  const isTournament = schedule.type === 'tournament';
  const participants = data.exhibitionConfirmed[selectedDay] || [];
  const pairCount = Math.floor(participants.length / 2);
  const selectedInPairs = (schedule.pairs || []).flat().filter(Boolean);
  if (schedule.matches?.length && hasRoundConflicts(schedule.matches) && schedule.pairs?.length) {
    schedule.matches = buildTournamentMatches(schedule.pairs, schedule.courtNumbers || [1], schedule.groupCount || suggestedGroupCount(schedule.pairs), schedule.time, schedule.venue || data.settings?.playdayVenue || '');
  }
  return `
    <section class="tournament-builder ${isTournament ? 'is-gold' : ''}">
      <div class="builder-head">
        <strong>${isTournament ? 'Organizar torneo' : 'Organizar exhibicion'}</strong>
      </div>
      ${pairCount ? `
        <div class="pair-preview">
          ${Array.from({ length: pairCount }).map((_, index) => {
            const pair = schedule.pairs?.[index] || ['', ''];
            return `
              <div class="pair-editor-row">
                <span>Pareja ${index + 1}</span>
                <select name="pairA" data-pair-index="${index}">${playerOptions(participants, pair[0], selectedInPairs)}</select>
                <select name="pairB" data-pair-index="${index}">${playerOptions(participants, pair[1], selectedInPairs)}</select>
              </div>
            `;
          }).join('')}
        </div>
        ${participants.length % 2 ? '<p>Hay un jugador sin pareja. Agreg\u00e1 o quit\u00e1 uno para cerrar todas las parejas.</p>' : ''}
        <button class="secondary-action" type="button" data-save-pairs>Guardar parejas</button>
        ${schedule.pairs?.length ? `
          <div class="pair-summary">
            ${schedule.pairs.map((pair, index) => `
              <div><span>Pareja ${index + 1}</span><strong>${pair.join(' / ')}</strong></div>
            `).join('')}
          </div>
        ` : ''}
        <div class="court-settings">
          <div>
            <span>Canchas disponibles</span>
            <strong>${schedule.courtNumbers?.length || 1}</strong>
          </div>
          <fieldset>
            <legend>Numeros de cancha habilitados</legend>
            <div class="court-number-picker">
              ${Array.from({ length: 7 }, (_, index) => {
                const courtNumber = index + 1;
                return `
                  <label>
                    <input name="courtNumber" type="checkbox" value="${courtNumber}" ${schedule.courtNumbers?.includes(courtNumber) ? 'checked' : ''} />
                    <span>${courtNumber}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </fieldset>
        </div>
        <label class="time-field">Cantidad de grupos <input name="groupCount" type="number" min="1" max="12" value="${schedule.groupCount || suggestedGroupCount(schedule.pairs)}" /></label>
        <button class="secondary-action" type="button" data-draw-groups>${schedule.matches?.length ? 'Volver a sortear tablas' : 'Sortear tablas'}</button>
      ` : '<p>Seleccion\u00e1 al menos dos jugadores para armar parejas.</p>'}
      ${schedule.matches?.length ? `
        ${groupPreviewTemplate(schedule.matches)}
        ${courtFixtureTemplate(schedule.matches, schedule.courtNumbers || [1], schedule.venue || data.settings?.playdayVenue || '')}
        ${standingsTemplate(schedule.matches)}
        ${knockoutEditorTemplate(schedule)}
        ${resultModalTemplate(schedule)}
      ` : ''}
    </section>
  `;
}

function groupPreviewTemplate(matches) {
  const groups = {};
  matches.forEach((match) => {
    groups[match.group] ||= new Set();
    groups[match.group].add(match.teamA);
    groups[match.group].add(match.teamB);
  });

  return `
    <div class="group-preview">
      ${Object.entries(groups).map(([group, teams]) => `
        <article>
          <h4>${group}</h4>
          ${[...teams].map((team, index) => `<p><span>${index + 1}</span>${team}</p>`).join('')}
        </article>
      `).join('')}
    </div>
  `;
}

function parseScore(result = '') {
  const match = String(result).trim().match(/^(\d+)\s*[-/]\s*(\d+)$/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
}

function courtFixtureTemplate(matches, courtNumbers = [1], venue = '') {
  const selectedCourts = normalizeCourtNumbers(courtNumbers, 1);
  const selectedCourtNames = new Set(selectedCourts.map((courtNumber) => `Cancha ${courtNumber}`));
  const visibleMatches = matches
    .map((match, matchIndex) => ({ match, matchIndex }))
    .filter((item) => selectedCourtNames.has(normalizeCourtName(item.match.court)));
  const courts = {};
  selectedCourts.map((courtNumber) => `Cancha ${courtNumber}`).forEach((court) => {
    courts[court] = [];
  });

  visibleMatches.forEach((item) => {
    const court = normalizeCourtName(item.match.court);
    if (courts[court]) courts[court].push(item);
  });
  Object.values(courts).forEach((courtMatches) => {
    courtMatches.sort((a, b) => (a.match.round || 1) - (b.match.round || 1));
  });
  const maxTurns = Math.max(...Object.values(courts).map((courtMatches) => courtMatches.length), 1);

  return `
    <div class="court-fixture">
      ${Object.entries(courts).map(([court, courtMatches]) => `
        <section>
          <h4>${venue ? `${venue} - ${court}` : court}</h4>
          ${courtMatches.map((item, index) => {
            const match = item.match;
            const score = parseScore(match.result);
            return `
            <article>
              <span>Turno ${index + 1} - ${match.group}</span>
              <strong>${match.teamA} vs ${match.teamB}</strong>
              <button class="match-result-button ${score ? 'is-saved' : ''}" data-open-result="${item.matchIndex}" type="button">
                ${score ? `Resultado ${match.result}` : 'Cargar resultado'}
              </button>
            </article>
          `;
          }).join('')}
          ${Array.from({ length: Math.max(0, maxTurns - courtMatches.length) }, (_, index) => `
            <article class="is-free">
              <span>Turno libre ${courtMatches.length + index + 1}</span>
              <strong>Libre</strong>
            </article>
          `).join('')}
        </section>
      `).join('')}
    </div>
  `;
}

function normalizeCourtName(court = '') {
  const match = String(court).match(/Cancha\s+\d+/i);
  return match ? match[0].replace(/^cancha/i, 'Cancha') : 'Cancha 1';
}

function resultModalTemplate(schedule) {
  if (resultModalMatchIndex === null && !resultModalBracketStage) return '';

  const match = resultModalBracketStage
    ? schedule.bracket?.[resultModalBracketStage]?.[resultModalBracketIndex]
    : schedule.matches?.[resultModalMatchIndex];
  if (!match) return '';

  const score = parseScore(match.result);
  return `
    <div class="result-modal-backdrop" data-result-backdrop>
      <section class="result-modal" role="dialog" aria-modal="true" aria-label="Cargar resultado">
        <button class="result-modal-close" data-close-result type="button" aria-label="Cerrar">&times;</button>
        <span>Resultado</span>
        <h4>${match.teamA} vs ${match.teamB}</h4>
        <p>Guardalo como game unico a 6 puntos. Si te equivocaste, podes volver a abrir este partido y modificarlo.</p>
        <div class="result-modal-score">
          <label>
            <span>${match.teamA}</span>
            <input name="scoreA" type="number" min="0" max="6" value="${score ? score[0] : ''}" />
          </label>
          <b>-</b>
          <label>
            <span>${match.teamB}</span>
            <input name="scoreB" type="number" min="0" max="6" value="${score ? score[1] : ''}" />
          </label>
        </div>
        <button class="save-result-modal-button" data-save-result type="button">${score ? 'Modificar resultado' : 'Guardar resultado'}</button>
      </section>
    </div>
  `;
}

async function saveMatchResult() {
  if (resultModalMatchIndex === null && !resultModalBracketStage) throw new Error('No hay partido seleccionado.');
  const schedule = getSchedule(selectedDay);
  const match = resultModalBracketStage
    ? schedule.bracket?.[resultModalBracketStage]?.[resultModalBracketIndex]
    : schedule.matches?.[resultModalMatchIndex];
  if (!match) throw new Error('No se encontro el partido.');

  const editor = agendaEditor.querySelector('.result-modal');
  const scoreA = Number(editor?.querySelector('[name="scoreA"]')?.value);
  const scoreB = Number(editor?.querySelector('[name="scoreB"]')?.value);

  if (![scoreA, scoreB].every((score) => Number.isInteger(score) && score >= 0 && score <= 6)) {
    throw new Error('El resultado tiene que estar entre 0 y 6.');
  }

  if (scoreA === scoreB || Math.max(scoreA, scoreB) !== 6) {
    throw new Error('El ganador tiene que llegar a 6 y no puede haber empate.');
  }

  match.result = `${scoreA}-${scoreB}`;
  refreshBracketAfterResult(schedule);
  resultModalMatchIndex = null;
  resultModalBracketStage = '';
  resultModalBracketIndex = null;
  await saveAllChanges('Resultado guardado. Tabla actualizada.');
}

function standingsTemplate(matches) {
  const groups = buildStandings(matches);
  if (!Object.keys(groups).length) return '';

  return `
    <div class="standings-board">
      ${Object.entries(groups).map(([group, rows]) => `
        <section>
          <h4>Clasificacion - ${group}</h4>
          <table>
            <thead>
              <tr><th>Pareja</th><th>PJ</th><th>G</th><th>P</th><th>SF</th><th>SC</th><th>Dif</th><th>Pts</th></tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr>
                  <td>${row.team}</td>
                  <td>${row.played}</td>
                  <td>${row.won}</td>
                  <td>${row.lost}</td>
                  <td>${row.for}</td>
                  <td>${row.against}</td>
                  <td>${row.diff}</td>
                  <td>${row.points}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>
      `).join('')}
    </div>
  `;
}

function buildStandings(matches) {
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

function knockoutEditorTemplate(schedule) {
  const standings = Object.entries(buildStandings(schedule.matches || []));
  if (standings.length < 2) return '';

  ensureKnockoutBracket(schedule, standings);
  const stages = [
    ['quarter', 'Cuartos de final'],
    ['semi', 'Semifinal'],
    ['third', '3er y 4to puesto'],
    ['final', 'Final']
  ].filter(([stage]) => schedule.bracket?.[stage]?.length);

  return `
    <div class="knockout-editor">
      <h4>Cuadro eliminatorio</h4>
      ${stages.map(([stage, label]) => `
        <section>
          <h5>${label}</h5>
          ${schedule.bracket[stage].map((match, index) => knockoutEditorCard(stage, index, match)).join('')}
        </section>
      `).join('')}
    </div>
  `;
}

function knockoutEditorCard(stage, index, match) {
  const score = parseScore(match.result);
  return `
    <article>
      <span>${match.label}</span>
      <strong>${match.teamA}</strong>
      <b>vs</b>
      <strong>${match.teamB}</strong>
      <button class="${score ? 'is-saved' : ''}" data-open-bracket-result data-bracket-stage="${stage}" data-bracket-index="${index}" type="button">
        ${score ? `Resultado ${match.result}` : 'Cargar resultado'}
      </button>
    </article>
  `;
}

function ensureKnockoutBracket(schedule, standingsEntries) {
  schedule.bracket ||= {};
  const qualifiers = standingsEntries.map(([group, rows]) => ({
    group,
    first: rows[0]?.team || `${group} 1`,
    second: rows[1]?.team || `${group} 2`
  }));
  const opening = qualifiers.flatMap((item, index) => {
    const next = qualifiers[(index + 1) % qualifiers.length];
    if (!next || item.group === next.group) return [];
    return [{
      label: `${item.group} 1 vs ${next.group} 2`,
      teamA: item.first,
      teamB: next.second,
      result: findExistingBracketResult(schedule, 'quarter', `${item.group} 1 vs ${next.group} 2`) || findExistingBracketResult(schedule, 'semi', `${item.group} 1 vs ${next.group} 2`) || 'Pendiente'
    }];
  });

  if (opening.length > 2) {
    schedule.bracket.quarter = mergeBracketStage(schedule.bracket.quarter, opening);
    const quarterWinners = schedule.bracket.quarter.map((match, index) => winnerFromMatch(match) || `Ganador cuarto ${index + 1}`);
    schedule.bracket.semi = mergeBracketStage(schedule.bracket.semi, [
      { label: 'Semi 1', teamA: quarterWinners[0] || 'Ganador cuarto 1', teamB: quarterWinners[1] || 'Ganador cuarto 2', result: 'Pendiente' },
      { label: 'Semi 2', teamA: quarterWinners[2] || 'Ganador cuarto 3', teamB: quarterWinners[3] || 'Ganador cuarto 4', result: 'Pendiente' }
    ]);
  } else {
    schedule.bracket.quarter = [];
    schedule.bracket.semi = mergeBracketStage(schedule.bracket.semi, opening.map((match, index) => ({ ...match, label: `Semi ${index + 1}` })));
  }

  const semiWinners = (schedule.bracket.semi || []).map((match, index) => winnerFromMatch(match) || `Ganador semi ${index + 1}`);
  const semiLosers = (schedule.bracket.semi || []).map((match, index) => loserFromMatch(match) || `Perdedor semi ${index + 1}`);
  schedule.bracket.third = mergeBracketStage(schedule.bracket.third, [{
    label: '3er puesto',
    teamA: semiLosers[0] || 'Perdedor semi 1',
    teamB: semiLosers[1] || 'Perdedor semi 2',
    result: 'Pendiente'
  }]);
  schedule.bracket.final = mergeBracketStage(schedule.bracket.final, [{
    label: 'Final',
    teamA: semiWinners[0] || 'Ganador semi 1',
    teamB: semiWinners[1] || 'Ganador semi 2',
    result: 'Pendiente'
  }]);
}

function refreshBracketAfterResult(schedule) {
  const standings = Object.entries(buildStandings(schedule.matches || []));
  if (standings.length >= 2) ensureKnockoutBracket(schedule, standings);
}

function mergeBracketStage(existing = [], next = []) {
  return next.map((match, index) => {
    const saved = existing.find((item) => item.label === match.label) || existing[index] || {};
    const sameTeams = saved.teamA === match.teamA && saved.teamB === match.teamB;
    return {
      ...match,
      result: sameTeams && saved.result && saved.result !== 'Pendiente' ? saved.result : match.result
    };
  });
}

function findExistingBracketResult(schedule, stage, label) {
  return schedule.bracket?.[stage]?.find((match) => match.label === label)?.result;
}

function winnerFromMatch(match) {
  const score = parseScore(match.result);
  if (!score || score[0] === score[1] || Math.max(score[0], score[1]) !== 6) return '';
  return score[0] > score[1] ? match.teamA : match.teamB;
}

function loserFromMatch(match) {
  const score = parseScore(match.result);
  if (!score || score[0] === score[1] || Math.max(score[0], score[1]) !== 6) return '';
  return score[0] > score[1] ? match.teamB : match.teamA;
}

function playerOptions(players, selected, selectedInPairs = []) {
  return `
    <option value="">Elegir jugador</option>
    ${players
      .filter((name) => name === selected || !selectedInPairs.includes(name))
      .map((name) => `<option value="${escapeAttr(name)}" ${name === selected ? 'selected' : ''}>${escapeAttr(name)}</option>`)
      .join('')}
  `;
}

function renderData() {
  settingsForm.elements.playdayVenue.value = data.settings?.playdayVenue || '';
  renderPlayers();
  renderAgenda();
}

function readPlayerCards() {
  return [...document.querySelectorAll('[data-player]')].map((card) => ({
    name: card.querySelector('[name="name"]').value.trim(),
    hand: card.querySelector('[name="hand"]').value.trim(),
    img: card.querySelector('[name="img"]').value.trim()
  })).filter((player) => player.name);
}

function syncVisiblePlayers() {
  const visiblePlayers = readPlayerCards();
  if (visiblePlayers.length) data.players = visiblePlayers;
  return data.players.filter((player) => player.name);
}

function saveSelectedDay() {
  if (selectedDay === null) return;
  const checked = [...agendaEditor.querySelectorAll('[name="confirmedPlayer"]:checked')].map((input) => input.value);
  const schedule = getSchedule(selectedDay);
  schedule.time = agendaEditor.querySelector('[name="eventTime"]')?.value || schedule.time || '';
  schedule.venue = agendaEditor.querySelector('[name="eventVenue"]')?.value.trim() || schedule.venue || '';
  if (agendaEditor.querySelector('[name="courtNumber"]')) {
    schedule.courtNumbers = selectedCourtNumbers();
    schedule.courts = schedule.courtNumbers.length;
  }
  const pairRows = [...agendaEditor.querySelectorAll('.pair-editor-row')];
  if (pairRows.length) {
    const nextPairs = pairRows.map((row) => {
      const first = row.querySelector('[name="pairA"]').value;
      const second = row.querySelector('[name="pairB"]').value;
      return [first, second];
    }).filter((pair) => pair[0] || pair[1]);
    schedule.pairs = nextPairs;
  }
  data.exhibitionConfirmed[selectedDay] = checked;
}

function suggestedGroupCount(pairs = []) {
  return Math.max(1, Math.ceil((pairs?.length || 0) / 4));
}

function buildTournamentMatches(pairs, courtNumbers, groupCountValue, time, venue) {
  const completePairs = pairs.filter((pair) => pair[0] && pair[1] && pair[0] !== pair[1]);
  const shuffledPairs = shuffle(completePairs.map((pair) => pair.join(' / ')));
  const type = getSchedule(selectedDay)?.type || 'tournament';
  const groupCount = Math.max(1, Math.min(Number(groupCountValue || 1), shuffledPairs.length || 1));
  const groups = Array.from({ length: groupCount }, () => []);
  shuffledPairs.forEach((pair, index) => groups[index % groupCount].push(pair));
  const groupedRounds = groups.map((groupPairs, groupIndex) => {
    const groupName = type === 'tournament' ? `Grupo Oro ${String.fromCharCode(65 + groupIndex)}` : `Grupo Exhibicion ${String.fromCharCode(65 + groupIndex)}`;
    return roundRobinRounds(groupPairs).map((round) => (
      round.map(([teamA, teamB]) => ({
          group: groupName,
          time,
          court: '',
          teamA,
          teamB,
          result: 'Pendiente'
      }))
    ));
  });

  const rounds = flattenGroupRounds(groupedRounds, normalizeCourtNumbers(courtNumbers, 1).length);
  return assignCourtsToRounds(rounds, courtNumbers, venue);
}

function roundRobinRounds(teams) {
  const rotation = teams.length % 2 ? [...teams, null] : [...teams];
  const rounds = [];
  const totalRounds = rotation.length - 1;

  for (let roundIndex = 0; roundIndex < totalRounds; roundIndex += 1) {
    const round = [];
    for (let index = 0; index < rotation.length / 2; index += 1) {
      const teamA = rotation[index];
      const teamB = rotation[rotation.length - 1 - index];
      if (teamA && teamB) round.push([teamA, teamB]);
    }
    rounds.push(shuffle(round));
    rotation.splice(1, 0, rotation.pop());
  }

  return rounds;
}

function flattenGroupRounds(groupedRounds, courtCount) {
  const rounds = [];
  const maxGroupRounds = Math.max(...groupedRounds.map((group) => group.length), 0);
  for (let roundIndex = 0; roundIndex < maxGroupRounds; roundIndex += 1) {
    const roundMatches = groupedRounds.flatMap((group) => group[roundIndex] || []);
    for (let index = 0; index < roundMatches.length; index += courtCount) {
      rounds.push(roundMatches.slice(index, index + courtCount));
    }
  }
  return rounds;
}

function assignCourtsToRounds(rounds, courtNumbers, venue) {
  const selectedCourts = normalizeCourtNumbers(courtNumbers, 1);
  const courtLoads = {};
  selectedCourts.forEach((courtNumber) => {
    courtLoads[courtNumber] = 0;
  });
  const pairCourtCounts = {};

  return rounds.flatMap((round, roundIndex) => {
    const usedCourts = new Set();
    return round.map((match) => {
      const bestCourt = selectedCourts
        .filter((courtNumber) => !usedCourts.has(courtNumber))
        .map((courtNumber) => ({
          courtNumber,
          score: (pairCourtCounts[match.teamA]?.[courtNumber] || 0) + (pairCourtCounts[match.teamB]?.[courtNumber] || 0),
          load: courtLoads[courtNumber] || 0,
          random: Math.random()
        }))
        .sort((a, b) => a.score - b.score || a.load - b.load || a.random - b.random)[0].courtNumber;

      usedCourts.add(bestCourt);
      [match.teamA, match.teamB].forEach((team) => {
        pairCourtCounts[team] ||= {};
        pairCourtCounts[team][bestCourt] = (pairCourtCounts[team][bestCourt] || 0) + 1;
      });
      courtLoads[bestCourt] += 1;

      return {
        ...match,
        round: roundIndex + 1,
        court: `${venue || 'Cancha'} - Cancha ${bestCourt}`
      };
    });
  });
}

function hasRoundConflicts(matches) {
  const rounds = {};
  return matches.some((match) => {
    const round = match.round || 1;
    rounds[round] ||= new Set();
    if (rounds[round].has(match.teamA) || rounds[round].has(match.teamB)) return true;
    rounds[round].add(match.teamA);
    rounds[round].add(match.teamB);
    return false;
  });
}

function generatedExhibitionMatches(index) {
  const participants = data.exhibitionConfirmed[index] || [];
  const schedule = getSchedule(index);
  const matches = [];
  for (let i = 0; i < participants.length; i += 2) {
    if (!participants[i + 1]) break;
    matches.push({
      group: 'Exhibicion',
      time: schedule.time || '',
      court: schedule.venue || data.settings?.playdayVenue || '',
      teamA: participants[i],
      teamB: participants[i + 1],
      result: 'Pendiente'
    });
  }
  return matches;
}

function collectAgenda() {
  saveSelectedDay();
  const exhibitionSchedule = {};
  agendaDays.forEach((_, index) => {
    const current = getSchedule(index);
    exhibitionSchedule[index] = {
      type: current.enabled ? current.type || 'exhibition' : 'none',
      enabled: Boolean(current.enabled),
      time: current.time || '',
      venue: current.venue || '',
      courts: Number(current.courts || 1),
      courtNumbers: normalizeCourtNumbers(current.courtNumbers, current.courts),
      groupCount: Number(current.groupCount || 1),
      locked: Boolean(current.locked),
      pairs: current.pairs || [],
      matches: current.matches?.length ? current.matches : generatedExhibitionMatches(index),
      bracket: current.bracket || {}
    };
  });
  return { exhibitionConfirmed: data.exhibitionConfirmed, exhibitionSchedule };
}

async function saveAllChanges(successMessage) {
  const players = syncVisiblePlayers();
  const agenda = collectAgenda();
  data = await api('/api/site-data', {
    method: 'POST',
    body: JSON.stringify({
      settings: {
        exhibitionTitle: 'Exhibicion Mankos Padel',
        exhibitionDescription: 'Jugamos todas las semanas los lunes y miercoles.',
        playdayVenue: settingsForm.elements.playdayVenue.value
      },
      players,
      exhibitionConfirmed: agenda.exhibitionConfirmed,
      exhibitionSchedule: agenda.exhibitionSchedule
    })
  });
  renderData();
  setStatus(successMessage);
}

async function loadData() {
  data = await api('/api/site-data');
  data.players ||= [];
  data.exhibitionConfirmed ||= {};
  data.exhibitionSchedule ||= {};
  renderData();
  showEditor();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    setStatus('Ingresando...');
    const result = await api('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password: document.getElementById('password').value })
    });
    token = result.token;
    sessionStorage.setItem('mankosAdminToken', token);
    await loadData();
    setStatus('Panel listo.');
  } catch (error) {
    setStatus(error.message, true);
  }
});

addPlayerButton.addEventListener('click', () => {
  if (masterTableOpen) syncVisiblePlayers();
  masterTableOpen = !masterTableOpen;
  renderPlayers();
});

savePlayersButton.addEventListener('click', async () => {
  try {
    setStatus('Guardando tabla madre...');
    await saveAllChanges('Tabla madre guardada.');
  } catch (error) {
    setStatus(error.message, true);
  }
});

saveButton.addEventListener('click', async () => {
  try {
    setStatus('Guardando...');
    await saveAllChanges('Cambios guardados. La web publica ya puede mostrarlos.');
  } catch (error) {
    setStatus(error.message, true);
  }
});

if (token) {
  loadData().then(() => setStatus('Panel listo.')).catch(() => sessionStorage.removeItem('mankosAdminToken'));
}

