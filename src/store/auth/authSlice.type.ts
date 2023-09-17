export type StatusAuth = 'signin' | 'not_signin'
export interface InitialState {
  statusAuth: StatusAuth
}

export interface ActionStatusAuth {
  payload: StatusAuth,
  type: string
}
