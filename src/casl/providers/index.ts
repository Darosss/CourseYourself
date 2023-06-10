import { Provider } from '@nestjs/common';

import { groupPolicyProviders } from './groups';

export const providers: Provider[] = [...groupPolicyProviders];
