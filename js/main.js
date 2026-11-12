/* ==========================================================================
   💍 INVITATION DE MARIAGE – LOGIQUE INTERACTIVE & EXPÉRIENCE CRÉATIVE
   ========================================================================== */

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  // Stockage local sécurisé (évite les erreurs si désactivé ou file:///)
  function safeGetItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSetItem(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  }

  // --- Initialisation des données depuis config.js ---
  const n1 = (window.C && C.n1) ? C.n1 : "Kenza";
  const n2 = (window.C && C.n2) ? C.n2 : "3zezna";
  const initials = (window.C && C.initials) ? C.initials : "K & 3";

  if ($("n1")) $("n1").textContent = n1;
  if ($("n2")) $("n2").textContent = n2;
  if ($("envNames")) $("envNames").textContent = n1 + " & " + n2;
  if ($("sealInitials")) $("sealInitials").textContent = initials;
  if ($("footMonogram")) $("footMonogram").textContent = initials;
  if ($("dateTxt") && window.C) $("dateTxt").textContent = C.dateTxt || "";
  if ($("envDateSub") && window.C) $("envDateSub").textContent = (C.dateTxt ? C.dateTxt + " • " : "") + (C.place || "Casablanca");
  if ($("welcomeTag") && window.C && C.welcomeTag) $("welcomeTag").textContent = C.welcomeTag;
  if ($("welcomeSub") && window.C && C.welcomeSubtitle) $("welcomeSub").textContent = C.welcomeSubtitle;
  if ($("placeName") && window.C) $("placeName").textContent = C.place || "";
  if ($("placeAddr") && window.C) $("placeAddr").textContent = C.addr || "";
  if ($("dressTxt") && window.C) $("dressTxt").textContent = C.dress || "";
  if ($("rsvpLead") && window.C) $("rsvpLead").textContent = C.rsvpBy || "";
  if ($("footQuote") && window.C) $("footQuote").textContent = (C.foot || "Avec tout notre amour") + ", " + n1 + " & " + n2;
  if ($("footHashtag") && window.C) $("footHashtag").textContent = C.hashtag || "";

  // Liens d'itinéraire (Google Maps & Waze)
  if (window.C) {
    const mapQuery = encodeURIComponent(C.mapQuery || (C.place + " " + C.addr));
    if ($("gmaps")) $("gmaps").href = "https://www.google.com/maps/search/?api=1&query=" + mapQuery;
    if ($("waze")) $("waze").href = "https://waze.com/ul?q=" + mapQuery + "&navigate=yes";
  }

  // Copier l'adresse
  const btnCopyAddr = $("btnCopyAddr");
  if (btnCopyAddr && window.C) {
    btnCopyAddr.addEventListener("click", function () {
      const fullAddr = (C.place ? C.place + ", " : "") + (C.addr || "");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullAddr).then(function () {
          showToast("✨ Adresse copiée dans le presse-papier !");
        }).catch(function () {
          showToast("📍 " + fullAddr);
        });
      } else {
        showToast("📍 " + fullAddr);
      }
    });
  }

  // Conseils et commodités du lieu
  const tipsGrid = $("tipsGrid");
  if (tipsGrid && window.C && Array.isArray(C.tips)) {
    tipsGrid.innerHTML = C.tips.map(function (tip) {
      if (typeof tip === "string") {
        return '<div class="venue-tip-item"><span class="tip-icon">✨</span><span>' + tip + '</span></div>';
      }
      return '<div class="venue-tip-item"><span class="tip-icon">' + (tip.icon || "✨") + '</span><span>' + tip.text + '</span></div>';
    }).join("");
  }

  // Notre Histoire (Timeline créative)
  const storyGrid = $("storyGrid");
  if (storyGrid && window.C && Array.isArray(C.story)) {
    storyGrid.innerHTML = C.story.map(function (s) {
      return (
        '<div class="story-card">' +
          '<span class="story-badge">' + s.year + '</span>' +
          '<h3 class="story-title">' + s.title + '</h3>' +
          '<p class="story-desc">' + s.desc + '</p>' +
        '</div>'
      );
    }).join("");
  }

  // Programme déroulé
  const tl = $("tl");
  if (tl && window.C && Array.isArray(C.program)) {
    tl.innerHTML = C.program.map(function (p) {
      const icon = p[3] || "💍";
      return (
        '<li class="timeline-item">' +
          '<div class="timeline-icon-box">' + icon + '</div>' +
          '<div class="timeline-content">' +
            '<span class="timeline-time">' + p[0] + '</span>' +
            '<h3 class="timeline-title">' + p[1] + '</h3>' +
            '<p class="timeline-desc">' + p[2] + '</p>' +
          '</div>' +
        '</li>'
      );
    }).join("");
  }

  // Nuances et échantillons de couleurs du dress code
  const sw = $("sw");
  if (sw && window.C) {
    if (Array.isArray(C.colorDetails)) {
      sw.innerHTML = C.colorDetails.map(function (c) {
        return (
          '<div class="swatch-item">' +
            '<div class="swatch-circle" style="background:' + c.hex + '" title="' + c.name + '"></div>' +
            '<span class="swatch-name">' + c.name + '</span>' +
          '</div>'
        );
      }).join("");
    } else if (Array.isArray(C.colors)) {
      sw.innerHTML = C.colors.map(function (hex) {
        return (
          '<div class="swatch-item">' +
            '<div class="swatch-circle" style="background:' + hex + '"></div>' +
          '</div>'
        );
      }).join("");
    }
  }

  // Conseils vestimentaires personnalisés
  if (window.C && C.dressTips) {
    if (C.dressTips.forHer && $("dressForHer")) $("dressForHer").textContent = C.dressTips.forHer;
    if (C.dressTips.forHim && $("dressForHim")) $("dressForHim").textContent = C.dressTips.forHim;
  }

  // Lien "Ajouter à mon Agenda Google"
  const btnAddToCal = $("btnAddToCalendar");
  if (btnAddToCal && window.C && C.date) {
    try {
      const dStart = new Date(C.date);
      const dEnd = new Date(dStart.getTime() + 8 * 3600 * 1000);
      function toCalFormat(d) {
        return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      }
      const calTitle = encodeURIComponent("Mariage de " + n1 + " & " + n2);
      const calDetails = encodeURIComponent("Célébration du mariage de " + n1 + " & " + n2 + " à " + (C.place || "") + ".");
      const calLoc = encodeURIComponent((C.place ? C.place + ", " : "") + (C.addr || ""));
      const calDates = toCalFormat(dStart) + "/" + toCalFormat(dEnd);
      btnAddToCal.href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + calTitle + "&dates=" + calDates + "&details=" + calDetails + "&location=" + calLoc;
    } catch (e) {}
  }

  // ==========================================================================
  // COMPTE À REBOURS PRÉCIS EN TEMPS RÉEL
  // ==========================================================================
  const countEl = $("count");
  function tickCountdown() {
    if (!countEl || !window.C || !C.date) return;
    try {
      const diff = new Date(C.date).getTime() - new Date().getTime();
      if (diff <= 0) {
        countEl.innerHTML = '<div style="font-family:var(--font-serif);font-size:26px;color:var(--gold);padding:10px;">✨ C’est aujourd’hui ! Vive les mariés ! ✨</div>';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const units = [
        [days, "Jours"],
        [hours, "Heures"],
        [minutes, "Min"],
        [seconds, "Sec"]
      ];

      countEl.innerHTML = units.map(function (u) {
        return (
          '<div class="count-unit">' +
            '<span class="count-val">' + (u[0] < 10 ? "0" + u[0] : u[0]) + '</span>' +
            '<span class="count-lbl">' + u[1] + '</span>' +
          '</div>'
        );
      }).join("");
    } catch (e) {}
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  // ==========================================================================
  // EXPÉRIENCE DU SCEAU DE CIRE & ENVELOPPE 3D
  // ==========================================================================
  const sealBtn = $("seal");
  const wrapEl = $("wrap");
  const envEl = $("env");
  const btnOpenDirect = $("btnOpenDirect");
  const btnSkipEnv = $("btnSkipEnv");
  let envelopeOpened = false;

  function openEnvelope(fast) {
    if (envelopeOpened) return;
    envelopeOpened = true;

    // Déverrouiller le défilement immédiatement
    document.body.classList.remove("locked");

    if (fast) {
      if (wrapEl) wrapEl.classList.add("open");
      if (envEl) {
        envEl.classList.add("gone");
        envEl.style.display = "none";
      }
      return;
    }

    if (wrapEl) wrapEl.classList.add("open");

    // Lancer la musique d'Elissa lors du geste d'ouverture
    try {
      playMusic();
    } catch (e) {}

    // Son doux d'ouverture
    try {
      playChimeSound();
    } catch (e) {}

    // Effet d'explosion de paillettes dorées
    try {
      burstSparkles(window.innerWidth / 2, window.innerHeight * 0.55);
    } catch (e) {}

    setTimeout(function () {
      if (envEl) {
        envEl.classList.add("gone");
        setTimeout(function () {
          envEl.style.display = "none";
        }, 500);
      }
      try {
        triggerConfetti(60);
      } catch (e) {}
    }, 1200);
  }

  // Rendre la fonction accessible globalement pour les événements onclick directs
  window.openEnvelope = openEnvelope;

  // Multiples écouteurs d'événements pour garantir l'ouverture sur tous supports
  ["click", "pointerdown", "touchstart"].forEach(function (evtType) {
    if (sealBtn) {
      sealBtn.addEventListener(evtType, function (e) {
        openEnvelope(false);
      }, { passive: true });
    }
    if (wrapEl) {
      wrapEl.addEventListener(evtType, function (e) {
        openEnvelope(false);
      }, { passive: true });
    }
    if (btnOpenDirect) {
      btnOpenDirect.addEventListener(evtType, function (e) {
        openEnvelope(false);
      }, { passive: true });
    }
    if (btnSkipEnv) {
      btnSkipEnv.addEventListener(evtType, function (e) {
        openEnvelope(true);
      }, { passive: true });
    }
    if (envEl) {
      envEl.addEventListener(evtType, function (e) {
        openEnvelope(false);
      }, { passive: true });
    }
  });

  // Revoir l'ouverture
  const btnReplay = $("btnReplayEnv");
  if (btnReplay && envEl && wrapEl) {
    btnReplay.addEventListener("click", function () {
      envelopeOpened = false;
      wrapEl.classList.remove("open");
      envEl.classList.remove("gone");
      document.body.classList.add("locked");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================================================
  // SYSTÈME DE GESTION DES THÈMES CRÉATIFS
  // ==========================================================================
  const themeButtons = document.querySelectorAll("[data-set-theme]");
  function setTheme(name) {
    document.documentElement.setAttribute("data-theme", name);
    themeButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-theme") === name);
    });
    safeSetItem("wedding_theme_preference", name);
    initParticleSettings(name);
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const chosen = this.getAttribute("data-set-theme");
      setTheme(chosen);
      showToast("Ambiance activée : " + this.textContent.trim());
    });
  });

  // Restaurer le thème précédent ou utiliser celui de config.js
  const savedTheme = safeGetItem("wedding_theme_preference") || (window.C && C.defaultTheme) || "beige";
  setTheme(savedTheme);

  // ==========================================================================
  // CANVAS D'AMBIANCE : PARTICULES D'ÉTOILES / PÉTALES INTERACTIFS
  // ==========================================================================
  const ambientCanvas = $("ambientCanvas");
  let ambientCtx = ambientCanvas ? ambientCanvas.getContext("2d") : null;
  let particles = [];
  let currentThemeName = "celestial";

  function resizeAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeAmbientCanvas);
  resizeAmbientCanvas();

  function initParticleSettings(theme) {
    currentThemeName = theme;
    particles = [];
    const count = window.innerWidth < 600 ? 25 : 45;
    const w = ambientCanvas ? ambientCanvas.width : window.innerWidth;
    const h = ambientCanvas ? ambientCanvas.height : window.innerHeight;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.7 + 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }
  }

  function renderAmbient() {
    if (!ambientCtx || !ambientCanvas) return;
    ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > ambientCanvas.height) {
        p.y = -10;
        p.x = Math.random() * ambientCanvas.width;
      }
      if (p.x < -10) p.x = ambientCanvas.width + 10;
      if (p.x > ambientCanvas.width + 10) p.x = -10;

      ambientCtx.save();
      ambientCtx.translate(p.x, p.y);
      ambientCtx.rotate(p.rotation);

      if (currentThemeName === "romantic") {
        ambientCtx.fillStyle = "rgba(226, 142, 162, " + p.opacity * 0.6 + ")";
        ambientCtx.beginPath();
        ambientCtx.ellipse(0, 0, p.size * 2, p.size * 3.5, Math.PI / 4, 0, Math.PI * 2);
        ambientCtx.fill();
      } else if (currentThemeName === "beige") {
        // Ambiance Blanc & Beige : lueur dorée champagne douce et soyeuse
        ambientCtx.fillStyle = "rgba(191, 160, 116, " + p.opacity * 0.5 + ")";
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, p.size * 1.3, 0, Math.PI * 2);
        ambientCtx.fill();
        ambientCtx.fillStyle = "rgba(243, 236, 228, " + (p.opacity * 0.25) + ")";
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, p.size * 2.8, 0, Math.PI * 2);
        ambientCtx.fill();
      } else if (currentThemeName === "boho") {
        ambientCtx.fillStyle = "rgba(184, 115, 87, " + p.opacity * 0.5 + ")";
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, p.size * 1.4, 0, Math.PI * 2);
        ambientCtx.fill();
      } else {
        ambientCtx.fillStyle = "rgba(235, 198, 108, " + p.opacity + ")";
        ambientCtx.beginPath();
        ambientCtx.arc(0, 0, p.size, 0, Math.PI * 2);
        ambientCtx.fill();
      }
      ambientCtx.restore();
    }

    requestAnimationFrame(renderAmbient);
  }
  initParticleSettings(savedTheme);
  renderAmbient();

  // ==========================================================================
  // LECTEUR MUSICAL OFFICIEL : ELISSA
  // ==========================================================================
  const audioElissa = $("audioElissa");
  const musicToggle = $("musicToggle");
  const musicWaves = $("musicWaves");
  const musicLabel = $("musicLabel");
  let isPlayingMusic = false;

  function playMusic() {
    if (audioElissa) {
      audioElissa.volume = 0.75;
      const playPromise = audioElissa.play();
      if (playPromise !== undefined) {
        playPromise.then(function () {
          isPlayingMusic = true;
          if (musicWaves) musicWaves.classList.remove("paused");
          if (musicLabel) musicLabel.textContent = "Elissa (En lecture 🎵)";
          if (musicToggle) musicToggle.classList.add("playing");
          showToast("🎵 Musique : Elissa – Asaad Wahda");
        }).catch(function () {
          // Si le navigateur bloque l'audio sans interaction
          isPlayingMusic = false;
        });
      }
    }
  }

  function pauseMusic() {
    if (audioElissa) {
      audioElissa.pause();
    }
    isPlayingMusic = false;
    if (musicWaves) musicWaves.classList.add("paused");
    if (musicLabel) musicLabel.textContent = "🎵 Elissa – Asaad Wahda";
    if (musicToggle) musicToggle.classList.remove("playing");
  }

  function toggleMusic() {
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }

  function playChimeSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const chimeFreqs = [523.25, 659.25, 783.99, 1046.50];
      chimeFreqs.forEach(function (f, idx) {
        setTimeout(function () {
          try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
          } catch (err) {}
        }, idx * 110);
      });
    } catch (e) {}
  }

  // ==========================================================================
  // CONFETTIS & ÉTINCELLES DORÉES
  // ==========================================================================
  const confettiCanvas = $("confettiCanvas");
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
  let activeConfettis = [];

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  function triggerConfetti(num) {
    if (!confettiCanvas) return;
    const colors = ["#D4AF37", "#FFE58F", "#FFFFFF", "#E8BDB4", "#9C1B28"];
    for (let i = 0; i < (num || 80); i++) {
      activeConfettis.push({
        x: Math.random() * confettiCanvas.width,
        y: -10,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }
  }

  function burstSparkles(originX, originY) {
    if (!confettiCanvas) return;
    const colors = ["#FFF4D0", "#FFD700", "#D4AF37", "#FFFFFF"];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      activeConfettis.push({
        x: originX,
        y: originY,
        w: Math.random() * 4 + 2,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: 0,
        rotSpeed: 2
      });
    }
  }

  function updateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = activeConfettis.length - 1; i >= 0; i--) {
      const c = activeConfettis[i];
      c.x += c.vx;
      c.y += c.vy;
      c.rot += c.rotSpeed;

      confettiCtx.save();
      confettiCtx.translate(c.x, c.y);
      confettiCtx.rotate((c.rot * Math.PI) / 180);
      confettiCtx.fillStyle = c.color;
      confettiCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      confettiCtx.restore();

      if (c.y > confettiCanvas.height + 20) {
        activeConfettis.splice(i, 1);
      }
    }
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();

  // ==========================================================================
  // LIVRE D'OR VIRTUEL INTERACTIF
  // ==========================================================================
  const gbForm = $("guestbookForm");
  const gbFeed = $("guestbookFeed");
  const GB_KEY = "wedding_guestbook_entries";

  const defaultEntries = [
    {
      author: "Yasmine & Mehdi",
      time: "Il y a 2 jours",
      text: "Toutes nos félicitations à vous deux ! Nous avons tellement hâte de célébrer cette journée magique avec vous 🥂❤️"
    },
    {
      author: "Famille Berrada",
      time: "Il y a 4 jours",
      text: "Que votre vie commune soit remplie de bonheur infini, de rires et de douceurs. Que Dieu bénisse votre union ! 💍✨"
    }
  ];

  function getEntries() {
    try {
      const raw = safeGetItem(GB_KEY);
      return raw ? JSON.parse(raw) : defaultEntries;
    } catch (e) {
      return defaultEntries;
    }
  }

  function renderGuestbook() {
    if (!gbFeed) return;
    const entries = getEntries();
    gbFeed.innerHTML = entries.map(function (e) {
      return (
        '<div class="guestbook-entry">' +
          '<div class="guestbook-meta">' +
            '<span class="guestbook-author">' + escapeHtml(e.author) + '</span>' +
            '<span class="guestbook-time">' + escapeHtml(e.time) + '</span>' +
          '</div>' +
          '<p class="guestbook-text">' + escapeHtml(e.text) + '</p>' +
        '</div>'
      );
    }).join("");
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  if (gbForm) {
    gbForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const author = $("gbAuthor").value.trim();
      const msg = $("gbMessage").value.trim();
      if (!author || !msg) return;

      const entries = getEntries();
      entries.unshift({
        author: author,
        time: "À l'instant",
        text: msg
      });
      safeSetItem(GB_KEY, JSON.stringify(entries));

      $("gbAuthor").value = "";
      $("gbMessage").value = "";
      renderGuestbook();
      showToast("💌 Merci ! Votre mot a été ajouté au livre d'or.");
      triggerConfetti(40);
    });
  }
  renderGuestbook();

  // ==========================================================================
  // FORMULAIRE RSVP AVEC FORMATAGE WHATSAPP ENRICHI
  // ==========================================================================
  const rsvpForm = $("rsvpForm");
  const groupGuestCount = $("groupGuestCount");
  const attendanceRadios = document.querySelectorAll('input[name="r"]');

  attendanceRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (groupGuestCount) {
        groupGuestCount.style.display = this.value === "yes" ? "flex" : "none";
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = $("nm").value.trim();
      const isYes = document.querySelector('input[name="r"]:checked').value === "yes";
      const count = isYes ? $("nb").value : "0";
      const diet = $("diet") ? $("diet").value.trim() : "";
      const song = $("song") ? $("song").value.trim() : "";

      let text = "";
      if (isYes) {
        text = "💍 *Confirmation Présence au Mariage de " + n1 + " & " + n2 + "*\n\n";
        text += "✨ *Nom(s) :* " + name + "\n";
        text += "👥 *Nombre d'invités :* " + count + " personne(s)\n";
        text += "🎉 *Présence :* Avec une immense joie !\n";
        if (diet) text += "🍽️ *Régime / Préférences :* " + diet + "\n";
        if (song) text += "🎵 *Chanson pour danser :* " + song + "\n";
        text += "\nNous avons hâte de célébrer avec vous ! Félicitations ! 🥂💖";
      } else {
        text = "💐 *Message pour le Mariage de " + n1 + " & " + n2 + "*\n\n";
        text += "✨ *Nom :* " + name + "\n";
        text += "🕊️ *Présence :* Je serai de tout cœur avec vous par la pensée, mais je ne pourrai malheureusement pas être présent(e).\n";
        text += "\nTous mes vœux les plus sincères de bonheur et d'amour éternel ! 💍✨";
      }

      triggerConfetti(100);
      showToast("🚀 Redirection vers WhatsApp...");

      const phone = (window.C && C.phone) ? C.phone : "212600000000";
      const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
      setTimeout(function () {
        window.open(url, "_blank");
      }, 700);
    });
  }

  // ==========================================================================
  // SYSTÈME DE TOAST NOTIFICATION
  // ==========================================================================
  const toastEl = $("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3500);
  }

})();
