import { NotFoundError, ValidationError } from '@errors/index'
import {
  CreateUserArgs,
  DeleteManyArgs,
  DeleteUserArgs,
  UpdateUserArgs,
  UserArgs,
  UsersArgs,
} from '@gqltypes/graphqlTypes'
import { User } from '@models/User'
import { CreateUserSchema, UpdateUserSchema } from '@validators/user'
import { ZodError } from 'zod'

export const userService = {
  async getById({ id }: UserArgs) {
    if (!id) {
      throw new ValidationError('User ID is required')
    }

    try {
      const user = await User.findById(id)

      if (!user) {
        throw new NotFoundError('User not found')
      }

      return user
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to fetch user')
    }
  },

  async list({ skip = 0, limit = 10, filter }: UsersArgs) {
    try {
      const query = filter?.search ? { name: new RegExp(filter.search, 'i') } : {}

      const [users, totalCount] = await Promise.all([
        User.find(query).skip(skip).limit(limit),
        User.countDocuments(query),
      ])

      return { users, totalCount }
    } catch (err) {
      throw new Error('Failed to fetch users')
    }
  },

  async create({ input }: CreateUserArgs) {
    try {
      const validated = CreateUserSchema.parse(input)

      return await User.create(validated)
    } catch (err) {
      if (err instanceof ZodError) {
        throw new ValidationError(err.issues.map(i => i.message).join(', '))
      }

      throw new Error('Failed to create user')
    }
  },

  async update({ id, input }: UpdateUserArgs) {
    try {
      const validated = UpdateUserSchema.parse(input)
      const updated = await User.findByIdAndUpdate(id, validated, { new: true })

      if (!updated) {
        throw new NotFoundError('User not found: uid:' + id)
      }

      return updated
    } catch (err) {
      if (err instanceof ZodError) {
        throw new ValidationError(err.issues.map(i => i.message).join(', '))
      }

      throw new Error('Failed to update user')
    }
  },

  async delete({ id }: DeleteUserArgs) {
    if (!id) {
      throw new ValidationError('User ID is required')
    }

    try {
      const deleted = await User.findByIdAndDelete(id)

      if (!deleted) {
        throw new NotFoundError('User not found: uid:' + id)
      }

      return deleted
    } catch (err) {
      throw new Error('Failed to delete user')
    }
  },

  async deleteMany({ ids }: DeleteManyArgs) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new ValidationError('List of user IDs is required')
    }

    try {
      const users = await User.find({ _id: { $in: ids } })

      if (users.length === 0) {
        throw new NotFoundError('No users found for the provided IDs')
      }

      await User.deleteMany({ _id: { $in: ids } })

      return users
    } catch (err) {
      throw new Error('Failed to delete users')
    }
  },
}
