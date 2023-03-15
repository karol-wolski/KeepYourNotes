interface ILinkObj {
  id: number
  path: string
  name: string
  translateId: string
}

export type linkArray = ILinkObj[]

export const settingsLinksArray: linkArray = [
  {
    id: 1,
    path: '/profile/app',
    name: 'Application Settings',
    translateId: 'app.appSettings',
  },
  {
    id: 2,
    path: '/profile/edit',
    name: 'Profile',
    translateId: 'app.profile',
  },
  {
    id: 3,
    path: '/profile/password',
    name: 'Change password',
    translateId: 'app.changePassword',
  },
]
