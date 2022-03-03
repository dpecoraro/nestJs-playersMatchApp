import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores.validacao-parametros.pipe';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDTO);

    return 'ok';
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async atualizaJogador(@Body() criarJogadorDTO: CriarJogadorDTO,
      @Param('_id', JogadoresValidacaoParametrosPipe) _id: string) {
      await this.jogadoresService.criarAtualizarJogador(criarJogadorDTO);
    }

  @Get()
  async listaJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.listaJogadores();
  }

  @Get(':email')
  async consultaJogadorByEmail(@Param('email') email: string) {
    return '';
  }

  @Get()
  async consultaJogadorComPipe(@Query('email') email: string, JogadoresValidacaoParametrosPipe) {
    return '';
  }
}
