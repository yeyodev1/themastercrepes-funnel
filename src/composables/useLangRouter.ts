import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export type Lang = 'es' | 'en'

export function useLangRouter() {
  const route = useRoute()
  const router = useRouter()
  const lang = computed<Lang>(() => (route.meta.lang as Lang) ?? 'en')
  const isEs = computed(() => lang.value === 'es')

  function push(path: string) {
    const prefix = isEs.value ? '/es' : ''
    return router.push(prefix + path)
  }

  return { lang, isEs, push }
}
