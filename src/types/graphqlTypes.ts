export interface UserArgs {
  id: string
}

export interface UsersArgs {
  skip?: number
  limit?: number
  filter?: {
    search?: string
  }
}

export interface CreateUserArgs {
  input: {
    email: string
    name: string
  }
}

export interface UpdateUserArgs {
  id: string
  input: {
    email?: string
    name?: string
  }
}

export interface DeleteUserArgs {
  id: string
}

export interface DeleteManyArgs {
  ids: string[]
}
