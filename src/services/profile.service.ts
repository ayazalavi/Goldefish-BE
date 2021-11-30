import bcrypt from 'bcrypt';
import { SignUpDTO } from '@/dtos/signup.dto';
import { HttpException } from '@exceptions/HttpException';
import { user } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';
import { ProfileActions } from '@/enum/profileactions.enum';
import _ from "lodash";

class ProfileService {
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

  public async updateUser(user: user, data: any): Promise<user> {
    let action: string = data.action;
    const methodName = _.camelCase(`save ${typeof action === "number" ? ProfileActions[action] : action}`);
    console.log(methodName);
    this[methodName]();
    return user.save()
  }

  private saveAccountType(user: user, data: any) {
    console.log("save")
  }

  private saveLocation(user: user, data: any) {
    console.log("save")
  }

  private saveBirthday(user: user, data: any) {
    console.log("save")
  }

  private saveBusinessInterests(user: user, data: any) {
    console.log("save")
  }

  private saveTags(user: user, data: any) {
    console.log("save")
  }

  private saveFriend(user: user, data: any) {
    console.log("save")
  }

  private saveSubscription(user: user, data: any) {
    console.log("save")
  }

  private saveImages(user: user, data: any) {
    console.log("save")
  }

  private saveBusinessInfo(user: user, data: any) {
    console.log("save")
  }

  private saveBusinessDetails(user: user, data: any) {
    console.log("save")
  }

  private saveAddAward(user: user, data: any) {
    console.log("save")
  }

  private saveAddTalent(user: user, data: any) {
    console.log("save")
  }

  private savePersonalInfo(user: user, data: any) {
    console.log("save")
  }

  private saveAddExperience(user: user, data: any) {
    console.log("save")
  }

  public async deleteUser(userId: string): Promise<user> {
    const deleteUserById: user = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default ProfileService;
