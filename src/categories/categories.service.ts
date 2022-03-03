import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

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
