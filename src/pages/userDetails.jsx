import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
const Details = () => {

  return (
    <div>Details

      <CircularProgressbar
        background
        strokeWidth={8}
        initialAnimation
        circleRatio={0.6}
        className='!w-[12.5rem] '
        styles={{

          path: {
            stroke: `rgba(62,154,199,${66 / 100})`

          },
          trail: {
            stroke: "green"
          },
        }}

        percentage={66} text={"66%"} />
    </div>
  )
}

export default Details