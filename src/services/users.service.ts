import bcrypt from 'bcrypt';
import { SignUpDTO } from '@/dtos/signup.dto';
import { HttpException } from '@exceptions/HttpException';
import { user } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<user[]> {
    const users: user[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<user> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: user = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: SignUpDTO): Promise<user> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: user = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: user = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: SignUpDTO): Promise<user> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: user = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: user = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<user> {
    const deleteUserById: user = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
