
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), children: [
          {path: '/app1', component: ()=> import('pages/App1.vue')},
          {path: '/app2', component: ()=> import('pages/App2.vue')},
          {path: '/app3', component: ()=> import('pages/App3.vue')}
        ]}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
