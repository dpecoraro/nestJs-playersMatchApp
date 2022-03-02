import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

  async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
    this.logger.log(criarJogadorDTO);

    const { email } = criarJogadorDTO;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(criarJogadorDTO);
    } else {
      await this.criar(criarJogadorDTO);
    }
  }

  async listaJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate(
      { email: criarJogadorDTO.email },
      { $set: criarJogadorDTO }
    )
    .exec()
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);

    return await jogadorCriado.save();
  }

  public async delete(email: string): Promise<void> {
    return await this.jogadorModel.remove({email}).exec();
  }
}
