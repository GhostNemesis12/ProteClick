/* ══════════════════════════════════════════════
   PROTECLICK — JAVASCRIPT UNIFICADO
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. NAVEGACIÓN PRINCIPAL (tabs)
  ───────────────────────────────────────── */
  var TABS = [
    { id: 'home',     label: 'Inicio',
      svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id: 'info',     label: 'Info y guías',
      svg: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' },
    { id: 'dominios', label: 'Dominios',
      svg: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>' },
    { id: 'usuarios', label: 'Usuarios',
      svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
    { id: 'ajustes',  label: 'Ajustes',
      svg: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
  ];

  TABS.forEach(function (sc) {
    var el = document.getElementById('n-' + sc.id);
    if (!el) return;
    el.innerHTML = TABS.map(function (t) {
      return '<button class="nb ' + (t.id === sc.id ? 'on' : '') + '" onclick="go(\'' + t.id + '\')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + t.svg + '</svg>' +
        '<span>' + t.label + '</span>' +
        '</button>';
    }).join('');
  });

  /* ─────────────────────────────────────────
     2. NAVEGACIÓN ENTRE PANTALLAS
  ───────────────────────────────────────── */
  var cur = 'home';

  window.go = function (dest) {
    if (dest === cur) return;
    var from = document.getElementById('s-' + cur);
    var to   = document.getElementById('s-' + dest);
    if (!from || !to) return;

    from.classList.add('back');
    to.classList.remove('off');
    to.style.transform = 'translateX(100%)';
    to.style.opacity   = '0';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        to.style.transition = 'transform 0.36s cubic-bezier(.4,0,.2,1), opacity 0.36s ease';
        to.style.transform  = '';
        to.style.opacity    = '';
      });
    });

    setTimeout(function () {
      from.classList.remove('back');
      from.classList.add('off');
      from.style.transform = '';
      from.style.opacity   = '';
      to.style.transition  = '';
    }, 370);

    cur = dest;
  };

  /* ─────────────────────────────────────────
     3. ESCUDO (Home)
  ───────────────────────────────────────── */
  var RED    = '#e84040';
  var PURPLE = '#7c6af7';
  var isOn   = false;
  var animTimer = null;

  function shieldColor(c) {
    var b = document.getElementById('sbody');
    if (!b) return;
    b.style.transition = 'stroke .45s ease';
    b.style.stroke = c;
  }

  function stepAnim(steps, cb) {
    clearTimeout(animTimer);
    var i = 0;
    (function nx() {
      if (i >= steps.length) { if (cb) cb(); return; }
      shieldColor(steps[i++]);
      animTimer = setTimeout(nx, 500);
    })();
  }

  window.toggleShield = function () {
    isOn = !isOn;
    var w = document.getElementById('sw');
    if (!w) return;
    w.classList.remove('fx');
    void w.offsetWidth;
    w.classList.add('fx');

    if (isOn) {
      stepAnim([RED, PURPLE], function () { document.body.classList.add('protected'); });
      document.getElementById('slabel').textContent = 'PROTEGIDO';
      document.getElementById('ctitle').textContent = 'Protección activa';
      document.getElementById('csub').textContent   = 'Tu dispositivo está protegido';
      document.getElementById('cbadge').textContent = 'Activo';
      document.getElementById('ipath').setAttribute('stroke', PURPLE);
    } else {
      document.body.classList.remove('protected');
      stepAnim([PURPLE, RED]);
      document.getElementById('slabel').textContent = 'DESPROTEGIDO';
      document.getElementById('ctitle').textContent = 'Sin protección activa';
      document.getElementById('csub').textContent   = 'Activa el escudo para protegerte';
      document.getElementById('cbadge').textContent = 'Inactivo';
      document.getElementById('ipath').setAttribute('stroke', RED);
    }
  };

  /* ─────────────────────────────────────────
     4. TARJETAS EXPANDIBLES (Info)
  ───────────────────────────────────────── */
  window.toggleCard = function (el) {
    el.classList.toggle('open');
  };

  /* ─────────────────────────────────────────
     5. DOMINIOS
  ───────────────────────────────────────── */
  var DOMAINS = [
    { name: 'AEAT – Agencia Tributaria',          domain: 'sede.agenciatributaria.gob.es', emoji: '🏛️', color: '#1a4f9c', type: 'gov' },
    { name: 'Banco de España',                    domain: 'bde.es',                        emoji: '🏦', color: '#b8960c', type: 'ban' },
    { name: 'Banco Santander',                    domain: 'bancosantander.es',             emoji: '🏦', color: '#cc0000', type: 'ban' },
    { name: 'BBVA',                               domain: 'bbva.es',                       emoji: '🏦', color: '#004481', type: 'ban' },
    { name: 'CaixaBank',                          domain: 'caixabank.es',                  emoji: '🏦', color: '#007db7', type: 'ban' },
    { name: 'Correos',                            domain: 'correos.es',                    emoji: '✉️', color: '#f5c400', type: 'ok', fg: '#333' },
    { name: 'DGT – Dirección General de Tráfico', domain: 'dgt.es',                        emoji: '🚗', color: '#005f9e', type: 'gov' },
    { name: 'Guardia Civil',                      domain: 'guardiacivil.es',               emoji: '👮', color: '#2d5016', type: 'gov' },
    { name: 'Hacienda – Sede electrónica',        domain: 'sede.minhap.gob.es',            emoji: '🏛️', color: '#5a2282', type: 'gov' },
    { name: 'Mapfre Seguros',                     domain: 'mapfre.es',                     emoji: '🛡️', color: '#cc0000', type: 'ok'  },
    { name: 'Mercadona',                          domain: 'mercadona.es',                  emoji: '🛒', color: '#ff5500', type: 'ok'  },
    { name: 'Ministerio de Sanidad',              domain: 'sanidad.gob.es',                emoji: '🏥', color: '#0069b4', type: 'gov' },
    { name: 'Movistar',                           domain: 'movistar.es',                   emoji: '📱', color: '#019df4', type: 'ok'  },
    { name: 'Policía Nacional',                   domain: 'policia.es',                    emoji: '🚔', color: '#00275c', type: 'gov' },
    { name: 'Renfe',                              domain: 'renfe.com',                     emoji: '🚆', color: '#cc0000', type: 'ok'  },
    { name: 'Sabadell',                           domain: 'bancsabadell.com',              emoji: '🏦', color: '#004f9f', type: 'ban' },
    { name: 'Seguridad Social',                   domain: 'seg-social.es',                 emoji: '🏛️', color: '#003f8a', type: 'gov' },
    { name: 'Vodafone',                           domain: 'vodafone.es',                   emoji: '📱', color: '#cc0000', type: 'ok'  },
  ];

  var PILL_LABEL = { ok: 'Verificado', gov: 'Gobierno', ban: 'Banca' };
  var PILL_CLASS = { ok: 'pill-ok',   gov: 'pill-gov', ban: 'pill-ban' };
  var sortDir = 'az';

  window.setSort = function (dir) {
    sortDir = dir;
    var btnAZ = document.getElementById('btnAZ');
    var btnZA = document.getElementById('btnZA');
    if (btnAZ) btnAZ.classList.toggle('active', dir === 'az');
    if (btnZA) btnZA.classList.toggle('active', dir === 'za');
    renderList();
  };

  window.renderList = function () {
    var searchEl = document.getElementById('searchInput');
    var q = searchEl ? searchEl.value.trim().toLowerCase() : '';
    var data = DOMAINS.filter(function (d) {
      return d.name.toLowerCase().includes(q) || d.domain.toLowerCase().includes(q);
    });
    data.sort(function (a, b) {
      var cmp = a.name.localeCompare(b.name, 'es');
      return sortDir === 'az' ? cmp : -cmp;
    });

    var listEl   = document.getElementById('listEl');
    var empty    = document.getElementById('emptyState');
    var countBar = document.getElementById('countBar');
    if (!listEl) return;

    if (countBar) {
      countBar.innerHTML = '<span>' + data.length + '</span> dominio' +
        (data.length !== 1 ? 's' : '') + ' ' +
        (q ? 'encontrado' + (data.length !== 1 ? 's' : '') : 'protegidos');
    }

    while (listEl.firstChild && listEl.firstChild !== empty) {
      listEl.removeChild(listEl.firstChild);
    }

    if (!data.length) {
      if (empty) empty.classList.add('show');
      return;
    }
    if (empty) empty.classList.remove('show');

    var groups = {};
    data.forEach(function (d) {
      var l = d.name[0].toUpperCase();
      if (!groups[l]) groups[l] = [];
      groups[l].push(d);
    });
    var letters = Object.keys(groups).sort(function (a, b) {
      return sortDir === 'az' ? a.localeCompare(b, 'es') : b.localeCompare(a, 'es');
    });

    letters.forEach(function (letter) {
      var hdr = document.createElement('div');
      hdr.className = 'alpha';
      hdr.textContent = letter;
      listEl.insertBefore(hdr, empty);

      groups[letter].forEach(function (d) {
        var card = document.createElement('div');
        card.className = 'dcard';
        card.innerHTML =
          '<div class="dlogo" style="background:' + d.color + ';color:' + (d.fg || '#fff') + '">' + d.emoji + '</div>' +
          '<div class="dinfo">' +
            '<div class="dname">' + d.name + '</div>' +
            '<div class="ddom">' + d.domain + '</div>' +
          '</div>' +
          '<span class="dpill ' + PILL_CLASS[d.type] + '">' + PILL_LABEL[d.type] + '</span>';
        listEl.insertBefore(card, empty);
      });
    });
  };

  renderList();

  /* ─────────────────────────────────────────
     6. USUARIOS — sub-pantallas y modales
  ───────────────────────────────────────── */
  var selectedRole = null;
  var curPS = 'nogroup';

  window.goPS = function (dest) {
    if (dest === curPS) return;
    var from = document.getElementById('ps-' + curPS);
    var to   = document.getElementById('ps-' + dest);
    if (!from || !to) return;

    from.classList.add('back');
    to.classList.remove('off');
    to.style.transform = 'translateX(100%)';
    to.style.opacity   = '0';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        to.style.transition = 'transform 0.36s cubic-bezier(.4,0,.2,1), opacity 0.36s ease';
        to.style.transform  = '';
        to.style.opacity    = '';
      });
    });

    setTimeout(function () {
      from.classList.remove('back');
      from.classList.add('off');
      from.style.transform = '';
      from.style.opacity   = '';
      to.style.transition  = '';
    }, 370);

    curPS = dest;
  };

  window.openSheet = function (type) {
    var el = document.getElementById('ov-' + type);
    if (el) el.classList.add('show');
  };

  window.closeOv = function (id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
  };

  window.closeOverlay = function (e, id) {
    if (e.target === document.getElementById(id)) window.closeOv(id);
  };

  var CAPS = {
    sup: [
      { icon: '👁️', text: 'Ves el historial de navegación del monitorizado en tiempo real.' },
      { icon: '🔔', text: 'Recibes notificaciones cuando el monitorizado accede a un sitio peligroso.' },
      { icon: '🚨', text: 'Recibes las alarmas de brecha de seguridad del monitorizado.' },
    ],
    mon: [
      { icon: '📋', text: 'Ves tu propio historial de navegación y actividad.' },
      { icon: '🔔', text: 'Recibes alertas personales ante accesos a dominios peligrosos.' },
      { icon: '🛡️', text: 'Proteclick bloquea automáticamente sitios de phishing en tu dispositivo.' },
    ]
  };

  window.selectRole = function (role) {
    selectedRole = role;
    var rcSup = document.getElementById('rc-sup');
    var rcMon = document.getElementById('rc-mon');
    if (rcSup) rcSup.classList.toggle('sel-sup', role === 'sup');
    if (rcMon) rcMon.classList.toggle('sel-mon', role === 'mon');

    var capList  = document.getElementById('caps-list');
    var capItems = document.getElementById('cap-items');
    if (capList && capItems) {
      capList.style.display       = 'flex';
      capList.style.flexDirection = 'column';
      capList.style.gap           = '6px';
      capItems.innerHTML = CAPS[role].map(function (c) {
        return '<div class="cap"><span class="cap-icon">' + c.icon + '</span>' + c.text + '</div>';
      }).join('');
    }
    checkCreate();
  };

  function checkCreate() {
    var nameEl = document.getElementById('groupName');
    var btn    = document.getElementById('btnCreate');
    if (!nameEl || !btn) return;
    var ok = selectedRole && nameEl.value.trim().length > 0;
    btn.disabled      = !ok;
    btn.style.opacity = ok ? '1' : '0.4';
  }

  window.checkJoin = function () {
    var v   = document.getElementById('joinCode').value.trim();
    var btn = document.getElementById('btnJoin');
    if (!btn) return;
    btn.disabled      = v.length < 4;
    btn.style.opacity = v.length >= 4 ? '1' : '0.4';
  };

  window.createGroup = function () {
    window.closeOv('ov-create');
    var dest = selectedRole === 'sup' ? 'supervisor' : 'monitorizado';
    setTimeout(function () { window.goPS(dest); }, 200);
  };

  window.joinGroup = function () {
    window.closeOv('ov-join');
    setTimeout(function () { window.goPS('monitorizado'); }, 200);
  };

  var groupNameEl = document.getElementById('groupName');
  if (groupNameEl) groupNameEl.addEventListener('input', checkCreate);

  /* ─────────────────────────────────────────
     7. AJUSTES — controles
  ───────────────────────────────────────── */
  window.setSeg = function (groupId, btn) {
    var group = document.getElementById(groupId);
    if (!group) return;
    group.querySelectorAll('.seg-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
  };

  window.onLangChange = function (sel) {
    var sub = document.getElementById('lang-sub');
    if (sub) sub.textContent = sel.options[sel.selectedIndex].text;
  };

  /* ─────────────────────────────────────────
     8. SUPERVISOR — selector de miembro
  ───────────────────────────────────────── */
  var MEMBERS = [
    {
      id: 'jose', initials: 'JG', name: 'José García', status: 'Activo hace 2h',
      history: [
        { warn: true,  site: 'bancosantander-ayuda.net',      time: 'Hoy · 11:42 · Bloqueado automáticamente' },
        { warn: false, site: 'bancosantander.es',             time: 'Hoy · 10:15 · Verificado' },
        { warn: false, site: 'correos.es',                    time: 'Ayer · 09:30 · Verificado' },
        { warn: true,  site: 'correos-paquete.info',          time: 'Ayer · 17:05 · Bloqueado automáticamente' },
        { warn: false, site: 'seg-social.es',                 time: 'Lunes · 12:00 · Verificado' },
        { warn: false, site: 'renfe.com',                     time: 'Domingo · 15:22 · Verificado' },
      ]
    },
    {
      id: 'carmen', initials: 'CG', name: 'Carmen García', status: 'Activo ayer',
      history: [
        { warn: true,  site: 'hacienda-online.net',           time: 'Ayer · 17:05 · Bloqueado automáticamente' },
        { warn: false, site: 'sede.agenciatributaria.gob.es', time: 'Ayer · 16:50 · Verificado' },
        { warn: false, site: 'mercadona.es',                  time: 'Ayer · 12:30 · Verificado' },
        { warn: false, site: 'correos.es',                    time: 'Anteayer · 10:05 · Verificado' },
        { warn: true,  site: 'movistar-oferta.info',          time: 'Lunes · 19:14 · Bloqueado automáticamente' },
        { warn: false, site: 'seg-social.es',                 time: 'Domingo · 11:00 · Verificado' },
        { warn: false, site: 'mapfre.es',                     time: 'Sábado · 09:45 · Verificado' },
      ]
    }
  ];

  function renderHistory(m) {
    var el = document.getElementById('hist-list');
    if (!el) return;
    el.innerHTML = m.history.map(function (h) {
      return '<div class="hitem">' +
        '<div class="hico ' + (h.warn ? 'hico-warn' : 'hico-ok') + '">' + (h.warn ? '🛑' : '✅') + '</div>' +
        '<div class="hinfo">' +
          '<div class="hsite">' + h.site + '</div>' +
          '<div class="htime">' + h.time + '</div>' +
        '</div>' +
        '<span class="hstatus ' + (h.warn ? 'hs-warn' : 'hs-ok') + '">' + (h.warn ? 'Alerta' : 'Seguro') + '</span>' +
      '</div>';
    }).join('');
  }

  window.onMemberChange = function (sel) {
    var m = MEMBERS.find(function (x) { return x.id === sel.value; });
    if (!m) return;
    var titleEl  = document.getElementById('hist-title');
    var avEl     = document.getElementById('msel-av');
    var nameEl   = document.getElementById('msel-name');
    var statusEl = document.getElementById('msel-status');
    if (titleEl)  titleEl.textContent  = 'Historial de ' + m.name.split(' ')[0];
    if (avEl)     avEl.textContent     = m.initials;
    if (nameEl)   nameEl.textContent   = m.name;
    if (statusEl) statusEl.textContent = m.status;
    renderHistory(m);
  };

  renderHistory(MEMBERS[0]);

}); // fin DOMContentLoaded

/* ══════════════════════════════════════════════
   LOGICA DEL SIMULADOR DE ADVERTENCIA
══════════════════════════════════════════════ */

(function () {
  // Lista de dominios de ejemplo para la simulación
  var DOMAINS_SIM = [
    { name: 'Agencia Tributaria', domain: 'sede.agenciatributaria.gob.es' },
    { name: 'Banco Santander', domain: 'bancosantander.es' },
    { name: 'BBVA', domain: 'bbva.es' },
    { name: 'Correos', domain: 'correos.es' },
    { name: 'Hacienda', domain: 'sede.minhap.gob.es' },
    { name: 'Movistar', domain: 'movistar.es' },
    { name: 'Renfe', domain: 'renfe.com' },
    { name: 'Seguridad Social', domain: 'seg-social.es' },
  ];

  function randomDomain() {
    return DOMAINS_SIM[Math.floor(Math.random() * DOMAINS_SIM.length)];
  }

  window.simularAdvertencia = function () {
    var d = randomDomain();
    document.getElementById('warnEntity').textContent = d.name;
    document.getElementById('warnDomain').textContent = d.domain;
    document.getElementById('warnOverlay').classList.add('show');
  };

  window.blockThreat = function () {
    cerrarAdvertencia();
  };

  window.skipWarning = function () {
    cerrarAdvertencia();
  };

  function cerrarAdvertencia() {
    var overlay = document.getElementById('warnOverlay');
    overlay.style.animation = 'fadeIn 0.2s ease reverse';
    setTimeout(function () {
      overlay.classList.remove('show');
      overlay.style.animation = '';
    }, 180);
  }

  document.addEventListener('click', function (e) {
    var overlay = document.getElementById('warnOverlay');
    if (e.target === overlay) window.blockThreat();
  });
})();