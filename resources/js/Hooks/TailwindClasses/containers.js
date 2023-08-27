export default function () {
  const mainContainer = 'overflow-x-hidden'
  const mainContent = 'relative w-full overflow-hidden h-container'

  const pageHeader = 'font-semibold text-xl text-gray-800 leading-tight'

  const pageContainer
    = 'max-w-7xl mx-auto sm:px-6 lg:px-8 py-1 sm:py-6 md:py-12'

  const pageContent
    = 'bg-white overflow-hidden shadow-sm sm:rounded-lg'

  const pageContentCard
    = 'p-6 text-gray-900'

  const buttonWrapper = 'px-1 w-full flex justify-center'

  const modalContainer
    = 'fixed top-0 left-0 m-0 px-2 w-full h-screen overflow-hidden z-[999999] items-center justify-center'

  const modalBackDrop
    = 'bg-gray-400 opacity-50 absolute p-0 left-0 top-0 m-0 w-full h-screen overflow-hidden z-10'

  const tableContainer = 'w-full text-left border border-solid border-gray-200'
  const tableCol = 'p-4 border border-solid border-l-0 border-t-0 border-gray-200'

  return {
    mainContainer,
    mainContent,
    pageContainer,
    pageContent,
    pageContentCard,
    pageHeader,
    buttonWrapper,
    modalContainer,
    modalBackDrop,
    tableCol,
    tableContainer,
  }
}
