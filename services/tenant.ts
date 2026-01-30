import type { ITenant, ICategory, IError } from '@/types/tenant'
import { ETenantStatus } from '@/enums/tenant'

export async function getTenants(): Promise<ITenant[]> {
  return [
    {
      id: 1,
      name: '7k.bet.br',
      url: 'https://7k.bet.br',
      status: ETenantStatus.GREEN,
    },
    {
      id: 2,
      name: 'cassino.bet.br',
      url: 'https://cassino.bet.br',
      status: ETenantStatus.GREEN,
    },
    {
      id: 3,
      name: 'vera.bet.br',
      url: 'https://vera.bet.br',
      status: ETenantStatus.ORANGE,
    },
  ]
}

export async function getTenantCategories(
  _tenantId: number
): Promise<ICategory[]> {
  return [
    {
      id: 1,
      name: 'Transações',
      description: 'Depósitos e saques',
      status: ETenantStatus.GREEN,
    },
    {
      id: 2,
      name: 'Apostas',
      description: 'Cassino e esportiva',
      status: ETenantStatus.GREEN,
    },
    {
      id: 3,
      name: 'KYC',
      description: 'Liveness e onboarding',
      status: ETenantStatus.ORANGE,
    },
  ]
}

export async function getTenantSubCategories(
  _tenantId: number,
  categoryId: number
): Promise<IError[]> {
  if (categoryId === 1) {
    return [
      {
        id: 1,
        name: 'Depósito',
        description: 'Status do depósito',
        status: ETenantStatus.GREEN,
      },
      {
        id: 2,
        name: 'Saque',
        description: 'Status do saque',
        status: ETenantStatus.RED,
      },
    ]
  }
  if (categoryId === 2) {
    return [
      {
        id: 1,
        name: 'Cassino',
        description: 'Status cassino',
        status: ETenantStatus.GREEN,
      },
      {
        id: 2,
        name: 'Esportiva',
        description: 'Status esportiva',
        status: ETenantStatus.GREEN,
      },
    ]
  }
  return [
    {
      id: 1,
      name: 'Liveness',
      description: 'Status liveness',
      status: ETenantStatus.ORANGE,
    },
    {
      id: 2,
      name: 'Onboarding',
      description: 'Status onboarding',
      status: ETenantStatus.GREEN,
    },
  ]
}
