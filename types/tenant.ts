import type { ETenantStatus } from '@/enums/tenant'

export interface ITenant {
  id: number
  name: string
  url: string
  status: ETenantStatus
}

export interface ICategory {
  id: number
  name: string
  description?: string
  status: ETenantStatus
}

export interface IError {
  id: number
  name: string
  description?: string
  status: ETenantStatus
}

export type TenantCardItem = {
  id: number
  name: string
  status: ETenantStatus
  description?: string
  url?: string
}
