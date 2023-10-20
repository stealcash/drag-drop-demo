export function getRoomObjZindex(roomData) {
    let zIndex = 0
    roomData.forEach((item) => {
      let objZIndex = item?.position?.z ?? 0
      if (item?.position?.z > zIndex) {
        zIndex = objZIndex
      }
    })
    //we should return zindex + 1 , because at same position there maybe another obj exist
    return zIndex + 1
  }

  export function newIdAddToRoom(roomData) {
    if (roomData?.length === 0) { return 0 }
    const lastIndexObj = roomData[roomData.length - 1]
    const lastInsertedId = lastIndexObj?.id ?? (lastIndexObj.length - 1)
    return lastInsertedId + 1
  }

 