import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '../views/FunnelView.vue'
import VideoView from '../views/VideoView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import BookingView from '../views/BookingView.vue'
import BookedView from '../views/BookedView.vue'
import NoSpaceView from '../views/NoSpaceView.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
    lang: 'es' | 'en'
    jsonLd?: object[]
  }
}

const MC = 'https://themastercrepes.com'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    // ── English ───────────────────────────────────────────────────────────────
    {
      path: '/',
      name: 'funnel',
      component: FunnelView,
      meta: {
        lang: 'en',
        title: 'Master Crepes | Premium French Crêpe Catering for Events',
        description: 'Premium French crêpe catering for corporate events, weddings and celebrations. Request a free quote with Alejandro Moreno.',
        canonical: `${MC}/`,
        ogTitle: 'Master Crepes | Premium French Crêpe Catering',
        ogDescription: 'Live crêpe stations for your most memorable events. Free quote, no commitment.',
        ogUrl: `${MC}/`,
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      name: 'video',
      component: VideoView,
      meta: {
        lang: 'en',
        title: 'Watch the Video | Master Crepes — Step 1 of 2',
        description: 'See how Master Crepes transforms ordinary events into extraordinary gastronomic experiences.',
        canonical: `${MC}/ver-video`,
        ogTitle: 'Watch the Video | Master Crepes',
        ogDescription: 'Watch the video and schedule your free catering consultation.',
        ogUrl: `${MC}/ver-video`,
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        lang: 'en',
        title: 'Schedule Your Consultation | Master Crepes — Step 2 of 2',
        description: 'Choose your date and time for a free catering consultation with Alejandro Moreno.',
        canonical: `${MC}/agendar`,
        ogTitle: 'Schedule Your Consultation | Master Crepes',
        ogDescription: 'Pick your time and book your free catering consultation.',
        ogUrl: `${MC}/agendar`,
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        lang: 'en',
        title: 'Consultation Confirmed | Master Crepes',
        description: 'Your catering consultation with Master Crepes is confirmed. Check your email for details.',
        canonical: `${MC}/cita-confirmada`,
        ogTitle: 'Consultation Confirmed | Master Crepes',
        ogDescription: "Your consultation is booked. We'll be in touch soon.",
        ogUrl: `${MC}/cita-confirmada`,
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        lang: 'en',
        title: 'Budget Too Low | Master Crepes',
        description: "Our premium catering requires a minimum budget of $500. We look forward to serving you when you're ready.",
        canonical: `${MC}/sin-espacio`,
        ogTitle: 'Budget Too Low | Master Crepes',
        ogDescription: 'Our catering requires a minimum $500 budget.',
        ogUrl: `${MC}/sin-espacio`,
      } satisfies RouteMeta,
    },
    // ── Spanish ───────────────────────────────────────────────────────────────
    {
      path: '/es',
      name: 'funnel-es',
      component: FunnelView,
      meta: {
        lang: 'es',
        title: 'Master Crepes | Catering Premium de Crepes Francesas',
        description: 'Catering premium de crepes francesas para eventos corporativos, bodas y celebraciones. Solicita tu cotización gratuita con Alejandro Moreno.',
        canonical: `${MC}/es`,
        ogTitle: 'Master Crepes | Catering Premium de Crepes Francesas',
        ogDescription: 'Estaciones de crepes en vivo para tus eventos más memorables. Cotización gratuita, sin compromiso.',
        ogUrl: `${MC}/es`,
      } satisfies RouteMeta,
    },
    {
      path: '/es/ver-video',
      name: 'video-es',
      component: VideoView,
      meta: {
        lang: 'es',
        title: 'Ve el Video | Master Crepes — Paso 1 de 2',
        description: 'Descubre cómo Master Crepes transforma eventos ordinarios en experiencias gastronómicas extraordinarias.',
        canonical: `${MC}/es/ver-video`,
        ogTitle: 'Ve el Video | Master Crepes',
        ogDescription: 'Ve el video y agenda tu consulta de catering gratuita.',
        ogUrl: `${MC}/es/ver-video`,
      } satisfies RouteMeta,
    },
    {
      path: '/es/agendar',
      name: 'booking-es',
      component: BookingView,
      meta: {
        lang: 'es',
        title: 'Agenda tu Consulta | Master Crepes — Paso 2 de 2',
        description: 'Elige la fecha y hora para tu consulta de catering gratuita con Alejandro Moreno.',
        canonical: `${MC}/es/agendar`,
        ogTitle: 'Agenda tu Consulta | Master Crepes',
        ogDescription: 'Escoge tu horario y reserva tu consulta de catering gratuita.',
        ogUrl: `${MC}/es/agendar`,
      } satisfies RouteMeta,
    },
    {
      path: '/es/cita-confirmada',
      name: 'booked-es',
      component: BookedView,
      meta: {
        lang: 'es',
        title: 'Cita Confirmada | Master Crepes',
        description: 'Tu consulta de catering con Master Crepes está confirmada. Revisa tu correo para los detalles.',
        canonical: `${MC}/es/cita-confirmada`,
        ogTitle: 'Cita Confirmada | Master Crepes',
        ogDescription: 'Tu consulta está agendada. Pronto te contactaremos.',
        ogUrl: `${MC}/es/cita-confirmada`,
      } satisfies RouteMeta,
    },
    {
      path: '/es/sin-espacio',
      name: 'no-space-es',
      component: NoSpaceView,
      meta: {
        lang: 'es',
        title: 'Presupuesto Insuficiente | Master Crepes',
        description: 'Nuestro catering premium requiere un presupuesto mínimo de $500. Con gusto te atendemos cuando estés listo.',
        canonical: `${MC}/es/sin-espacio`,
        ogTitle: 'Presupuesto Insuficiente | Master Crepes',
        ogDescription: 'Nuestro catering requiere un presupuesto mínimo de $500.',
        ogUrl: `${MC}/es/sin-espacio`,
      } satisfies RouteMeta,
    },
    // ── Legal (shared) ────────────────────────────────────────────────────────
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        lang: 'es',
        title: 'Política de Privacidad | Master Crepes',
        description: 'Política de privacidad de Master Crepes.',
        canonical: `${MC}/politicas-privacidad`,
        ogTitle: 'Política de Privacidad | Master Crepes',
        ogDescription: 'Política de privacidad de Master Crepes.',
        ogUrl: `${MC}/politicas-privacidad`,
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        lang: 'es',
        title: 'Aviso Legal | Master Crepes',
        description: 'Aviso legal de Master Crepes.',
        canonical: `${MC}/aviso-legal`,
        ogTitle: 'Aviso Legal | Master Crepes',
        ogDescription: 'Aviso legal de Master Crepes.',
        ogUrl: `${MC}/aviso-legal`,
      } satisfies RouteMeta,
    },
  ],
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? 'Master Crepes'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
  document.documentElement.lang = meta.lang === 'en' ? 'en' : 'es'
})

// ── Guards ────────────────────────────────────────────────────────────────────
router.beforeEach((to, from, next) => {
  const isEs = to.path.startsWith('/es')
  const sfx = isEs ? '-es' : ''
  const isBooked = !!localStorage.getItem('os_booked_at')
  const isDisqualified = !!localStorage.getItem('os_disq_at')

  if (isBooked && !['booked' + sfx, 'privacy-policy', 'legal-notice'].includes(to.name as string)) {
    return next({ name: 'booked' + sfx })
  }
  if (isDisqualified && ['booking' + sfx, 'booked' + sfx].includes(to.name as string)) {
    return next({ name: 'no-space' + sfx })
  }
  next()
})

export default router
