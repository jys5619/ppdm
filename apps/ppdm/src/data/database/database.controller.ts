import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';
import { PpdmPublicAuth } from '../../share/decorator';
import { DatabaseCreateDto } from './dto/database-create.dto';
@Controller('database')
@ApiTags('Database Controller')
@ApiBearerAuth('access-token')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'DB 연결 테스트' })
  @PpdmPublicAuth()
  @Put('connection-test')
  async connectionTest(
    @Body() databaseCreateDto: DatabaseCreateDto,
  ): Promise<string> {
    return await this.databaseService.connectionTest(databaseCreateDto);
  }

  @ApiOperation({ summary: 'DB 목록 조회' })
  @PpdmPublicAuth()
  @Get()
  async getDatabaseList() {
    return await this.databaseService.getList();
  }

  @ApiOperation({ summary: 'DB 조회' })
  @PpdmPublicAuth()
  @Get('/:id')
  async getDatabase(@Param('id') id: string) {
    return await this.databaseService.get(id);
  }

  @ApiOperation({ summary: 'DB 저장' })
  @PpdmPublicAuth()
  @Post()
  async createDatabase(@Body() databaseCreateDto: DatabaseCreateDto) {
    return await this.databaseService.create(databaseCreateDto);
  }
}
