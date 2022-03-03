import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Category extends Document {
    readonly category: string;
    descricao: string;
    events: Array<Event>;
    players: Array<Jogador>;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}