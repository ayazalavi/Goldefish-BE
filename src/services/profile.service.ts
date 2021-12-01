import bcrypt from 'bcrypt';
import { SignUpDTO } from '@/dtos/signup.dto';
import { HttpException } from '@exceptions/HttpException';
import { businessItem, seeking, talent, user } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';
import { ProfileActions } from '@/enum/profileactions.enum';
import _ from "lodash";
import { Schema } from 'mongoose';

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
    console.log(methodName, data);
    return this[methodName](user, data);    
  }

  public saveAccountType(user: user, data: any) {    
    user.accountType = data.accountType;
    return user.save()
  }

  public saveLocation(user: user, data: any) {
    user.location.city = data.city;
    user.location.country = data.country;
    user.location.displayOnProfile = data.display;
    return user.save()
  }

  public saveBirthday(user: user, data: any) {
    user.dateOfBirth.date = new Date(data.dateOfBirth);
    user.dateOfBirth.displayOnProfile = data.display;
    return user.save();
  }

  public saveBusinessInterests(user: user, data: any) {    
    if (!user.seekingTalent) user.seekingTalent = {} as seeking;
    user.seekingTalent.talentInterests = data.talentInterests;
    return user.save();
  }

  public saveTags(user: user, data: any) {
    user.tags = data.tags;
    return user.save();
  }

  public saveFriend(user: user, data: any) {
    if (user.friends.find((friend: Schema.Types.ObjectId) => friend.toString() === data.friend))
      throw new HttpException(400, "Friend already added");
    user.friends.push(data.friend);
    return user.save();
  }

  public saveSubscription(user: user, data: any) {
    if (user.subscriptions.find((subs: Schema.Types.ObjectId) => subs.toString() === data.subscription))
      throw new HttpException(400, "Subscription already made");
    user.subscriptions.push(data.subscription);
    return user.save();
  }

  public saveImages(user: user, data: any) {
    user.photo = data.profilePhoto;
    user.background = data.backgroundPhoto;
    return user.save()
  }

  public saveBusinessInfo(user: user, data: any) {
    if (!user.seekingTalent) user.seekingTalent = {} as seeking;
    user.seekingTalent.businessName = data.businessName;
    user.seekingTalent.profileBio = data.profileBio;
    return user.save();
  }

  public saveBusinessDetails(user: user, data: any) {
    if (!user.seekingTalent) user.seekingTalent = {} as seeking;
    if (!user.seekingTalent.businessDetails) user.seekingTalent.businessDetails = {} as businessItem;
    user.seekingTalent.businessDetails.title = data.title;
    user.seekingTalent.businessDetails.description = data.description;
    user.seekingTalent.businessDetails.category = data.category;
    user.seekingTalent.businessDetails.typeOfBusiness = data.typeOfBusiness;
    return user.save();
  }

  public saveAddAward(user: user, data: any) {
    if (!user.seekingTalent) user.seekingTalent = {} as seeking;
    else if (user.seekingTalent.awards.length >= 5) throw new HttpException(400, "Maximum limit reached")
    user.seekingTalent.awards.push({title: data.title, location: data.location, date: data.date})
    return user.save();
  }

  public saveAddTalent(user: user, data: any) {
    if (!user.showcaseTalent) user.showcaseTalent = {} as talent;
    else if (user.showcaseTalent.talents.length >= 5) throw new HttpException(400, "Maximum limit reached")
    user.showcaseTalent.talents.push({title: data.title, description: data.description, category: data.category})
    return user.save();
  }

  public savePersonalInfo(user: user, data: any) {
    if (!user.showcaseTalent) user.showcaseTalent = {} as talent;
    user.showcaseTalent.fullname = data.fullname;
    user.showcaseTalent.profileBio = data.profileBio;
    return user.save();
  }

  public saveAddExperience(user: user, data: any) {
    if (!user.showcaseTalent) user.showcaseTalent = {} as talent;
    else if (user.showcaseTalent.experience.length >= 5) throw new HttpException(400, "Maximum limit reached")
    user.showcaseTalent.experience.push({employer: data.employer, title: data.title, dateOfEmployment: data.dateOfEmployment})
    return user.save();
  }

}

export default ProfileService;
