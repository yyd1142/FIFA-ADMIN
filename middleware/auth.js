import {getUserFromCookie, getUserFromLocalStorage} from '~/utils/auth'

export default function ({isServer, store, req, redirect, route}) {
  // let loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  // loggedUser = {"name":"祖太明","jobNumber":"203912","userId":25,"status":1}
  // if (!loggedUser) {
  //   if (route.name != 'login') {
  //   	if (route.name){
  //   		let path = `/login?redirect=${route.name}`
  //   		return redirect(path)
  //   	}
  //   	else
  //   		return redirect(`/login`)
  //   }
  // } else {
  //   store.commit('SET_USER', loggedUser)
  // }
}
