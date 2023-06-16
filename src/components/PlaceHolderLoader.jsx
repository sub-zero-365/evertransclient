import React from 'react'

const PlaceHolderLoader = () => {
    return (
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div class="flex items-center w-full space-x-2">
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-32"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-24"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-full"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-24"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[400px]">
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-80"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-full"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-24"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[440px]">
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-32"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-24"></div>
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[360px]">
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
                <div class="h-8 bg-gray-200 rounded-none dark:bg-gray-700 w-80"></div>
                <div class="h-8 bg-gray-300 rounded-none dark:bg-gray-600 w-full"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>
    )
}

export default PlaceHolderLoader