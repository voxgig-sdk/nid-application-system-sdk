<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility registration

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

NidApplicationSystemUtility::setRegistrar(function (NidApplicationSystemUtility $u): void {
    $u->clean = [NidApplicationSystemClean::class, 'call'];
    $u->done = [NidApplicationSystemDone::class, 'call'];
    $u->make_error = [NidApplicationSystemMakeError::class, 'call'];
    $u->feature_add = [NidApplicationSystemFeatureAdd::class, 'call'];
    $u->feature_hook = [NidApplicationSystemFeatureHook::class, 'call'];
    $u->feature_init = [NidApplicationSystemFeatureInit::class, 'call'];
    $u->fetcher = [NidApplicationSystemFetcher::class, 'call'];
    $u->make_fetch_def = [NidApplicationSystemMakeFetchDef::class, 'call'];
    $u->make_context = [NidApplicationSystemMakeContext::class, 'call'];
    $u->make_options = [NidApplicationSystemMakeOptions::class, 'call'];
    $u->make_request = [NidApplicationSystemMakeRequest::class, 'call'];
    $u->make_response = [NidApplicationSystemMakeResponse::class, 'call'];
    $u->make_result = [NidApplicationSystemMakeResult::class, 'call'];
    $u->make_point = [NidApplicationSystemMakePoint::class, 'call'];
    $u->make_spec = [NidApplicationSystemMakeSpec::class, 'call'];
    $u->make_url = [NidApplicationSystemMakeUrl::class, 'call'];
    $u->param = [NidApplicationSystemParam::class, 'call'];
    $u->prepare_auth = [NidApplicationSystemPrepareAuth::class, 'call'];
    $u->prepare_body = [NidApplicationSystemPrepareBody::class, 'call'];
    $u->prepare_headers = [NidApplicationSystemPrepareHeaders::class, 'call'];
    $u->prepare_method = [NidApplicationSystemPrepareMethod::class, 'call'];
    $u->prepare_params = [NidApplicationSystemPrepareParams::class, 'call'];
    $u->prepare_path = [NidApplicationSystemPreparePath::class, 'call'];
    $u->prepare_query = [NidApplicationSystemPrepareQuery::class, 'call'];
    $u->result_basic = [NidApplicationSystemResultBasic::class, 'call'];
    $u->result_body = [NidApplicationSystemResultBody::class, 'call'];
    $u->result_headers = [NidApplicationSystemResultHeaders::class, 'call'];
    $u->transform_request = [NidApplicationSystemTransformRequest::class, 'call'];
    $u->transform_response = [NidApplicationSystemTransformResponse::class, 'call'];
});
