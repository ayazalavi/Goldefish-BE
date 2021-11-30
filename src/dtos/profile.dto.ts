import { AccountTypes } from '@/enum/accounttypes.enum';
import { ProfileActions } from '@/enum/profileactions.enum';
import { DateValidator } from '@/validators/date.validator';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsAlphanumeric, IsArray, IsBoolean, IsDate, IsDateString, IsEmail, isEnum, IsEnum, IsISO31661Alpha3, IsMongoId, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsString, IsUrl, Length, Matches, MaxLength, MinLength, Validate, ValidateIf, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongoose';


export class ProfileDTO {

    public static displayGroup = [ProfileActions.LOCATION, ProfileActions[1], ProfileActions.BIRTHDAY, ProfileActions[2]]
    public static profileBioGroup = [ProfileActions.BUSINESS_INFO, ProfileActions[8], ProfileActions.PERSONAL_INFO, ProfileActions[12]]
    public static titleGroup = [ProfileActions.ADD_AWARD, ProfileActions[10],
        ProfileActions.BUSINESS_DETAILS, ProfileActions[9], ProfileActions.ADD_TALENT, ProfileActions[11],
        ProfileActions.ADD_EXPERIENCE, ProfileActions[13],
    ]
    public static descriptionGroup = [ProfileActions.BUSINESS_DETAILS, ProfileActions[9], ProfileActions.ADD_TALENT, ProfileActions[11]]
    public static categoryGroup = [ProfileActions.BUSINESS_DETAILS, ProfileActions[9], ProfileActions.ADD_TALENT, ProfileActions[11]]

    @IsEnum(ProfileActions)
    public action: string;

    @ValidateIf(o => o.action === ProfileActions.ACCOUNT_TYPE || o.action === ProfileActions[0])
    @IsEnum(AccountTypes, {
        message:"Please provide valid account type"
    })
    public accountType: string;

    @ValidateIf(o => o.action === ProfileActions.LOCATION || o.action === ProfileActions[1])    
    @IsNotEmpty({
        message:"Please provide city"
    })
    public city: string;

    @ValidateIf(o => o.action === ProfileActions.LOCATION || o.action === ProfileActions[1])
    @IsISO31661Alpha3()
    public country: string;

    @ValidateIf(o => ProfileDTO.displayGroup.indexOf(o.action) !== -1)
    @IsBoolean()
    public display: boolean;

    @ValidateIf(o => o.action === ProfileActions.BIRTHDAY || o.action === ProfileActions[2])
    @Validate(DateValidator, {
        message:"Please provide valid date of birth"
    })
    public dateOfBirth: string;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_INTERESTS || o.action === ProfileActions[3])
    @IsArray()
    @IsMongoId({
        each: true,
        message: "Please provide valid business interests"
    })
    @ArrayMinSize(1, {
        message:"Please provide atleast 1 valid interest"
    })
    public talentInterests: [ObjectId];

    @ValidateIf(o => o.action === ProfileActions.TAGS || o.action === ProfileActions[4])
    @IsArray()
    @IsMongoId({
        each: true,
        message: "Please provide valid tags"
    })
    @ArrayMinSize(1, {
        message:"Please provide atleast 1 tag"
    })
    public tags: [ObjectId];

    @ValidateIf(o => o.action === ProfileActions.FRIEND || o.action === ProfileActions[5])  
    @IsMongoId({
        message: "Please provide valid friend id"
    })
    public friend: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.SUBSCRIPTION || o.action === ProfileActions[6])  
    @IsMongoId({
        message: "Please provide valid account id for subscribing to it"
    })
    public subscription: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.IMAGES || o.action === ProfileActions[7])  
    @IsUrl({}, {
        message: "Please provide valid profile photo"
    })
    public profilePhoto: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.IMAGES || o.action === ProfileActions[7])  
    @IsUrl({}, {
        message: "Please provide valid background image"
    })
    public backgroundPhoto: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_INFO || o.action === ProfileActions[8])  
    @Matches(/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/, {
        message: "Please enter valid business name"
    })
    @MaxLength(50, {
        message: "Business name should be less than 50 characters."
    })
    public businessName: string;

    @ValidateIf(o => ProfileDTO.profileBioGroup.indexOf(o.action) !== -1)  
    @Length(1, 170, {
        message: "Please make sure bio contains less than 170 characters and is not empty"
    })
    @IsString({
        message:"Please enter your bio"
    })
    public profileBio: string;

    @ValidateIf(o => ProfileDTO.titleGroup.indexOf(o.action) !== -1)
    @Matches(/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/, {
        message: "Please enter valid title"
    })
    @MaxLength(50, {
        message: "Title should be less than 50 characters."
    })
    public title: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_AWARD || o.action === ProfileActions[10])
    @IsString({
        message:"Please provide valid location of the award"
    })
    @Length(2, 50, {
        message:"Location should be between 2-50 characters in length"
    })
    public location: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_AWARD || o.action === ProfileActions[10])
    @Validate(DateValidator, {
        message:"Please provide valid date"
    })
    public date: string;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_DETAILS || o.action === ProfileActions[9])  
    @IsString({
        message:"Please provide type of the business"
    })
    @Length(5, 50, {
        message:"Type of business should have less than 50 characters"
    })
    public typeOfBusiness: string;

    @ValidateIf(o => ProfileDTO.descriptionGroup.indexOf(o.action) !== -1)  
    @Length(1, 170, {
        message: "Please make sure description contains less than 170 characters and is not empty"
    })
    @IsString({
        message:"Please enter description"
    })
    public description: string;

    @ValidateIf(o => ProfileDTO.categoryGroup.indexOf(o.action) !== -1)  
    @IsMongoId({
        message: "Please provide valid category id"
    })
    public category: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.PERSONAL_INFO || o.action === ProfileActions[12])
    @Matches(/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/, {
        message: "Please provide your full name"
    })
    @Length(2, 50, {
        message: "Only 2 to 50 characters allowed"
    })
    fullname: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_EXPERIENCE || o.action === ProfileActions[13])
    @Matches(/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/, {
        message: "Please provide your employer name"
    })
    @Length(2, 50, {
        message: "Only 2 to 50 characters allowed"
    })
    public employer: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_EXPERIENCE || o.action === ProfileActions[13])
    @Validate(DateValidator, {
        message:"Please provide your date of employment"
    })
    public dateOfEmployment: string;
}
