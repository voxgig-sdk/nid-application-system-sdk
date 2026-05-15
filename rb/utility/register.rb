# NidApplicationSystem SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NidApplicationSystemUtility.registrar = ->(u) {
  u.clean = NidApplicationSystemUtilities::Clean
  u.done = NidApplicationSystemUtilities::Done
  u.make_error = NidApplicationSystemUtilities::MakeError
  u.feature_add = NidApplicationSystemUtilities::FeatureAdd
  u.feature_hook = NidApplicationSystemUtilities::FeatureHook
  u.feature_init = NidApplicationSystemUtilities::FeatureInit
  u.fetcher = NidApplicationSystemUtilities::Fetcher
  u.make_fetch_def = NidApplicationSystemUtilities::MakeFetchDef
  u.make_context = NidApplicationSystemUtilities::MakeContext
  u.make_options = NidApplicationSystemUtilities::MakeOptions
  u.make_request = NidApplicationSystemUtilities::MakeRequest
  u.make_response = NidApplicationSystemUtilities::MakeResponse
  u.make_result = NidApplicationSystemUtilities::MakeResult
  u.make_point = NidApplicationSystemUtilities::MakePoint
  u.make_spec = NidApplicationSystemUtilities::MakeSpec
  u.make_url = NidApplicationSystemUtilities::MakeUrl
  u.param = NidApplicationSystemUtilities::Param
  u.prepare_auth = NidApplicationSystemUtilities::PrepareAuth
  u.prepare_body = NidApplicationSystemUtilities::PrepareBody
  u.prepare_headers = NidApplicationSystemUtilities::PrepareHeaders
  u.prepare_method = NidApplicationSystemUtilities::PrepareMethod
  u.prepare_params = NidApplicationSystemUtilities::PrepareParams
  u.prepare_path = NidApplicationSystemUtilities::PreparePath
  u.prepare_query = NidApplicationSystemUtilities::PrepareQuery
  u.result_basic = NidApplicationSystemUtilities::ResultBasic
  u.result_body = NidApplicationSystemUtilities::ResultBody
  u.result_headers = NidApplicationSystemUtilities::ResultHeaders
  u.transform_request = NidApplicationSystemUtilities::TransformRequest
  u.transform_response = NidApplicationSystemUtilities::TransformResponse
}
