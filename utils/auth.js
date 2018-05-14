export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return

  const cookies = req.headers.cookie.split(';')
  let user = {};
  for (let item of cookies) {
    let keyValue = item.trim().split('=');
    user[keyValue[0]] = decodeURI(keyValue[1]);
  }
  if ('user_name' in user && 'id' in user)
    return user;
  return null;
}

export const getUserFromLocalStorage = () => {
  let json = localStorage.getItem('user');
  let user = null;
  try {
    user = JSON.parse(json);
  } catch (e) {
    user = null;
  }
  return user;
}

export const setUser = (user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = (user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('user')
}
