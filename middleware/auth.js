import {getUserFromCookie, getUserFromLocalStorage} from '~/utils/auth'

export default function ({isServer, store, req, redirect, route}) {
  let loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  loggedUser = {"id": 1, "user_name": "admin", "phone": "13528492952", "user_type": 0, "status": 1}
  if (!loggedUser) {
    if (route.name != 'login') {
      if (route.name)
        return redirect(`/login?redirect=${route.name}`)
      else
        return redirect(`/login`)
    }
  } else {
    store.commit('SET_USER', loggedUser);
    if (route.name === 'login') {
      return redirect(`/team?name=one`)
    }
  }
}
