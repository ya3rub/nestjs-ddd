import { Credentials } from '../../domain';
import { BasicCreditRepo } from '../../repos/baiscCreditRepo';
import { CryptoServices } from '../../services/crypto/crypto.service';
import { LoginReqDTO } from './Login.dto';

export class TokenLoginUseCase {
  constructor(
    private readonly basicCreditRepo: BasicCreditRepo,
    private readonly cryptoServices: CryptoServices,
  ) {}
  async getCredit(reqDTO: LoginReqDTO): Promise<Credentials.BasicCredentials> {
    const credentials = await this.basicCreditRepo.getCreditByEmail(
      reqDTO.email,
    );
    if (!credentials) throw Error('test');
    const isMatching = await this.cryptoServices.verify(
      credentials.hashedPassword,
      reqDTO.password,
    );
    if (!isMatching) throw Error('test');
    return credentials;
  }
}