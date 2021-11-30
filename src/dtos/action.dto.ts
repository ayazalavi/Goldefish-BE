import { ProfileActions } from '@/enum/profileactions.enum';
import { IsEnum } from 'class-validator';


export class ActionDTO {

    @IsEnum(ProfileActions, {
        message:"Please pass valid action in url string"
    })
    public action: string;

}