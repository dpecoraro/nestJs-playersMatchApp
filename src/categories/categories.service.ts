import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: JogadoresService) { }

    async assignPlayerCategory(params: String[]): Promise<void> {
        const category = params['category'];
        const playerId = params['playerId'];

        const categoryModel = this.categoryModel.findOne({ category }).exec();

        if (!categoryModel) {
            throw new NotFoundException();
        }

        const playerModel = (await this.playerService.listaJogadores()).filter(player => player.id === playerId);

        if (!playerModel) {
            throw new NotFoundException();
        }

        const isAlreadyAssigned = await this.categoryModel.find({ category }).where('jogadores')
            .in(playerId).exec();

        (await categoryModel).players.push(playerId);

        await this.categoryModel
            .findOneAndUpdate({ category }, { $set: categoryModel })
            .exec();

    }
    async update(category: string, updateCategoryDTO: UpdateCategoryDTO): Promise<void> {
        const model = await this.categoryModel.findOne({category}).exec();

        if (!model) {
            throw new NotFoundException('Category does not exist')
        }

        await this.categoryModel.updateOne({ category },
            {
                $set: updateCategoryDTO
            }).exec();
    }
    async get(category: string): Promise<Category> {
        const model = await this.categoryModel.findOne({category}).exec();

        if (!model) {
            throw new NotFoundException('Category does not exist')
        }

        return model;
    }
    async toList(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const { category } = createCategoryDTO;
        
        const categoryExist = await this.categoryModel.findOne({ category }).exec();
        
        if (categoryExist) {
            throw new BadRequestException(`Category ${category} already exists on database`)
        }

        const model = new this.categoryModel(createCategoryDTO);

        return await model.save();
    }
}
