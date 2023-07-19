export default function ToggleSwitch({ state, message, onChange, disabled, initialMessage }) {
    return (
        <div className={`flex justify-center group ${disabled == true ? "disable" : ""}  items-center flex-wrap mt-3 gap-y-1`}
            onClick={e => e.stopPropagation()}>
            <label className="relative inline-flex items-center  cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"
                    checked={state}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full 
                peer peer-focus:ring-4 peer-focus:ring-blue-300
                dark:peer-focus:ring-blue-800
                dark:bg-gray-700
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                group-[.disable]:peer-checked:after:border-gray-300
                after:content-['']
                after:absolute
                after:top-0.5 
                after:left-[2px]
                after:bg-white
                group-[.disable]:!after:bg-gray-400
                
                after:border-gray-300
                
                after:border 
                after:rounded-full after:h-5 after:w-5 after:transition-all
                dark:border-gray-600
                peer-checked:bg-blue-600
                group-[.disable]:!bg-gray-900
                "></div>
            </label>
            <span className={`ml-3 
            ${state ? "text-red-500/75" : "text-gray-500/75"}
            text-xs
            md:text-sm
            tracking-tighter
            font-medium
            text-gray-900-- 
            dark:text-gray-300`}>{(message && state) ? message : (initialMessage || "block this user")}</span>
        </div>
    )

}