import { Injectable } from '@nestjs/common';
import { CreatePublicKeyInput } from './dto/create-public-key.input';
import { UpdatePublicKeyInput } from './dto/update-public-key.input';
import { PublicKey } from './entities/public-key.entity';

@Injectable()
export class PublicKeyService {
  create(createPublicKeyInput: CreatePublicKeyInput) {
    return 'This action adds a new publicKey';
  }

  findAll() {
    return `This action returns all publicKey`;
  }

  findOne(id: string) {
    return `This action returns a #${id} publicKey`;
  }

  async findAllByUserId(user_id: string) {
    return await PublicKey.find({ where: { created_by_id: user_id } });
  }

  update(id: number, updatePublicKeyInput: UpdatePublicKeyInput) {
    return `This action updates a #${id} publicKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicKey`;
  }
}
