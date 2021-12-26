
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/articles', component: () => import('pages/Articles.vue') },
      { path: '/articledetail/:slug', component: () => import('pages/ArticleDetail.vue'), props: true},
      { path: '/petposts', component: () => import('pages/PetPosts.vue') },
      { path: '/forms/:position?', component: () => import('pages/Forms.vue'), props: true},
      { path: '/donate', component: () => import('pages/Donate.vue') },
      { path: '/helpwanted', component: () => import('pages/HelpWanted.vue') },
      { path: '/portal', component: () => import('pages/Portal.vue') },
      { path: '/sendreset', component: () => import('pages/SendReset.vue') },
      { path: '/resetpassword/:uid/:token', component: () => import('pages/ResetPassword.vue'), props: true },
      { path: '/applicationlist', component: () => import('pages/ApplicationList.vue') },
      { path: '/applicationdetail/:slug/:formtype', component: () => import('pages/ApplicationDetail.vue'), props: true},
      { path: '/petpostadmin/:slug?', component: () => import('pages/PetPostAdmin.vue'), props: true },
      { path: '/articleadmin/:slug?', component: () => import('pages/ArticleAdmin.vue'), props: true },
      { path: '/success', component: () => import('pages/Success.vue') },
      { path: '/privacy', component: () => import('pages/PrivacyPolicy.vue') }, 
      { path: '/helpwantedadmin/:slug?', component: () => import('pages/HelpWantedAdmin.vue'), props: true },
      { path: '/currenteventadmin', component: () => import('pages/CurrentEventAdmin.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
