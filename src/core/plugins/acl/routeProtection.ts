import { useAbility } from '@casl/vue'
import MainMenuConfig from '@/layouts/default-layout/config/MainMenuConfig'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const defaultRedirect = (can, pages) => {
  const redirect = pages.find((page) => {
    if (page.sub) {
      return page.sub.some((child) => can('list', child.heading))
    } else if (can('list', page.heading)) {
      return true
    }

    return false
  })

  return redirect
}

export const canNavigate = (to) => {
  const { can } = useAbility()
  const canNavigate = to.matched.some((route) => can(route.meta.action, route.meta.resource))
  const pages = MainMenuConfig[0].pages

  if (canNavigate)
    return {
      access: true,
      redirect: to.path
    }
  else {
    Swal.fire({
      icon: 'error',
      title: '404!',
      text: "Sorry, you don't have access to this page."
    })

    let redirect = defaultRedirect(can, pages)
    if (redirect.sub) redirect = defaultRedirect(can, redirect.sub)

    return { access: false, redirect }
  }
}
