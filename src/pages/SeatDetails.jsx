import { Link } from 'react-router-dom'
const SeatDetails = () => {

    return (
        <div className="!flex-1 h-[calc(100vh-60px)] overflow-y-auto ">
            <nav class="flex mb-5 mt-5 px-5 lg:hidden" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <Link
                            relative="path"
                            to={"../"}
                            href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Seats
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center" >
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Seats Details</h1>
                            </a>
                        </div>
                    </li>

                </ol>
            </nav>

        </div>
    )

}

export default SeatDetails