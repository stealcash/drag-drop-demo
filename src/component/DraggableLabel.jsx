import React from 'react'
import Draggable from 'react-draggable';

const DraggableLabel = (props) => {
    const { item, roomData, setRoomData, roomItemIndex, labelIndex, setSelectedId, labelsList } = props
    return (
        <Draggable
            bounds=".room-container"
            defaultPosition={{ x: item?.position?.x, y: item?.position?.y }}
            onStop={(e, data) => {
                // let element = document.getElementById(`childId`);
                // let mainObj = document.getElementById(`drag-box`);
                // if (element) {
                //   let y1 = element.getBoundingClientRect().top;
                //   let y2 = mainObj.getBoundingClientRect().top;
                //   let x1 = element.getBoundingClientRect().left;
                //   let x2 = mainObj.getBoundingClientRect().left;
                // }
                let positionX = data?.x ?? 0
                let positionY = data?.y ?? 0

                roomData[roomItemIndex].position.x = positionX
                roomData[roomItemIndex].position.y = positionY

                setRoomData(() => {
                    return [...roomData]
                })
                localStorage.setItem("room-data", JSON.stringify(roomData));
            }}
        >
            <div className='room-obj' style={{
                zIndex: item?.position?.z,
                ...(item?.style?.fontSize && { fontSize: item?.style?.fontSize }),
                ...(item?.style?.color && { color: item?.style?.color }),
                ...(item?.style?.background && { background: item?.style?.background }),
            }}
                onClick={() => setSelectedId(roomItemIndex)}
            >
                <div className='label-obj'> {labelsList?.[labelIndex]?.text}</div>
            </div>
        </Draggable>
    )
}

export default DraggableLabel