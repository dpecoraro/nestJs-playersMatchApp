import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDTO);

    return 'ok';
  }

  @Get()
  async listaJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.listaJogadores();
  }

  @Get(':email')
  async consultaJogadorByEmail(@Param('email') email: string) {
    return '';
  }
}
