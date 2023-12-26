import { User } from "./user";

interface ApiResponseBase {
    message: string;
}

export interface UserApiResponse extends ApiResponseBase {
    user: User;
}