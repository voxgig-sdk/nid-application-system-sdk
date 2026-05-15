package core

type NidApplicationSystemError struct {
	IsNidApplicationSystemError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNidApplicationSystemError(code string, msg string, ctx *Context) *NidApplicationSystemError {
	return &NidApplicationSystemError{
		IsNidApplicationSystemError: true,
		Sdk:              "NidApplicationSystem",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NidApplicationSystemError) Error() string {
	return e.Msg
}
