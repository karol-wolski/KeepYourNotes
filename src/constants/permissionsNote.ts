interface IPermission {
  id: number
  value: string
  name: string
  translateId: string
}

enum PERMISSIONS {
  READ = 'READ',
  READ_WRITE = 'READ_WRITE',
  FULL_CONTROL = 'FULL_CONTROL',
}

export type permissionsArray = IPermission[]

const PERMISSIONS_ARRAY: permissionsArray = [
  {
    id: 1,
    value: PERMISSIONS.READ,
    name: 'Read',
    translateId: 'app.read',
  },
  {
    id: 2,
    value: PERMISSIONS.READ_WRITE,
    name: 'Read and Write',
    translateId: 'app.readWrite',
  },
  {
    id: 3,
    value: PERMISSIONS.FULL_CONTROL,
    name: 'Full Control',
    translateId: 'app.fullControl',
  },
]

export { PERMISSIONS_ARRAY, PERMISSIONS }
