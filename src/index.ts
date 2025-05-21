import { NotFoundError, ValidationError } from '@errors/index'
import loggerPlugin from '@plugins/loggerPlugin'
import resolvers from '@schema/resolvers'
import typeDefs from '@schema/typeDefs'
import logger from '@utils/logger'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const startServer = async () => {
  try {
    logger.info('Connecting to MongoDB...')

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined')
    }

    await mongoose.connect(process.env.MONGO_URI)

    logger.info('Connected to MongoDB')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [loggerPlugin],
      formatError: err => {
        const original = err.originalError

        logger.error('GraphQL Error:', {
          message: err.message,
          code: original?.name || 'INTERNAL',
          stack: original?.stack,
        })

        if (original instanceof ValidationError) {
          return {
            message: original.message,
            code: 'BAD_USER_INPUT',
          }
        }

        if (original instanceof NotFoundError) {
          return {
            message: original.message,
            code: 'NOT_FOUND',
          }
        }

        logger.error('Unexpected error:', err)
        return {
          message: 'Internal server error',
          code: 'INTERNAL_SERVER_ERROR',
        }
      },
    })

    const { url } = await server.listen({ port: process.env.PORT || 4000 })
    logger.info(`Server ready at ${url}`)
  } catch (err) {
    logger.error('Server failed to start', err)
  }
}

startServer()
