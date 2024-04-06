import { Email } from '../../models/email'
import { User, UserProps, UserStatuses } from '../user/user'

const BaseProps = () => ({
  name: 'John Doe',
  email: new Email('john@mail.com'),
  createdAt: new Date(),
  modifiedAt: new Date(),
})

export const UserDummy = (partial: Partial<UserProps> = {}): User => {
  return new User({
    ...BaseProps(),
    status: UserStatuses.Active,
    ...partial,
  })
}

export const DeletedUserDummy = (partial: Partial<UserProps> = {}): User => {
  return new User({
    ...BaseProps(),
    status: UserStatuses.Deleted,
    deletedAt: new Date(),
    ...partial,
  })
}
