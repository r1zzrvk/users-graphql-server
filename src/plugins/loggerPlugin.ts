import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import logger from '@utils/logger'

const loggerPlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    const start = Date.now()
    const { request } = requestContext

    logger.info({
      type: 'GraphQL Request',
      operationName: request.operationName,
      query: request.query?.replace(/\s+/g, ' ').trim().slice(0, 100),
      variables: request.variables,
    })

    return {
      async willSendResponse(ctx) {
        const duration = Date.now() - start
        logger.info({
          type: 'GraphQL Response',
          operationName: ctx.request.operationName,
          durationMs: duration,
        })
      },
    }
  },
}

export default loggerPlugin
