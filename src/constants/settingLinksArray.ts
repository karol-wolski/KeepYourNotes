interface ILinkObj {
  path: string
  name: string
}

export type linkArray = ILinkObj[]

export const settingsLinksArray: linkArray = [
  {
    path: '/profile/edit',
    name: 'Profile',
  },
  {
    path: '/profile/password',
    name: 'Change password',
  },
]
