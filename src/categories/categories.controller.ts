import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { Category } from './interfaces/category.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }
    
    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDTO);
    }

    @Get()
    async listCategories(): Promise<Array<Category>> {
        return await this.categoryService.toList();
    }

    @Get('/:category')
    async getCategoryById(
        @Param('category') category: string
    ): Promise<Category> {
        return await this.categoryService.get(category);
    }

    @Put('/:category')
    async updateCategory(
        @Body() updateCategoryDTO: UpdateCategoryDTO,
        @Param('category') category: string
    ) : Promise<void>{
        return this.categoryService.update(category, updateCategoryDTO)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:category/players/:playerId')
    async assignPlayerCategory(
        @Param() params: Array<String>
    ): Promise<void> {
        return await this.categoryService.assignPlayerCategory(params);
    }
    
}
