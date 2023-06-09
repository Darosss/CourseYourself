import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { policies as caslPolicies } from './policies';
import { providers as caslProviders } from './providers';

@Global()
@Module({
  providers: [CaslAbilityFactory, ...caslProviders],
  exports: [CaslAbilityFactory, ...caslPolicies],
})
export class CaslModule {}
