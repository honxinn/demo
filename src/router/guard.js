import router from './index'

function hasToken() {
  return localStorage.getItem('userInfo')
}

router.beforeEach((to, from, next) => {
  const title = to.meta?.title;
  document.title = title ? `${title} - 校园社区` : '校园社区讨论平台'
  if (to.name !== 'Login' && !hasToken()) next({name: 'Login'})
  else if(to.name === 'Login' && hasToken()) next({name: 'Home'})
  else next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})