import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPpdmPublic';
export const PpdmPublicAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
