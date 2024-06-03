import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryFormService } from './query-form.service';
import { PpdmPublicAuth } from '../../share/decorator';
import { QueryFormCreateDto } from './dto/query-form-create.dto';

@Controller('query-form')
@ApiTags('Database Controller')
@ApiBearerAuth('access-token')
export class QueryFormController {
  constructor(private readonly queryFormService: QueryFormService) {}

  @ApiOperation({ summary: 'Query Form 목록 조회' })
  @PpdmPublicAuth()
  @Put()
  async getQueryFormList() {
    return await this.queryFormService.getList();
  }

  @ApiOperation({ summary: 'Query Form 조회' })
  @PpdmPublicAuth()
  @Get('/:id')
  async getQueryForm(@Param('id') id: string) {
    return await this.queryFormService.get(id);
  }

  @ApiOperation({ summary: 'Query Form 저장' })
  @PpdmPublicAuth()
  @Post()
  async createQueryForm(@Body() queryFormCreateDto: QueryFormCreateDto) {
    console.log('queryFormCreateDto', queryFormCreateDto);
    return await this.queryFormService.create(queryFormCreateDto);
  }
}
