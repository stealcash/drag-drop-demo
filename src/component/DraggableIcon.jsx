import React from 'react'
import Draggable from 'react-draggable';
import Icon from '@mui/material/Icon';

const DraggableIcon = (props) => {
    const { item, roomData, setRoomData, roomItemIndex, setSelectedId, icons, iconIndex } = props

    return (
        <Draggable
            bounds=".room-container"
            defaultPosition={{ x: item?.position?.x, y: item?.position?.y }}
            onStop={(e, data) => {
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
                <Icon >{icons?.[iconIndex]?.key}</Icon>
            </div>

        </Draggable>
    )
}

export default DraggableIcon