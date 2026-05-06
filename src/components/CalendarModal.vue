<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'
import { useLangRouter } from '@/composables/useLangRouter'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { lang, push } = useLangRouter()

const cmtr = {
  es: {
    title: 'Antes de agendar, cuéntanos sobre',
    titleAccent: 'tu evento',
    subtitle: '5 preguntas rápidas para diseñar tu propuesta — 60 segundos.',
    q1: '¿Qué tipo de evento estás organizando?',
    q1opts: [
      { value: 'corporativo', label: 'Evento corporativo (empresa)' },
      { value: 'boda',        label: 'Boda o celebración' },
      { value: 'cumpleanos',  label: 'Cumpleaños o reunión familiar' },
      { value: 'gala',        label: 'Gala o evento social' },
      { value: 'otro',        label: 'Otro evento' },
    ],
    q2: '¿Cuántos invitados esperan en el evento?',
    q2opts: [
      { value: 'menos50',   label: 'Menos de 50 personas' },
      { value: '50-150',    label: '50 a 150 personas' },
      { value: '150-300',   label: '150 a 300 personas' },
      { value: 'mas300',    label: 'Más de 300 personas' },
    ],
    q3: '¿Cuándo está planificado tu evento?',
    q3opts: [
      { value: 'proximo_mes',     label: 'En el próximo mes' },
      { value: 'proximos_3meses', label: 'En los próximos 3 meses' },
      { value: 'proximos_6meses', label: 'En los próximos 6 meses' },
      { value: 'planificando',    label: 'Estoy en planificación' },
    ],
    q4: '¿Cuál es tu presupuesto para el catering?',
    q4opts: [
      { value: 'mas5000',     label: 'Más de $5,000 USD' },
      { value: '1500-5000',   label: '$1,500 - $5,000 USD' },
      { value: '500-1500',    label: '$500 - $1,500 USD' },
      { value: 'menos500',    label: 'Menos de $500 USD' },
    ],
    q5: 'Cuéntanos un poco sobre tu evento',
    q5ph: 'Ej: Estamos organizando una cena corporativa para 80 personas el próximo mes. Queremos una estación de crepes en vivo que sorprenda a nuestros clientes...',
    q5hint: (n: number) => `${n}/10 palabras mínimo`,
    consent: 'Acepto que Master Crepes me contacte para presentarme una propuesta de catering personalizada.',
    submit: 'Ver disponibilidad',
    submitting: 'Procesando...',
    errRequired: 'Selecciona una opción',
    errDesc: 'Describe tu evento con al menos 10 palabras',
    errConsent: 'Debes aceptar para continuar',
    closeLabel: 'Cerrar',
  },
  en: {
    title: 'Before booking, tell us about',
    titleAccent: 'your event',
    subtitle: '5 quick questions to design your proposal — 60 seconds.',
    q1: 'What type of event are you organizing?',
    q1opts: [
      { value: 'corporativo', label: 'Corporate event (company)' },
      { value: 'boda',        label: 'Wedding or celebration' },
      { value: 'cumpleanos',  label: 'Birthday or family gathering' },
      { value: 'gala',        label: 'Gala or social event' },
      { value: 'otro',        label: 'Other event' },
    ],
    q2: 'How many guests are expected at the event?',
    q2opts: [
      { value: 'menos50',   label: 'Fewer than 50 people' },
      { value: '50-150',    label: '50 to 150 people' },
      { value: '150-300',   label: '150 to 300 people' },
      { value: 'mas300',    label: 'More than 300 people' },
    ],
    q3: 'When is your event planned?',
    q3opts: [
      { value: 'proximo_mes',     label: 'In the next month' },
      { value: 'proximos_3meses', label: 'In the next 3 months' },
      { value: 'proximos_6meses', label: 'In the next 6 months' },
      { value: 'planificando',    label: "I'm in the planning stage" },
    ],
    q4: 'What is your budget for catering?',
    q4opts: [
      { value: 'mas5000',     label: 'More than $5,000 USD' },
      { value: '1500-5000',   label: '$1,500 - $5,000 USD' },
      { value: '500-1500',    label: '$500 - $1,500 USD' },
      { value: 'menos500',    label: 'Less than $500 USD' },
    ],
    q5: 'Tell us a bit about your event',
    q5ph: "e.g. We're organizing a corporate dinner for 80 people next month. We want a live crêpe station that will wow our clients and be the center of attention for the evening...",
    q5hint: (n: number) => `${n}/10 words minimum`,
    consent: 'I agree to be contacted by Master Crepes to receive a personalized catering proposal.',
    submit: 'Check availability',
    submitting: 'Processing...',
    errRequired: 'Please select an option',
    errDesc: 'Describe your event with at least 10 words',
    errConsent: 'You must accept to continue',
    closeLabel: 'Close',
  },
}
const cmt = computed(() => cmtr[lang.value])
const contactStore = useContactStore()
const IS_DEV = window.location.hostname === 'localhost'

const submitting = ref(false)
const touched = ref(false)

const form = ref({
  tipo_evento: '',
  invitados: '',
  fecha: '',
  presupuesto: '',
  descripcion: '',
  consent: false,
})

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

const isValid = () =>
  !!form.value.tipo_evento &&
  !!form.value.invitados &&
  !!form.value.fecha &&
  !!form.value.presupuesto &&
  wordCount(form.value.descripcion) >= 10 &&
  form.value.consent

const qualifies = () => {
  if (form.value.presupuesto === 'menos500') return false
  return true
}

const handleSubmit = async () => {
  touched.value = true
  if (!isValid()) return

  submitting.value = true
  const contact = contactStore.get()
  const califica = qualifies()
  const scheduleEventId = generateEventId('schedule')

  const tipoEventoLabel: Record<string, string> = {
    corporativo: 'Evento corporativo (empresa)',
    boda:        'Boda o celebración',
    cumpleanos:  'Cumpleaños o reunión familiar',
    gala:        'Gala o evento social',
    otro:        'Otro evento',
  }
  const invitadosLabel: Record<string, string> = {
    menos50:   'Menos de 50 personas',
    '50-150':  '50 a 150 personas',
    '150-300': '150 a 300 personas',
    mas300:    'Más de 300 personas',
  }
  const fechaLabel: Record<string, string> = {
    proximo_mes:     'En el próximo mes',
    proximos_3meses: 'En los próximos 3 meses',
    proximos_6meses: 'En los próximos 6 meses',
    planificando:    'Estoy en planificación',
  }
  const presupuestoLabel: Record<string, string> = {
    menos500:    'Menos de $500 USD',
    '500-1500':  '$500 - $1,500 USD',
    '1500-5000': '$1,500 - $5,000 USD',
    mas5000:     'Más de $5,000 USD',
  }

  const etiquetas = [
    'funnel-mastercrepes',
    'step-2-cualificacion',
    califica ? 'califica-mc' : 'no-califica-mc',
    `tipo-${form.value.tipo_evento}`,
    `invitados-${form.value.invitados}`,
    `fecha-${form.value.fecha}`,
    `budget-${form.value.presupuesto}`,
  ]

  const notas = `
━━━━━━━━━━━━━━━━━━━━━━━━
🥞 MASTER CREPES — Cualificación
━━━━━━━━━━━━━━━━━━━━━━━━
👤 ${contact.nombre} ${contact.apellido}
📧 ${contact.email}
📱 ${contact.telefono}
━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Tipo de evento: ${tipoEventoLabel[form.value.tipo_evento] ?? form.value.tipo_evento}
👥 Invitados: ${invitadosLabel[form.value.invitados] ?? form.value.invitados}
📅 Cuándo: ${fechaLabel[form.value.fecha] ?? form.value.fecha}
💰 Presupuesto: ${presupuestoLabel[form.value.presupuesto] ?? form.value.presupuesto}
💡 Descripción: ${form.value.descripcion}
━━━━━━━━━━━━━━━━━━━━━━━━
${califica ? '✅ CALIFICA' : '❌ NO CALIFICA — presupuesto menor a $500'}
  `.trim()

  const payload = {
    nombre: contact.nombre,
    apellido: contact.apellido,
    email: contact.email,
    telefono: contact.telefono,
    tipo_evento: form.value.tipo_evento,
    invitados: form.value.invitados,
    fecha: form.value.fecha,
    presupuesto: form.value.presupuesto,
    descripcion: form.value.descripcion,
    califica: String(califica),
    etiquetas: etiquetas.join(','),
    notas,
    nota: notas,
    event_id: scheduleEventId,
  }

  trackStage('cualificacion_completada', payload)

  await fetch(import.meta.env.VITE_WEBHOOK_CALIFICACION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})

  ;(window as any).fbq?.('track', 'CompleteRegistration',
    { content_name: 'cualificacion-step2', status: califica ? 'califica' : 'no-califica' },
    { eventID: scheduleEventId }
  )

  submitting.value = false
  emit('close')

  if (califica) {
    ;(window as any).fbq?.('track', 'Lead')
    push('/agendar')
  } else {
    if (!IS_DEV) localStorage.setItem('os_disq_at', String(Date.now()))
    push('/sin-espacio')
  }
}

const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

watch(() => props.open, (v) => {
  if (v) {
    touched.value = false
    form.value = { tipo_evento: '', invitados: '', fecha: '', presupuesto: '', descripcion: '', consent: false }
  }
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cal-fade">
      <div v-if="open" class="cal-backdrop" @click.self="emit('close')" role="dialog" aria-modal="true" aria-labelledby="cal-title">

        <div class="cal-modal">

          <button class="cal-close" @click="emit('close')" :aria-label="cmt.closeLabel">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="cal-header">
            <div class="cal-header-icon" aria-hidden="true">
              <i class="fa-solid fa-utensils"></i>
            </div>
            <h2 id="cal-title" class="cal-title">
              {{ cmt.title }}
              <span class="cal-accent">{{ cmt.titleAccent }}</span>
            </h2>
            <p class="cal-subtitle">{{ cmt.subtitle }}</p>
          </div>

          <form class="cal-form" @submit.prevent="handleSubmit" novalidate>

            <!-- Q1 -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.tipo_evento }">
              <legend class="cal-legend"><span class="cal-q-num">01</span> {{ cmt.q1 }}</legend>
              <div class="cal-options">
                <label v-for="opt in cmt.q1opts" :key="opt.value" class="cal-option" :class="{ selected: form.tipo_evento === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.tipo_evento" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.tipo_evento" class="cal-error">{{ cmt.errRequired }}</span>
            </fieldset>

            <!-- Q2 -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.invitados }">
              <legend class="cal-legend"><span class="cal-q-num">02</span> {{ cmt.q2 }}</legend>
              <div class="cal-options">
                <label v-for="opt in cmt.q2opts" :key="opt.value" class="cal-option" :class="{ selected: form.invitados === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.invitados" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.invitados" class="cal-error">{{ cmt.errRequired }}</span>
            </fieldset>

            <!-- Q3 -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.fecha }">
              <legend class="cal-legend"><span class="cal-q-num">03</span> {{ cmt.q3 }}</legend>
              <div class="cal-options">
                <label v-for="opt in cmt.q3opts" :key="opt.value" class="cal-option" :class="{ selected: form.fecha === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.fecha" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.fecha" class="cal-error">{{ cmt.errRequired }}</span>
            </fieldset>

            <!-- Q4 -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.presupuesto }">
              <legend class="cal-legend"><span class="cal-q-num">04</span> {{ cmt.q4 }}</legend>
              <div class="cal-options">
                <label v-for="opt in cmt.q4opts" :key="opt.value" class="cal-option" :class="{ selected: form.presupuesto === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.presupuesto" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.presupuesto" class="cal-error">{{ cmt.errRequired }}</span>
            </fieldset>

            <!-- Q5 -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && wordCount(form.descripcion) < 10 }">
              <legend class="cal-legend"><span class="cal-q-num">05</span> {{ cmt.q5 }}</legend>
              <textarea
                v-model="form.descripcion"
                class="cal-textarea"
                :placeholder="cmt.q5ph"
                rows="4"
                aria-describedby="q5-hint"
              ></textarea>
              <span id="q5-hint" class="cal-hint">{{ cmt.q5hint(wordCount(form.descripcion)) }}</span>
              <span v-if="touched && wordCount(form.descripcion) < 10" class="cal-error">{{ cmt.errDesc }}</span>
            </fieldset>

            <!-- Consent -->
            <label class="cal-consent" :class="{ 'has-error': touched && !form.consent }">
              <input type="checkbox" v-model="form.consent" />
              <span class="cal-consent__box" aria-hidden="true" />
              <span class="cal-consent__text">{{ cmt.consent }}</span>
            </label>
            <span v-if="touched && !form.consent" class="cal-error">{{ cmt.errConsent }}</span>

            <button type="submit" class="cal-submit" :disabled="submitting">
              <span v-if="!submitting">
                <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
                {{ cmt.submit }}
              </span>
              <span v-else>
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                {{ cmt.submitting }}
              </span>
            </button>

          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.cal-fade-enter-active,
.cal-fade-leave-active { transition: opacity 0.25s ease; }
.cal-fade-enter-from,
.cal-fade-leave-to { opacity: 0; }

.cal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(colors.$OS-DARK, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.cal-modal {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
  border: 1px solid #EEE0D0;
}

.cal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #FFF8F0;
  color: #8A9BB5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
  &:hover { background: #EEE0D0; color: colors.$OS-DARK; }
}

.cal-header {
  padding: 2rem 2rem 1.25rem;
  border-bottom: 1px solid #F0EAE0;
  text-align: center;
}

.cal-header-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: colors.$OS-NAVY;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  i { color: #ffffff; font-size: 1.4rem; }
}

.cal-title {
  @include fonts.heading-font(800);
  font-size: 1.45rem;
  color: colors.$OS-DARK;
  margin: 0 0 0.5rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.cal-accent { color: colors.$OS-RED; }

.cal-subtitle {
  font-size: 0.86rem;
  color: #8A9BB5;
  margin: 0;
}

.cal-form {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cal-fieldset {
  border: none;
  padding: 0;
  margin: 0;

  &.has-error .cal-options { border-color: colors.$OS-RED; border-radius: 10px; }
}

.cal-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: fonts.$font-interface;
  font-size: 0.88rem;
  font-weight: 700;
  color: colors.$OS-DARK;
  margin-bottom: 0.75rem;
}

.cal-q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: colors.$OS-NAVY;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;
}

.cal-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cal-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid #EEE0D0;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  background: #FFFAF5;

  &:hover { border-color: colors.$OS-BLUE; background: #FFF5EE; }

  &.selected {
    border-color: colors.$OS-NAVY;
    background: #FFF5EE;
  }

  &__radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #C8D8ED;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.18s;

    .cal-option.selected & {
      border-color: colors.$OS-NAVY;
      &::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: 50%;
        background: colors.$OS-NAVY;
      }
    }
  }

  &__label {
    font-size: 0.88rem;
    color: #3A4F6A;
    font-weight: 500;

    .cal-option.selected & { color: colors.$OS-DARK; font-weight: 600; }
  }
}

.cal-textarea {
  width: 100%;
  border: 1.5px solid #EEE0D0;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  font-family: fonts.$font-secondary;
  font-size: 0.88rem;
  color: colors.$OS-DARK;
  background: #FFFAF5;
  resize: vertical;
  outline: none;
  transition: border-color 0.18s;
  line-height: 1.55;
  box-sizing: border-box;

  &::placeholder { color: #B0C0D5; }
  &:focus { border-color: colors.$OS-BLUE; background: #FFF8F0; }
}

.cal-hint {
  display: block;
  font-size: 0.76rem;
  color: #B0C0D5;
  margin-top: 0.35rem;
}

.cal-error {
  display: block;
  font-size: 0.78rem;
  color: colors.$OS-RED;
  margin-top: 0.35rem;
}

.cal-consent {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;

  input { display: none; }

  &__box {
    width: 18px;
    height: 18px;
    border: 2px solid #C8D8ED;
    border-radius: 5px;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;

    input:checked ~ & {
      background: colors.$OS-NAVY;
      border-color: colors.$OS-NAVY;
      &::after {
        content: '✓';
        color: #ffffff;
        font-size: 0.7rem;
        font-weight: 800;
      }
    }
  }

  &__text {
    font-size: 0.82rem;
    color: #6A7E95;
    line-height: 1.5;
  }
}

.cal-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$OS-RED;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: fonts.$font-accent;
  font-size: 0.97rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease, transform 0.15s ease;
  box-shadow: 0 4px 16px rgba(200, 25, 42, 0.3);

  &:hover:not(:disabled) { background: darken(#C8192A, 10%); transform: translateY(-1px); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
}
</style>
