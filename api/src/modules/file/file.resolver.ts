import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import FileBlob from './file.model';
import { FileService } from './file.service';

@Resolver(() => FileBlob)
export class FileResolver {
  constructor(
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  @Query(() => FileBlob)
  @UseGuards(JwtAuthGuard)
  async findFileByBranch(
    @Args('repository_id') repository_id: string,
    @CurrentUserId() user_id: string,
    @Args('branch_name') branch_name: string = 'master',
    @Args('path') path: string,
  ): Promise<FileBlob> {
    return this.fileService.findByBranch(
      repository_id,
      user_id,
      branch_name,
      path,
    );
  }
}
