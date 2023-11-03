import { useState } from 'react'
import {motion} from 'framer-motion'
export default function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 100,
    magnifieWidth = 100,
    zoomLevel = 1.5
}) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    return (
        <div
        onContextMenu={function(){
            return false
        }}
            style={{
                position: "relative",
                height: height || "100%",
                width: width || "100%"
            }}
        >
            <img
                src={src}
                className='object-cover !w-full !h-full'
                // style={{ width: "100%", height: "100%" }}
                style={{ height: height, width: width }}
                // style={{}}
                onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    // console.log(elem)
                    const imageProperties = elem.getBoundingClientRect();
                    const { width, height } = imageProperties
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                onTouchStart={(e) => {
                    e.preventDefault()
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { clientX: x, clientY: y } = e.touches[0]
                    setXY([x, y]);
                    // console.log(elem)

                    const imageProperties = elem.getBoundingClientRect();
                    const { width, height } = imageProperties
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    // const { clientX,clientY } = e.touches[0]
                    const x = e.pageX - left - window.pageXOffset
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onContextMenu={function(){
                    return false
                }}
                onTouchMove={(e) => {
                    // update cursor position
                    const { clientX, clientY } = e.touches[0]
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const x = clientX - left - window.pageXOffset
                    const y = clientY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onMouseLeave={() => {
                    // close magnifier
                    setShowMagnifier(false);
                }}
                onTouchEnd={() => {
                    // close magnifier
                    setShowMagnifier(false);
                }}
                alt={"img"}
            />

            <motion.div
                onContextMenu={() => false}

                style={{
                    display: showMagnifier ? "" : "none",
                    position: "absolute",

                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: "none",
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifieWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifieWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: "no-repeat",

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                        }px`,

                    //calculate position of zoomed image.
                    // backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                    // backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
                animate={{
                    backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
            ></motion.div>
        </div>
    );
}