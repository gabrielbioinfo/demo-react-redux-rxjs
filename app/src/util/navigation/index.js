import utilapplication from '../application'

class Navigation {
  goToUrl (site, url) {
    const protocol = site.protocol ? `${site.protocol}` : ''
    const port = site.port ? `:${site.port}` : ''
    console.log(`${protocol}://${site.domain}${port}${url}`)
    window.parent.location = `${protocol}://${site.domain}${port}${url}`
  }

  pushLocation (location) {
    utilapplication.getHistory().push(location)
  }

  processUrlMenu (site, menuItem, activity) {
    const protocol = site.protocol ? `${site.protocol}` : ''
    const port = site.port ? `:${site.port}` : ''
    let url = menuItem.action
    let params = url.match(/#(\w+)#/g)
    params.map(param => {
      let auxParam = param.replace(/#/g, '')
      url = url.replace(new RegExp(param, 'g'), activity[auxParam])
      return true
    })
    window.parent.location = `${protocol}://${site.domain}${port}${url}`
  }

  processAppMenu (site, menuItem, activity) {
    // config
    const prefix = utilapplication.getHistory().location.pathname.match(/\/(\w+)/)
    if (prefix.length < 2) { return }

    const newLocation = `/${prefix[1]}/${activity.type}/${activity.id}`
    utilapplication.getHistory().push(newLocation)
  }

  processGoBackMenuInformingId (id) {
    if (utilapplication.getHistory().action === 'POP') { return utilapplication.getHistory().push(`/${id}`) }
    utilapplication.getHistory().goBack()
  }

  getNavigationById (activities, id) {
    const auxNavigation = activities.filter(a => a.id === parseInt(id))
    return auxNavigation.length > 0 ? auxNavigation[0] : null
  }
}

export default new Navigation()
