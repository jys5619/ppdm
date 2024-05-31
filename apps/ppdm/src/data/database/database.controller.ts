import { Body, Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';
import { DatabaseCreateDto } from './dto/database-create.dto';
import { PpdmPublicAuth } from '../../share/decorator';
@Controller('database')
@ApiTags('Database Controller')
@ApiBearerAuth('access-token')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'DB 연결 테스트' })
  @PpdmPublicAuth()
  @Put('connection-test')
  async connectionTest(@Body() databaseCreateDto: DatabaseCreateDto) {
    return await this.databaseService.connectionTest(databaseCreateDto);
  }
}
