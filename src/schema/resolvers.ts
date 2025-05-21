import { IResolvers } from '@graphql-tools/utils'

import { mutationResolvers } from './resolvers/mutationResolvers'
import { queryResolvers } from './resolvers/queryResolvers'

const resolvers: IResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  User: {
    id: user => user._id.toString(),
  },
}

export default resolvers
