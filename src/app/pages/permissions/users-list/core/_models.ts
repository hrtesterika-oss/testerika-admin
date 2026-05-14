import {ID, Response} from '../../../../../_metronic/helpers'
export type Permission = {
  id?: ID
  name?: string
  short_name?: string
  core_permission?: boolean

}

export type PermissionQueryResponse = Response<Array<Permission>>

export const initialPermission: Permission = {
  name: '',
  short_name: '',
  core_permission: false
}
