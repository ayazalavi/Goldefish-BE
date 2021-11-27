import { AccountTypes } from '@/enum/accounttypes.enum';
import { ProfileActions } from '@/enum/profileactions.enum';
import { DateValidator } from '@/validators/date.validator';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsAlphanumeric, IsArray, IsBoolean, IsDate, IsDateString, IsEmail, isEnum, IsEnum, IsISO31661Alpha3, IsMongoId, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsString, Length, Matches, MaxLength, MinLength, Validate, ValidateIf, ValidateNested } from 'class-validator';
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
    @IsNotEmpty()
    @IsString()
    public city: string;

    @ValidateIf(o => o.action === ProfileActions.LOCATION || o.action === ProfileActions[1])
    @IsISO31661Alpha3()
    public country: string;

    @ValidateIf(o => ProfileDTO.displayGroup.indexOf(o.action) !== -1)
    @IsBoolean()
    public display: boolean;

    @ValidateIf(o => o.action === ProfileActions.BIRTHDAY || o.action === ProfileActions[2])
    @Validate(DateValidator)
    public dateOfBirth: string;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_INTERESTS || o.action === ProfileActions[3])
    @IsArray()
    @IsMongoId({
        each: true
    })
    @ArrayMinSize(1)
    public talentInterests: [ObjectId];

    @ValidateIf(o => o.action === ProfileActions.TAGS || o.action === ProfileActions[4])
    @IsArray()
    @IsMongoId({
        each: true
    })
    @ArrayMinSize(1)
    public tags: [ObjectId];

    @ValidateIf(o => o.action === ProfileActions.FRIEND || o.action === ProfileActions[5])  
    @IsMongoId()
    @IsNotEmpty()
    public friend: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.SUBSCRIPTION || o.action === ProfileActions[6])  
    @IsMongoId()
    @IsNotEmpty()
    public subscription: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_INFO || o.action === ProfileActions[8])  
    @IsAlphanumeric()
    @IsString()
    @Length(5, 50)
    public businessName: string;

    @ValidateIf(o => ProfileDTO.profileBioGroup.indexOf(o.action) !== -1)  
    @IsString()
    @Length(10, 170)
    public profileBio: string;

    @ValidateIf(o => ProfileDTO.titleGroup.indexOf(o.action) !== -1)
    @IsAlphanumeric()
    @IsString()
    @Length(2, 30)
    public title: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_AWARD || o.action === ProfileActions[10])
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    public location: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_AWARD || o.action === ProfileActions[10])
    @Validate(DateValidator)
    @IsNotEmpty()
    @IsString()
    public date: string;

    @ValidateIf(o => o.action === ProfileActions.BUSINESS_DETAILS || o.action === ProfileActions[9])  
    @IsAlphanumeric()
    @IsString()
    @Length(5, 50)
    public typeOfBusiness: string;

    @ValidateIf(o => ProfileDTO.descriptionGroup.indexOf(o.action) !== -1)  
    @IsString()
    @Length(10, 170)
    public description: string;

    @ValidateIf(o => ProfileDTO.categoryGroup.indexOf(o.action) !== -1)  
    @IsMongoId()
    public category: ObjectId;

    @ValidateIf(o => o.action === ProfileActions.PERSONAL_INFO || o.action === ProfileActions[12])
    @IsString()
    @Length(5, 20)
    fullname: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_EXPERIENCE || o.action === ProfileActions[13])
    @IsAlphanumeric()
    @IsString()
    @Length(2, 20)
    public employer: string;

    @ValidateIf(o => o.action === ProfileActions.ADD_EXPERIENCE || o.action === ProfileActions[13])
    @Validate(DateValidator)
    @IsNotEmpty()
    @IsString()
    public dateOfEmployment: string;
}
