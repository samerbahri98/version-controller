import { Module } from '@nestjs/common';
import { DownloadableService } from './downloadable.service';

@Module({
  providers: [DownloadableService],
  exports: [DownloadableService],
})
export class DownloadableModule {}
