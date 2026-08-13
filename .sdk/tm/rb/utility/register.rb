# PollinationsAi SDK utility registration
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
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PollinationsAiUtility.registrar = ->(u) {
  u.clean = PollinationsAiUtilities::Clean
  u.done = PollinationsAiUtilities::Done
  u.make_error = PollinationsAiUtilities::MakeError
  u.feature_add = PollinationsAiUtilities::FeatureAdd
  u.feature_hook = PollinationsAiUtilities::FeatureHook
  u.feature_init = PollinationsAiUtilities::FeatureInit
  u.fetcher = PollinationsAiUtilities::Fetcher
  u.make_fetch_def = PollinationsAiUtilities::MakeFetchDef
  u.make_context = PollinationsAiUtilities::MakeContext
  u.make_options = PollinationsAiUtilities::MakeOptions
  u.make_request = PollinationsAiUtilities::MakeRequest
  u.make_response = PollinationsAiUtilities::MakeResponse
  u.make_result = PollinationsAiUtilities::MakeResult
  u.make_point = PollinationsAiUtilities::MakePoint
  u.make_spec = PollinationsAiUtilities::MakeSpec
  u.make_url = PollinationsAiUtilities::MakeUrl
  u.param = PollinationsAiUtilities::Param
  u.prepare_auth = PollinationsAiUtilities::PrepareAuth
  u.prepare_body = PollinationsAiUtilities::PrepareBody
  u.prepare_headers = PollinationsAiUtilities::PrepareHeaders
  u.prepare_method = PollinationsAiUtilities::PrepareMethod
  u.prepare_params = PollinationsAiUtilities::PrepareParams
  u.prepare_path = PollinationsAiUtilities::PreparePath
  u.prepare_query = PollinationsAiUtilities::PrepareQuery
  u.graphql_body = PollinationsAiUtilities::GraphqlBody
  u.graphql_errors = PollinationsAiUtilities::GraphqlErrors
  u.result_basic = PollinationsAiUtilities::ResultBasic
  u.result_body = PollinationsAiUtilities::ResultBody
  u.result_headers = PollinationsAiUtilities::ResultHeaders
  u.transform_request = PollinationsAiUtilities::TransformRequest
  u.transform_response = PollinationsAiUtilities::TransformResponse
}
