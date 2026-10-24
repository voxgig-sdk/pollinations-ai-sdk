import { GenerateTextEntity } from './entity/GenerateTextEntity';
import { ImageGenerationEntity } from './entity/ImageGenerationEntity';
export type * from './PollinationsAiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PollinationsAiEntityBase } from './PollinationsAiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class PollinationsAiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GenerateText(entopts?: Record<string, any>): GenerateTextEntity;
    ImageGeneration(entopts?: Record<string, any>): ImageGenerationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PollinationsAiSDK;
    tester(testopts?: any, sdkopts?: any): PollinationsAiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PollinationsAiSDK;
export { stdutil, config, BaseFeature, PollinationsAiEntityBase, PollinationsAiSDK, SDK, };
export type { DirectResult };
