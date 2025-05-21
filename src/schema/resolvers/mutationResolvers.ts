import { CreateUserArgs, DeleteUserArgs, UpdateUserArgs } from '@gqltypes/graphqlTypes'
import { userService } from '@services/userService'

export const mutationResolvers = {
  createUser: async (_: unknown, args: CreateUserArgs) => {
    return userService.create(args)
  },

  updateUser: async (_: unknown, args: UpdateUserArgs) => {
    return userService.update(args)
  },

  deleteUser: async (_: unknown, args: DeleteUserArgs) => {
    return userService.delete(args)
  },
}
