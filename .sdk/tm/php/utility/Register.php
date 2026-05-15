<?php
declare(strict_types=1);

// PollinationsAi SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PollinationsAiUtility::setRegistrar(function (PollinationsAiUtility $u): void {
    $u->clean = [PollinationsAiClean::class, 'call'];
    $u->done = [PollinationsAiDone::class, 'call'];
    $u->make_error = [PollinationsAiMakeError::class, 'call'];
    $u->feature_add = [PollinationsAiFeatureAdd::class, 'call'];
    $u->feature_hook = [PollinationsAiFeatureHook::class, 'call'];
    $u->feature_init = [PollinationsAiFeatureInit::class, 'call'];
    $u->fetcher = [PollinationsAiFetcher::class, 'call'];
    $u->make_fetch_def = [PollinationsAiMakeFetchDef::class, 'call'];
    $u->make_context = [PollinationsAiMakeContext::class, 'call'];
    $u->make_options = [PollinationsAiMakeOptions::class, 'call'];
    $u->make_request = [PollinationsAiMakeRequest::class, 'call'];
    $u->make_response = [PollinationsAiMakeResponse::class, 'call'];
    $u->make_result = [PollinationsAiMakeResult::class, 'call'];
    $u->make_point = [PollinationsAiMakePoint::class, 'call'];
    $u->make_spec = [PollinationsAiMakeSpec::class, 'call'];
    $u->make_url = [PollinationsAiMakeUrl::class, 'call'];
    $u->param = [PollinationsAiParam::class, 'call'];
    $u->prepare_auth = [PollinationsAiPrepareAuth::class, 'call'];
    $u->prepare_body = [PollinationsAiPrepareBody::class, 'call'];
    $u->prepare_headers = [PollinationsAiPrepareHeaders::class, 'call'];
    $u->prepare_method = [PollinationsAiPrepareMethod::class, 'call'];
    $u->prepare_params = [PollinationsAiPrepareParams::class, 'call'];
    $u->prepare_path = [PollinationsAiPreparePath::class, 'call'];
    $u->prepare_query = [PollinationsAiPrepareQuery::class, 'call'];
    $u->result_basic = [PollinationsAiResultBasic::class, 'call'];
    $u->result_body = [PollinationsAiResultBody::class, 'call'];
    $u->result_headers = [PollinationsAiResultHeaders::class, 'call'];
    $u->transform_request = [PollinationsAiTransformRequest::class, 'call'];
    $u->transform_response = [PollinationsAiTransformResponse::class, 'call'];
});
