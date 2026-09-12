import { PollinationsAiEntityBase } from '../PollinationsAiEntityBase';
import type { PollinationsAiSDK } from '../PollinationsAiSDK';
import type { Control } from '../types';
import type { GenerateText, GenerateTextCreateData } from '../PollinationsAiTypes';
declare class GenerateTextEntity extends PollinationsAiEntityBase<GenerateText> {
    constructor(client: PollinationsAiSDK, entopts: any);
    make(this: GenerateTextEntity): GenerateTextEntity;
    create(this: any, reqdata?: GenerateTextCreateData, ctrl?: Control): Promise<GenerateTextEntity>;
}
export { GenerateTextEntity };
