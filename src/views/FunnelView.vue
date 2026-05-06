<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import { captureFbParams } from '@/utils/fbclid'
import { useLangRouter } from '@/composables/useLangRouter'

const { lang, push } = useLangRouter()
const modalOpen = ref(false)
const IS_DEV = window.location.hostname === 'localhost'

const openModal = () => {
  if (!IS_DEV) {
    const disqAt = localStorage.getItem('os_disq_at')
    if (disqAt && Date.now() - Number(disqAt) < 24 * 60 * 60 * 1000) {
      push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

const tr = {
  es: {
    urgencyBanner: 'Cupos limitados — expiran en:',
    eyebrow: 'Catering Premium de Crepes Francesas',
    headline1: 'Convierte tu evento en una experiencia gastronómica',
    headline2: 'que tus invitados nunca olvidarán',
    vslCaption: 'Descubre cómo Alejandro Moreno transforma eventos ordinarios en experiencias gastronómicas extraordinarias',
    ctaBtn: 'SOLICITAR COTIZACIÓN GRATUITA',
    ctaSub: '100% gratuito · Sin compromiso · Cupos limitados',
    statsLabel: 'Resultados reales — eventos reales',
    problemLabel: '¿Te identificas con esto?',
    problemTitle: 'Lo que arruina los eventos más importantes',
    methodLabel: 'Nuestra metodología de catering',
    methodTitle: 'Tres pasos para un evento perfecto',
    testimonialLabel: 'Lo que dicen nuestros clientes',
    testimonialText: '"El catering de Master Crepes fue el alma de nuestra fiesta corporativa. Ver cómo preparaban las crepes en vivo fue el momento favorito de todos. Alejandro y su equipo superaron todas nuestras expectativas."',
    testimonialAuthor: 'Gerente de Recursos Humanos',
    testimonialRole: 'Empresa multinacional — Evento corporativo 200 personas',
    authorityEyebrow: 'Tu especialista en catering',
    authorityRole: 'Fundador y Chef Ejecutivo — Master Crepes',
    authorityBio: 'Con más de 8 años de experiencia en catering premium, Alejandro Moreno es el referente de las crepes francesas auténticas para eventos de alto nivel. Ha transformado cientos de celebraciones corporativas, bodas y galas en experiencias gastronómicas memorables que sus clientes recuerdan por años.',
    ctaFinalTitle: '¿Tu evento merece lo mejor?',
    ctaFinalSub: 'Solicita una cotización gratuita y personalizada. Conversaremos sobre tu evento, el número de invitados y diseñaremos el menú perfecto para ti.',
    privacyLink: 'Política de Privacidad',
    legalLink: 'Aviso Legal',
    footerCopy: 'Todos los derechos reservados.',
    pillars: [
      'Sin catering aburrido que desanima a los invitados',
      'Sin proveedores que fallan el día del evento',
      'Sin menús genéricos que no impresionan a nadie',
      'Con crepes francesas elaboradas al momento frente a tus invitados',
    ],
    stats: [
      { icon: 'fa-solid fa-utensils', number: '8+', text: 'Años ofreciendo catering premium en eventos de alto nivel' },
      { icon: 'fa-solid fa-star', number: '500+', text: 'Eventos exitosos: corporativos, bodas y celebraciones' },
      { icon: 'fa-solid fa-heart', number: '98%', text: 'De los clientes repetiría el catering con Master Crepes' },
    ],
    problems: [
      { title: 'Catering genérico y sin personalidad', body: 'Bufés aburridos que nadie recuerda al día siguiente y que no reflejan la importancia del evento.' },
      { title: 'Proveedores que fallan en el momento clave', body: 'Comida fría, llegada tarde o personal sin profesionalismo que arruina la reputación del anfitrión.' },
      { title: 'Sin el WOW factor que todo evento necesita', body: 'Cuando el catering no genera conversación ni fotos, el evento se vuelve uno más del montón.' },
    ],
    methodology: [
      { num: '01', icon: 'fa-solid fa-clipboard-list', title: 'Diseño del Menú Personalizado', body: 'Creamos el menú perfecto para tu evento según el tipo de celebración, número de invitados y preferencias.' },
      { num: '02', icon: 'fa-solid fa-truck', title: 'Logística y Coordinación', body: 'Nos encargamos de todo: instalación, equipo, ingredientes y personal para que tú no te preocupes por nada.' },
      { num: '03', icon: 'fa-solid fa-fire-burner', title: 'Servicio en Vivo el Día del Evento', body: 'Nuestros crepe-makers elaboran las crepes al momento frente a tus invitados, creando una experiencia única.' },
    ],
    creds: [
      'Especialista en crepes francesas auténticas',
      'Catering para eventos corporativos y bodas',
      'Servicio en vivo: experiencia visual y gastronómica',
    ],
  },
  en: {
    urgencyBanner: 'Limited spots — expiring in:',
    eyebrow: 'Premium French Crêpe Catering',
    headline1: 'Turn your event into a gastronomic experience',
    headline2: 'your guests will never forget',
    vslCaption: 'Discover how Alejandro Moreno transforms ordinary events into extraordinary gastronomic experiences',
    ctaBtn: 'REQUEST A FREE QUOTE',
    ctaSub: '100% free · No commitment · Limited spots',
    statsLabel: 'Real results — real events',
    problemLabel: 'Can you relate?',
    problemTitle: 'What ruins the most important events',
    methodLabel: 'Our catering methodology',
    methodTitle: 'Three steps to a perfect event',
    testimonialLabel: 'What our clients say',
    testimonialText: '"Master Crepes catering was the soul of our corporate party. Watching them make crêpes live was everyone\'s favorite moment. Alejandro and his team exceeded all our expectations."',
    testimonialAuthor: 'Human Resources Manager',
    testimonialRole: 'Multinational company — Corporate event, 200 guests',
    authorityEyebrow: 'Your catering specialist',
    authorityRole: 'Founder & Executive Chef — Master Crepes',
    authorityBio: 'With over 8 years of experience in premium catering, Alejandro Moreno is the leading expert in authentic French crêpes for high-end events. He has transformed hundreds of corporate celebrations, weddings, and galas into memorable gastronomic experiences his clients talk about for years.',
    ctaFinalTitle: 'Does your event deserve the best?',
    ctaFinalSub: 'Request a free, personalized quote. We\'ll talk about your event, number of guests, and design the perfect menu for you.',
    privacyLink: 'Privacy Policy',
    legalLink: 'Legal Notice',
    footerCopy: 'All rights reserved.',
    pillars: [
      'No boring catering that disappoints your guests',
      'No vendors who fail on the day of the event',
      'No generic menus that impress nobody',
      'Fresh French crêpes prepared live in front of your guests',
    ],
    stats: [
      { icon: 'fa-solid fa-utensils', number: '8+', text: 'Years offering premium catering at high-end events' },
      { icon: 'fa-solid fa-star', number: '500+', text: 'Successful events: corporate, weddings, and celebrations' },
      { icon: 'fa-solid fa-heart', number: '98%', text: 'Of clients would hire Master Crepes catering again' },
    ],
    problems: [
      { title: 'Generic catering with no personality', body: "Boring buffets nobody remembers the next day, that fail to reflect the importance of the event." },
      { title: 'Vendors who fail at the critical moment', body: "Cold food, late arrivals, or unprofessional staff that ruins the host's reputation." },
      { title: 'Missing the WOW factor every event needs', body: "When catering doesn't spark conversation or photos, the event becomes just another forgettable night." },
    ],
    methodology: [
      { num: '01', icon: 'fa-solid fa-clipboard-list', title: 'Custom Menu Design', body: "We create the perfect menu for your event based on the type of celebration, number of guests, and preferences." },
      { num: '02', icon: 'fa-solid fa-truck', title: 'Logistics & Coordination', body: "We handle everything: setup, equipment, ingredients, and staff so you don't have to worry about a thing." },
      { num: '03', icon: 'fa-solid fa-fire-burner', title: 'Live Service on Event Day', body: "Our crêpe makers prepare fresh crêpes right in front of your guests, creating a truly unique experience." },
    ],
    creds: [
      'Specialist in authentic French crêpes',
      'Catering for corporate events and weddings',
      'Live service: visual and gastronomic experience',
    ],
  },
}

const t = computed(() => tr[lang.value])
const pillars = computed(() => t.value.pillars)
const stats = computed(() => t.value.stats)
const methodology = computed(() => t.value.methodology)

// Countdown urgency (24h rolling)
const hours = ref('23')
const minutes = ref('47')
const seconds = ref('12')
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  captureFbParams()
  let total = 23 * 3600 + 47 * 60 + 12
  interval = setInterval(() => {
    total--
    if (total <= 0) total = 23 * 3600 + 59 * 60 + 59
    hours.value = String(Math.floor(total / 3600)).padStart(2, '0')
    minutes.value = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
    seconds.value = String(total % 60).padStart(2, '0')
  }, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="funnel">

    <!-- TOP BAR -->
    <header class="funnel__topbar">
      <h2 class="funnel__logo-text">MASTER CREPES</h2>
    </header>

    <!-- URGENCY BANNER -->
    <div class="funnel__urgency" role="banner">
      <span class="funnel__urgency-dot" aria-hidden="true" />
      <span>{{ t.urgencyBanner }}</span>
      <div class="funnel__timer" aria-live="polite" aria-label="Tiempo restante">
        <span class="funnel__timer-block"><strong>{{ hours }}</strong><small>h</small></span>
        <span class="funnel__timer-sep" aria-hidden="true">:</span>
        <span class="funnel__timer-block"><strong>{{ minutes }}</strong><small>m</small></span>
        <span class="funnel__timer-sep" aria-hidden="true">:</span>
        <span class="funnel__timer-block"><strong>{{ seconds }}</strong><small>s</small></span>
      </div>
    </div>

    <!-- HERO -->
    <section class="funnel__hero" aria-labelledby="funnel-headline">
      <div class="funnel__container">

        <p class="funnel__eyebrow">
          <i class="fa-solid fa-utensils" aria-hidden="true"></i>
          {{ t.eyebrow }}
        </p>

        <h1 id="funnel-headline" class="funnel__headline">
          {{ t.headline1 }}
          <span class="funnel__headline-accent">{{ t.headline2 }}</span>
        </h1>

        <ul class="funnel__pillars" role="list">
          <li v-for="p in pillars" :key="p" class="funnel__pillar">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            {{ p }}
          </li>
        </ul>

        <!-- VSL Gated Area -->
        <div class="funnel__vsl-wrap">
          <div class="funnel__vsl" @click="openModal()" role="button" aria-label="Ver video" tabindex="0">
            <div class="funnel__vsl-bg">
              <img src="https://fast.wistia.com/embed/medias/88xzla80cy/swatch" class="funnel__vsl-thumb" alt="Vista previa video" />
              <div class="funnel__vsl-blur-overlay"></div>
            </div>
            <div class="funnel__vsl-overlay">
              <div class="funnel__vsl-play">
                <i class="fa-solid fa-play" aria-hidden="true"></i>
              </div>
              <p class="funnel__vsl-caption">{{ t.vslCaption }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="funnel__cta-wrap">
          <button class="funnel__cta-btn" @click="openModal()">
            <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
            {{ t.ctaBtn }}
          </button>
          <p class="funnel__cta-sub">
            <i class="fa-solid fa-lock" aria-hidden="true"></i>
            {{ t.ctaSub }}
          </p>
        </div>

      </div>
    </section>

    <!-- STATS -->
    <section class="funnel__stats" aria-label="Resultados comprobados">
      <div class="funnel__container">
        <p class="funnel__section-label funnel__section-label--light">{{ t.statsLabel }}</p>
        <div class="funnel__stats-grid">
          <div v-for="stat in stats" :key="stat.number" class="funnel__stat">
            <div class="funnel__stat-icon" aria-hidden="true">
              <i :class="stat.icon"></i>
            </div>
            <strong class="funnel__stat-number">{{ stat.number }}</strong>
            <p class="funnel__stat-text">{{ stat.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEMA -->
    <section class="funnel__problem" aria-labelledby="problem-heading">
      <div class="funnel__container">
        <p class="funnel__section-label">{{ t.problemLabel }}</p>
        <h2 id="problem-heading" class="funnel__section-title">{{ t.problemTitle }}</h2>
        <div class="funnel__problem-grid">
          <div v-for="problem in t.problems" :key="problem.title" class="funnel__problem-item">
            <i class="fa-solid fa-triangle-exclamation funnel__problem-icon" aria-hidden="true"></i>
            <div>
              <strong>{{ problem.title }}</strong>
              <p>{{ problem.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- METODOLOGÍA -->
    <section class="funnel__method" aria-labelledby="method-heading">
      <div class="funnel__container">
        <p class="funnel__section-label">{{ t.methodLabel }}</p>
        <h2 id="method-heading" class="funnel__section-title">{{ t.methodTitle }}</h2>
        <div class="funnel__method-grid">
          <div v-for="m in methodology" :key="m.num" class="funnel__method-card">
            <div class="funnel__method-num" aria-hidden="true">{{ m.num }}</div>
            <div class="funnel__method-icon" aria-hidden="true">
              <i :class="m.icon"></i>
            </div>
            <h3 class="funnel__method-title">{{ m.title }}</h3>
            <p class="funnel__method-body">{{ m.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL -->
    <section class="funnel__testimonial" aria-labelledby="testimonial-heading">
      <div class="funnel__container">
        <p class="funnel__section-label">{{ t.testimonialLabel }}</p>
        <div class="funnel__testimonial-card">
          <i class="fa-solid fa-quote-left funnel__testimonial-quote" aria-hidden="true"></i>
          <blockquote class="funnel__testimonial-text">{{ t.testimonialText }}</blockquote>
          <footer class="funnel__testimonial-author">
            <div class="funnel__testimonial-avatar" aria-hidden="true">
              <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <strong>{{ t.testimonialAuthor }}</strong>
              <span>{{ t.testimonialRole }}</span>
            </div>
          </footer>
        </div>
      </div>
    </section>

    <!-- AUTHORITY — Alejandro Moreno -->
    <section class="funnel__authority" aria-labelledby="authority-heading">
      <div class="funnel__container funnel__authority-inner">
        <div class="funnel__authority-photo-wrap">
          <div class="funnel__authority-avatar" aria-hidden="true">
            <i class="fa-solid fa-utensils"></i>
          </div>
        </div>
        <div class="funnel__authority-content">
          <p class="funnel__authority-eyebrow">{{ t.authorityEyebrow }}</p>
          <h2 id="authority-heading" class="funnel__authority-name">Alejandro Moreno</h2>
          <p class="funnel__authority-role">{{ t.authorityRole }}</p>
          <p class="funnel__authority-bio">{{ t.authorityBio }}</p>
          <ul class="funnel__authority-creds" role="list">
            <li v-for="cred in t.creds" :key="cred">
              <i class="fa-solid fa-check-circle" aria-hidden="true"></i> {{ cred }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="funnel__cta-final" aria-labelledby="cta-final-heading">
      <div class="funnel__container">
        <h2 id="cta-final-heading" class="funnel__cta-final-title">{{ t.ctaFinalTitle }}</h2>
        <p class="funnel__cta-final-sub">{{ t.ctaFinalSub }}</p>
        <button class="funnel__cta-btn" @click="openModal()">
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          {{ t.ctaBtn }}
        </button>
        <p class="funnel__cta-sub">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          {{ t.ctaSub }}
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="funnel__footer">
      <div class="funnel__container funnel__footer-inner">
        <h2 class="funnel__footer-logo-text">MASTER CREPES</h2>
        <nav class="funnel__footer-links" aria-label="Legal">
          <RouterLink to="/politicas-privacidad">{{ t.privacyLink }}</RouterLink>
          <RouterLink to="/aviso-legal">{{ t.legalLink }}</RouterLink>
        </nav>
        <p class="funnel__footer-copy">
          © {{ new Date().getFullYear() }} MASTER CREPES. {{ t.footerCopy }}
        </p>
      </div>
    </footer>

  </div>

  <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.funnel {
  background: #ffffff;
  color: colors.$OS-DARK;
  min-height: 100vh;
  font-family: fonts.$font-secondary;

  &__container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    @media (min-width: 768px) { padding: 0 2rem; }
  }
}

// ── Top bar ──────────────────────────────────────────────────────────────────
.funnel__topbar {
  background: #ffffff;
  border-bottom: 1px solid #E8DDD0;
  padding: 0.9rem 1.5rem;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
}

.funnel__logo-text {
  font-family: fonts.$font-accent;
  font-size: 1.1rem;
  font-weight: 800;
  color: colors.$OS-DARK;
  letter-spacing: 0.04em;
  margin: 0;
}

// ── Urgency banner ───────────────────────────────────────────────────────────
.funnel__urgency {
  background: colors.$OS-NAVY;
  color: #ffffff;
  padding: 0.55rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  font-family: fonts.$font-interface;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.funnel__urgency-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ADE80;
  flex-shrink: 0;
  animation: dot-pulse 1.5s infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.75); }
}

.funnel__timer {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.funnel__timer-block {
  display: flex;
  align-items: baseline;
  gap: 1px;
  strong { font-size: 0.95rem; font-weight: 800; }
  small { font-size: 0.68rem; opacity: 0.75; }
}

.funnel__timer-sep { font-weight: 800; opacity: 0.5; padding: 0 1px; }

// ── Hero ─────────────────────────────────────────────────────────────────────
.funnel__hero {
  padding: 3.5rem 0 3rem;
  background: linear-gradient(180deg, #FFF5EE 0%, #ffffff 70%);
}

.funnel__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(colors.$OS-NAVY, 0.06);
  border: 1px solid rgba(colors.$OS-NAVY, 0.14);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  color: colors.$OS-NAVY;
  font-family: fonts.$font-interface;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 1.4rem;
  i { font-size: 0.8rem; }
}

.funnel__headline {
  @include fonts.heading-font(800);
  font-size: clamp(2rem, 5vw, 3.1rem);
  line-height: 1.15;
  color: colors.$OS-DARK;
  margin: 0 0 1.5rem;
  letter-spacing: -0.025em;

  &-accent { color: colors.$OS-RED; }
}

.funnel__vsl-player-container {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(colors.$AB-WOOD, 0.2);
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);
  background: #000;
  line-height: 0;

  @media (max-width: 768px) {
    border-radius: 12px;
  }
}

.funnel__pillars {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.funnel__pillar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.93rem;
  color: #3A4F6A;

  i {
    color: colors.$OS-BLUE;
    font-size: 0.82rem;
    flex-shrink: 0;
  }
}

// ── VSL ──────────────────────────────────────────────────────────────────────
.funnel__vsl-wrap { margin-bottom: 2rem; }

.funnel__vsl {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid rgba(colors.$MC-GOLD, 0.3);
  box-shadow: 0 8px 40px rgba(44, 26, 16, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(44, 26, 16, 0.2);
  }
  &:focus-visible {
    outline: 3px solid colors.$OS-BLUE;
    outline-offset: 2px;
  }
}

.funnel__vsl-bg {
  position: absolute;
  inset: 0;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
}

.funnel__vsl-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px) brightness(0.6);
  transform: scale(1.1);
  transition: filter 0.4s ease, transform 0.4s ease;

  .funnel__vsl:hover & {
    filter: blur(4px) brightness(0.75);
    transform: scale(1.05);
  }
}

.funnel__vsl-blur-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(colors.$OS-NAVY, 0.2) 0%, rgba(colors.$OS-NAVY, 0.6) 100%);
  z-index: 1;
}

.funnel__vsl-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.funnel__vsl-play {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease;

  .funnel__vsl:hover & { transform: scale(1.1); }

  i {
    color: colors.$OS-RED;
    font-size: 1.7rem;
    margin-left: 5px;
  }
}

.funnel__vsl-caption {
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  text-align: center;
  padding: 0 2rem;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  max-width: 420px;
}

// ── CTA ──────────────────────────────────────────────────────────────────────
.funnel__cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.funnel__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$OS-RED;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 1.1rem 2.5rem;
  font-family: fonts.$font-accent;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  cursor: pointer;
  width: 100%;
  max-width: 480px;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(200, 25, 42, 0.35);

  &:hover {
    background: darken(#C8192A, 10%);
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(200, 25, 42, 0.45);
  }
  &:active { transform: translateY(0); }
}

.funnel__cta-sub {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #8A9BB5;
  margin: 0;
  i { font-size: 0.72rem; }
}

// ── Stats ────────────────────────────────────────────────────────────────────
.funnel__stats {
  background: colors.$OS-NAVY;
  padding: 3rem 0;
}

.funnel__section-label {
  font-family: fonts.$font-interface;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: colors.$OS-NAVY;
  margin: 0 0 1rem;

  &--light { color: rgba(#ffffff, 0.55); }
}

.funnel__stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}

.funnel__stat { text-align: center; }

.funnel__stat-icon {
  font-size: 1.6rem;
  color: rgba(#ffffff, 0.35);
  margin-bottom: 0.5rem;
}

.funnel__stat-number {
  display: block;
  @include fonts.heading-font(800);
  font-size: 2.6rem;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 0.4rem;
  letter-spacing: -0.03em;
}

.funnel__stat-text {
  font-size: 0.83rem;
  color: rgba(#ffffff, 0.7);
  line-height: 1.45;
  margin: 0;
}

// ── Problem ──────────────────────────────────────────────────────────────────
.funnel__problem {
  padding: 4rem 0;
  background: #ffffff;
}

.funnel__section-title {
  @include fonts.heading-font(800);
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: colors.$OS-DARK;
  margin: 0.25rem 0 2rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.funnel__problem-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.funnel__problem-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: #FFFAF5;
  border: 1px solid #EEE0D0;
  border-radius: 12px;

  strong {
    display: block;
    color: colors.$OS-DARK;
    font-size: 0.93rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.86rem;
    color: #4A5F7A;
    line-height: 1.5;
    margin: 0;
  }
}

.funnel__problem-icon {
  font-size: 1.2rem;
  color: colors.$OS-RED;
  flex-shrink: 0;
  margin-top: 2px;
}

// ── Methodology ──────────────────────────────────────────────────────────────
.funnel__method {
  padding: 4rem 0;
  background: #FFF8F0;
}

.funnel__method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
}

.funnel__method-card {
  background: #ffffff;
  border: 1px solid #EEE0D0;
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  position: relative;
  box-shadow: 0 2px 12px rgba(44, 26, 16, 0.05);
}

.funnel__method-num {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  @include fonts.heading-font(800);
  font-size: 2.5rem;
  color: rgba(colors.$OS-NAVY, 0.07);
  line-height: 1;
  user-select: none;
}

.funnel__method-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  i { color: #ffffff; font-size: 1.1rem; }
}

.funnel__method-title {
  @include fonts.heading-font(700);
  font-size: 0.97rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.5rem;
}

.funnel__method-body {
  font-size: 0.86rem;
  color: #4A5F7A;
  line-height: 1.55;
  margin: 0;
}

// ── Testimonial ──────────────────────────────────────────────────────────────
.funnel__testimonial {
  padding: 4rem 0;
  background: #ffffff;
}

.funnel__testimonial-card {
  background: #FFF8F0;
  border: 1px solid rgba(colors.$OS-NAVY, 0.1);
  border-left: 4px solid colors.$OS-RED;
  border-radius: 16px;
  padding: 2rem;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 0 4px 24px rgba(44, 26, 16, 0.07);
}

.funnel__testimonial-quote {
  font-size: 2.2rem;
  color: rgba(colors.$OS-NAVY, 0.12);
  display: block;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.funnel__testimonial-text {
  font-size: 1.1rem;
  color: colors.$OS-DARK;
  line-height: 1.65;
  margin: 0 0 1.5rem;
  font-style: italic;
}

.funnel__testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong { display: block; color: colors.$OS-DARK; font-size: 0.88rem; font-weight: 700; }
  span { font-size: 0.78rem; color: #8A9BB5; }
}

.funnel__testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  i { color: #ffffff; font-size: 1.2rem; }
}

// ── Authority ────────────────────────────────────────────────────────────────
.funnel__authority {
  padding: 4rem 0;
  background: linear-gradient(135deg, #FFF5EE 0%, #FFF8F0 100%);
  border-top: 1px solid #EEE0D0;
  border-bottom: 1px solid #EEE0D0;
}

.funnel__authority-inner {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  @media (max-width: 640px) { flex-direction: column; align-items: center; }
}

.funnel__authority-photo-wrap { flex-shrink: 0; }

.funnel__authority-avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 20px rgba(44, 26, 16, 0.2);
  overflow: hidden;
  i { color: rgba(#ffffff, 0.85); font-size: 2.5rem; }
}

.funnel__authority-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.funnel__authority-content { flex: 1; }

.funnel__authority-eyebrow {
  font-family: fonts.$font-interface;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: colors.$OS-BLUE;
  margin: 0 0 0.35rem;
}

.funnel__authority-name {
  @include fonts.heading-font(800);
  font-size: 2rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.2rem;
  letter-spacing: -0.02em;
}

.funnel__authority-role {
  font-size: 0.88rem;
  color: #8A9BB5;
  margin: 0 0 1rem;
}

.funnel__authority-bio {
  font-size: 0.93rem;
  color: #3A4F6A;
  line-height: 1.65;
  margin: 0 0 1rem;
  strong { color: colors.$OS-DARK; font-weight: 700; }
}

.funnel__authority-creds {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.86rem;
    color: #3A4F6A;
    i { color: colors.$OS-BLUE; font-size: 0.82rem; flex-shrink: 0; }
  }
}

// ── CTA Final ────────────────────────────────────────────────────────────────
.funnel__cta-final {
  padding: 4.5rem 0;
  background: colors.$OS-NAVY;
  text-align: center;

  .funnel__section-label { color: rgba(#ffffff, 0.5); }

  .funnel__cta-btn {
    margin: 0 auto 1rem;
    background: colors.$OS-RED;
    box-shadow: 0 4px 24px rgba(200, 25, 42, 0.4);
    &:hover { background: darken(#C8192A, 10%); }
  }

  .funnel__cta-sub { color: rgba(#ffffff, 0.5); }
}

.funnel__cta-final-title {
  @include fonts.heading-font(800);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: #ffffff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.025em;
}

.funnel__cta-final-sub {
  font-size: 0.97rem;
  color: rgba(#ffffff, 0.72);
  margin: 0 auto 2rem;
  max-width: 520px;
  line-height: 1.55;
}

// ── Footer ───────────────────────────────────────────────────────────────────
.funnel__footer {
  background: colors.$OS-DARK;
  padding: 2rem 1.5rem;
}

.funnel__footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.funnel__footer-logo-text {
  font-family: fonts.$font-accent;
  font-size: 1rem;
  font-weight: 800;
  color: rgba(#ffffff, 0.6);
  letter-spacing: 0.06em;
  margin: 0;
}

.funnel__footer-links {
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 0.78rem;
    color: rgba(#ffffff, 0.45);
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: rgba(#ffffff, 0.85); }
  }
}

.funnel__footer-copy {
  font-size: 0.72rem;
  color: rgba(#ffffff, 0.28);
  margin: 0;
}
</style>
