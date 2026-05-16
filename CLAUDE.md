# Ocean Safety — VSL Funnel Landing

## Proyecto
Este repositorio es la landing page / funnel de **Ocean Safety** (oceansafety.ec).
Representantes oficiales Honda Marine en Ecuador — motores fuera de borda para flotas camaroneras, transporte y seguridad.
Es un **funnel de una sola página** (VSL Funnel) orientado a captación de consultas técnicas.

## Stack
- **Vue 3** + Vite 7 + TypeScript
- **SCSS** con variables en `src/styles/colorVariables.module.scss`
- **GSAP** instalado (sin uso activo — loader global eliminado)
- **pnpm** como package manager
- **vue-router** (rutas del funnel + legales)
- **FontAwesome 6** (CDN en index.html) — usar `<i class="fa-solid fa-...">`, NO emojis

## Flujo del Funnel (multi-paso)
```
/ (FunnelView)
  ↓ [form submit → router.push('/ver-video')]
/ver-video (VideoView)            ← VSL Wistia; CTA bloqueado 2 min; guard de contacto
  ↓ [popup CalendarModal → cualifica]
/agendar (BookingView)            ← GHL calendar iframe (pre-llenado con datos del contacto)
  ↓ [msgsndr-booking-complete]
/cita-confirmada (BookedView)     ← Confirmación final con nombre personalizado
  ↓ [no cualifica en CalendarModal]
/sin-espacio (NoSpaceView)        ← Rechazo empático + teaser del curso
```

## LocalStorage — claves en uso
| Clave | Contenido | Quién lo escribe |
|---|---|---|
| `os_contact` | `{ nombre, email, phone, timestamp }` | RegistrationModal + VideoView guard |
| `os_disq_at` | timestamp (ms) | CalendarModal al disqualificar |
| `os_booked_at` | timestamp (ms) | BookingView al confirmar cita |

## Guards de seguridad
- **FunnelView**: si `os_disq_at` < 24h → redirige a `/sin-espacio` (desactivado en `localhost`)
- **VideoView**: si no hay `os_contact` → overlay bloqueante para capturar contacto (desactivado en `localhost`)
- **CalendarModal**: `sector = otro` OR `embarcaciones = 1-2` → `/sin-espacio` + guarda `os_disq_at`

## GHL Calendar
- URL: `https://api.leadconnectorhq.com/widget/booking/dtpY2GCQjoOkpm8JUtYz` ← **TODO: actualizar para Ocean Safety**
- Pre-fill params: `?firstName=...&email=...&phone=...` (leídos de `os_contact`)
- Evento de confirmación: `postMessage(['msgsndr-booking-complete', {...}])`
- Altura dinámica: `postMessage({ type: 'booking-app', height: N })`

## Estructura clave
```
src/
  views/
    FunnelView.vue          ← / — PÁGINA PRINCIPAL (funnel VSL + RegistrationModal)
    VideoView.vue           ← /ver-video — VSL Wistia + timer 2 min + contact guard
    BookingView.vue         ← /agendar — GHL calendar iframe pre-llenado
    BookedView.vue          ← /cita-confirmada — orquestador de subcomponentes
    NoSpaceView.vue         ← /sin-espacio — rechazo + teaser curso + cooldown 24h
    PrivacyPolicyView.vue   ← /politicas-privacidad
    LegalNoticeView.vue     ← /aviso-legal
  components/
    RegistrationModal.vue   ← Modal de captura (nombre, apellido, email, teléfono, empresa)
    CalendarModal.vue       ← Modal de calificación 3 preguntas → routing
    booked/                 ← Subcomponentes de BookedView
      BookedHeader.vue
      BookedHero.vue        ← Recibe prop :contact-name
      BookedSteps.vue       ← Recibe prop :steps
      BookedTeam.vue        ← Recibe prop :team
      BookedFooter.vue
  components/globals/
    TheGlobalLoader.vue     ← Loader eliminado (no se usa — no importar)
  assets/
    logos/                  ← Logo-large.png, logo-small.png (Ocean Safety)
    team/                   ← (pendiente: foto Roberto Allú)
    testimonios/            ← (pendiente: testimonios Ocean Safety)
```

## Padding mobile — patrón de BookedView
`BookedView` centraliza el padding en `booked-view__container` (`padding: 0 1.5rem` mobile, `0 2rem` desktop).
Los subcomponentes (`BookedHero`, `BookedSteps`, `BookedTeam`) usan `padding: 0` horizontal — heredan del contenedor.

## Videos
- **Wistia media-id `u9yljeo589`** → **TODO: reemplazar con el video ID de Ocean Safety**
- Script Wistia no se agrega al HTML global; se usa iframe responsive 16:9

## Funnel — Contenido Ocean Safety
- **Headline**: "Profesionaliza tu flota y elimina las paradas no programadas con ingeniería náutica japonesa"
- **Especialista**: Roberto Allú — Especialista en Soluciones Náuticas Industriales
- **Marca**: Honda Marine (representantes oficiales Ecuador)
- **Segmentos**: flotas camaroneras, transporte fluvial/marítimo, seguridad naval
- **Motores clave**: BF2.3 (enfriado por aire), BF150 VTEC BLAST, 250HP, 350HP
- **CTA principal**: "AGENDAR CONSULTA TÉCNICA GRATIS" → abre `RegistrationModal`
- **Entidad legal**: OCEAN SAFETY (pendiente nombre legal exacto)

## Imágenes CDN
Las imágenes del funnel se suben a Cloudinary:
- Cloud: `dpuody0df`
- Las URLs se almacenan en `/tmp/cloudinary-urls.json` después de ejecutar el script de upload

## Colores de marca (Ocean Safety — light theme)
```scss
// Variables en colorVariables.module.scss
// Alias BAKANO mantiene compatibilidad; aliases OS recomendados para código nuevo
$OS-RED:     #CC0000   // Honda red — CTAs
$OS-NAVY:    #003F7D   // Ocean navy — brand principal
$OS-BLUE:    #0066CC   // Ocean blue — secundario
$OS-DARK:    #0D1B2A   // Texto oscuro
$OS-LIGHT:   #F0F6FF   // Fondo claro
$OS-SURFACE: #F5F8FF   // Superficies/cards
```

## Fuentes
- Headings: **Outfit** (800)
- Body: **Plus Jakarta Sans**
- Accent/CTAs: **Space Grotesk**
- UI: **Manrope**

## Comandos
```bash
pnpm dev        # desarrollo local
pnpm build      # build de producción
pnpm type-check # TypeScript check
```

## No hacer
- No agregar Header/Footer de navegación al funnel (la app ya no los monta)
- No usar emojis en ningún lugar — usar íconos FontAwesome (`<i class="fa-solid fa-...">`)
- No usar el HomeView.vue (obsoleto, reemplazado por FunnelView.vue)
- No usar ThankYouView.vue (obsoleto, reemplazado por VideoView + BookingView + BookedView)

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
