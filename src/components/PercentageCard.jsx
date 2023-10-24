import { CircularProgressbar } from 'react-circular-progressbar';
import Heading from './Headings';

const PercentageCard = ({ percent,
    stroke,

    className,
    heading, total,price }) => {
    // const formatPercent=()=
    return (
        <div className='shadow p-4  bg-white flex-none'>
            <div
                className="flex items-center"
            >
                <div>
                    <CircularProgressbar
                        strokeWidth={10}
                        initialAnimation
                        circleRatio={percent ? percent / 100 : 0}
                        // circleRatio={0.6}
                        className={`!w-[10rem]
                ${className}
                        !max-w-[calc(100%-3rem)] mx-auto- !font-black !tracking-tight `}
                        styles={{
                            path: {
                                stroke: `transparent`
                            },
                            trail: {
                                stroke: stroke ? stroke : "blue"
                            },
                        }}
                        percentage={percent?.toFixed(2) + "%"}
                        text={percent?.toFixed(2)}
                    />
                </div>
                <div
                    className='flex-1'
                >
                    <h1
                        className='font-semibold text-xl lg:text-2xl mb-2 text-start'
                    >{
                            heading
                        }</h1>
                    <h3
                        className='font-medium text-lg'
                    >Total:{total || 0}</h3>
                    <h3
                        className='font-medium text-lg'
                    >Cost:{price}</h3>
                </div>
            </div>
        </div>
    )
}

export default PercentageCard