import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { CheckMilvus, ConnectMilvus } from './dto';
import { MilvusService } from './milvus.service';
@Controller('milvus')
export class MilvusController {
  constructor(private milvusService: MilvusService) {}

  @Post('connect')
  @UsePipes(new ValidationPipe())
  async connect(@Body() body: ConnectMilvus): Promise<any> {
    return await this.milvusService.connectMilvus(body.address);
  }

  @Get('check')
  async checkConnect(@Query() query: CheckMilvus): Promise<any> {
    return await this.milvusService.checkConnect(query.address);
  }
}
