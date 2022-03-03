import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { Category } from './interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }
    
    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDTO);
    }
    
}
