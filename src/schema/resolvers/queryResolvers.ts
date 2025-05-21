import { UserArgs, UsersArgs } from '@gqltypes/graphqlTypes'
import { userService } from '@services/userService'

export const queryResolvers = {
  user: async (_: unknown, args: UserArgs) => {
    return userService.getById(args)
  },

  users: async (_: unknown, args: UsersArgs) => {
    return userService.list(args)
  },
}
