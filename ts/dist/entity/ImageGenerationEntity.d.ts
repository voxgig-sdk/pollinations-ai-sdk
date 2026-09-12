import { PollinationsAiEntityBase } from '../PollinationsAiEntityBase';
import type { PollinationsAiSDK } from '../PollinationsAiSDK';
import type { Control } from '../types';
import type { ImageGeneration, ImageGenerationLoadMatch } from '../PollinationsAiTypes';
declare class ImageGenerationEntity extends PollinationsAiEntityBase<ImageGeneration> {
    constructor(client: PollinationsAiSDK, entopts: any);
    make(this: ImageGenerationEntity): ImageGenerationEntity;
    load(this: any, reqmatch?: ImageGenerationLoadMatch, ctrl?: Control): Promise<ImageGenerationEntity>;
}
export { ImageGenerationEntity };
