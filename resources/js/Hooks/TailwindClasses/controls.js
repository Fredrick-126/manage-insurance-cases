export default function () {
  // Form items: Input, Select, etc
  const formGroup = 'flex flex-wrap py-1 gap-x-[15px] gap-y-[15px] sm:gap-form-group'
  const formItem = 'flex-form-item-full'
  const formItemDesc = 'max-w-[353px] text-[12px] text-sub'
  const formItemDescMid = 'max-w-[353px] text-[14px] text-sub'
  const formItemDescLarge = 'max-w-[353px] text-[16px] text-sub'

  const formControl
    = 'mt-1 min-h-input bg-white border-0 outline-0 rounded-[5px] shadow-control active:outline-0 active:ring-0 focus:ring-0 placeholder-primary'

  const mainInput
    = 'min-h-input bg-white outline-0 rounded-[5px] active:outline-0 focus:outline-0 active:ring-0 focus:ring-0 placeholder-primary'

  const formControlBorder
    = 'border-[1px] border-solid border-primary focus:outline-0 focus:border-primary  placeholder-primary focus:ring-primary active:outline-0 active:border-primary active:ring-primary !shadow-none'

  const formControlError = 'border-red-500 border-2 border-solid'

  const formCheckboxWrapper
    = 'p-[2px] border-[1px] border-solid border-main rounded-full w-[20px] h-[20px] flex items-center justify-center'

  const formCheckbox
    = 'rounded-full w-[16px] h-[16px] focus:ring-1 focus:ring-offset-1 focus:ring-main border-none text-main !bg-none checked:ring-1 checked:ring-offset-1 checked:ring-main disabled:bg-disable disabled:ring-disable hover:ring-1 hover:ring-offset-1 hover:ring-main'

  // Buttons
  const button
    = 'block w-full h-button bg-primary text-button font-semibold text-white scale-100 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-disable flex justify-center items-center'

  const outlineButton
    = 'block w-full h-button bg-transparent text-button font-semibold text-main transition ease-out duration-300 border-[1px] border-solid border-main scale-100 hover:bg-primary hover:text-white active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-disable'

  const hoverButton
    = 'block bg-white text-button font-semibold text-main shadow-control scale-100 transition ease-out duration-300 hover:bg-primary hover:text-white active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-disable'

  const circleButton = 'w-[76px] h-[76px] rounded-full'
  const wideButton = 'w-full h-button sm:max-w-button rounded-full'
  const buttonNext = 'sm:max-w-button rounded-full'
  const buttonContinue = 'sm:max-w-mobile rounded-full'
  const buttonPreIcon = 'rounded-full p-2 absolute bg-white left-[4px] top-[4px] w-[32px] h-[32px] flex items-center justify-center'
  const buttonDisabled = '!bg-disable cursor-not-allowed active:!scale-100'

  // Links
  const customLink
    = 'text-blue-600 cursor-pointer hover:text-blue-700 hover:underline'

  return {
    formGroup,
    formItem,
    formItemDesc,
    formItemDescLarge,
    formItemDescMid,
    formControl,
    formControlBorder,
    formControlError,
    formCheckboxWrapper,
    formCheckbox,
    mainInput,
    button,
    outlineButton,
    hoverButton,
    circleButton,
    wideButton,
    buttonNext,
    buttonContinue,
    buttonDisabled,
    buttonPreIcon,
    customLink,
  }
}
