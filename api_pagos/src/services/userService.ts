import { User } from '../models/user';

const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' },
    // otros usuarios...
];

export const getUsers = async (): Promise<User[]> => {
    return users;
};

export default { getUsers };
