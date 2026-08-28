// Typed models for the PollinationsAi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/pollinations-ai-sdk/go/core"
)

// GenerateText is the typed data model for the generate_text entity.
type GenerateText struct {
	Choices *[]any `json:"choices,omitempty"`
	Created *int `json:"created,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxTokens *int `json:"max_tokens,omitempty"`
	Messages []any `json:"messages"`
	Model *string `json:"model,omitempty"`
	Object *string `json:"object,omitempty"`
	Seed *int `json:"seed,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Usage *map[string]any `json:"usage,omitempty"`
}

// GenerateTextCreateData is the typed request payload for GenerateText.CreateTyped.
type GenerateTextCreateData struct {
	Choices *[]any `json:"choices,omitempty"`
	Created *int `json:"created,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxTokens *int `json:"max_tokens,omitempty"`
	Messages []any `json:"messages"`
	Model *string `json:"model,omitempty"`
	Object *string `json:"object,omitempty"`
	Seed *int `json:"seed,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Usage *map[string]any `json:"usage,omitempty"`
}

// ImageGeneration is the typed data model for the image_generation entity.
type ImageGeneration struct {
}

// ImageGenerationLoadMatch is the typed request payload for ImageGeneration.LoadTyped.
type ImageGenerationLoadMatch struct {
	Prompt string `json:"prompt"`
	Enhance *bool `json:"enhance,omitempty"`
	Height *int `json:"height,omitempty"`
	Model *string `json:"model,omitempty"`
	Nologo *bool `json:"nologo,omitempty"`
	Seed *int `json:"seed,omitempty"`
	Width *int `json:"width,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
