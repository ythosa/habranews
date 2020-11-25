import { UserIdImpl } from './user-id.interface';
import { VerifyByAccessTokenDtoImpl } from './verify-by-access-token-dto.interface';

export interface AuthServiceImpl {
    verifyByAccessToken(
        verifyByAccessTokenDto: VerifyByAccessTokenDtoImpl,
    ): Promise<UserIdImpl>;
}
