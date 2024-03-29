import { Email } from '../../models/email'
import { User, UserProps } from '../user/user'

export const UserDummy = (partial: Partial<UserProps> = {}): User => {
  return new User({
    id: 'user_1',
    name: 'John Doe',
    email: new Email('john@mail.com'),
    createdAt: new Date(),
    modifiedAt: new Date(),
    ...partial,
  })
}
