package core

type PollinationsAiError struct {
	IsPollinationsAiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPollinationsAiError(code string, msg string, ctx *Context) *PollinationsAiError {
	return &PollinationsAiError{
		IsPollinationsAiError: true,
		Sdk:              "PollinationsAi",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PollinationsAiError) Error() string {
	return e.Msg
}
