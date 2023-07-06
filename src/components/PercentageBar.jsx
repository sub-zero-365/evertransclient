import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { Heading } from './'

export default function PercentageBar({ percent, text, className, stroke, n,price }) {
    const formatPercent = percent ? `${percent?.toFixed(1)}%` : "0%"
    return (
        <div className="flex flex-col space-y-4 items-center justify-center">
            <Heading text={(price || "")}
                className="!text-lg !mb-0 !pl-0 !text-center !font-[700] !font-manrope "></Heading>

            <CircularProgressbar
                strokeWidth={8}
                initialAnimation
                circleRatio={percent ? percent / 100 : 0}
                className={`!w-[5rem]
                ${className}
                        !max-w-[calc(100%-3rem)] mx-auto !font-black !tracking-tight `}
                styles={{
                    path: {
                        stroke: `transparent`
                    },
                    trail: {
                        stroke: stroke ? stroke : "blue"
                    },
                }}
                percentage={percent + "%"}
                text={formatPercent}
            />
            <div>
                <Heading text={(n || "")}
                    className="!text-sm !pl-0 !mb-0 !text-center !font-[600] !font-manrope "></Heading>

                <Heading text={text}
                    className="!text-sm !pl-0 !font-normal  "></Heading>


            </div>
        </div>
    )

}