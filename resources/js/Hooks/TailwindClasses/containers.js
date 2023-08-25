export default function () {
  const jaseHeader
    = 'bg-white flex items-center self-center justify-center m-0 pt-4 flex-wrap w-full border-0 min-h-[75px] h-header'

  const mainContainer = 'overflow-x-hidden'
  const mainContent = 'relative w-full overflow-hidden h-container'

  const pageContainer
    = 'absolute w-full overflow-x-hidden overflow-y-auto h-container pb-[60px]'

  const pageContent
    = 'm-auto flex flex-wrap justify-start text-left max-w-mobile sm:max-w-[608px] sm:justify-center sm:text-center'

  const buttonWrapper = 'px-1 w-full flex justify-center'

  const modalContainer
    = 'fixed top-0 left-0 m-0 px-2 w-full h-screen overflow-hidden z-[999999] items-center justify-center'

  const modalBackDrop
    = 'bg-gray-400 opacity-50 absolute p-0 left-0 top-0 m-0 w-full h-screen overflow-hidden z-10'

  return {
    jaseHeader,
    mainContainer,
    mainContent,
    pageContainer,
    pageContent,
    buttonWrapper,
    modalContainer,
    modalBackDrop,
  }
}
