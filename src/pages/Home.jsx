import React, { useState } from 'react'
import IconButton from "@mui/material/IconButton";
import { LabelOutlined } from '@mui/icons-material';
import { AddCircle } from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import { icons, labels } from '../data/data';
import { getRoomObjZindex, newIdAddToRoom } from '../utilis/UtilityFunctions';
import DraggableLabel from '../component/DraggableLabel';
import DraggableIcon from '../component/DraggableIcon';
import "../style/custom.css"

const localCanvasData = localStorage.getItem("room-data") ? JSON.parse(localStorage.getItem("room-data")) : null;
const localLabelsData = localStorage.getItem("label-data") ? JSON.parse(localStorage.getItem("label-data")) : null;

const Home = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(true)
  const [customLabel, setCustomLabel] = useState("")
  const [selectdId, setSelectedId] = useState(null)
  const [labelsList, setLabelsList] = useState(localLabelsData?.length > 0 ? localLabelsData : labels)
  const [roomData, setRoomData] = useState(localCanvasData?.length > 0 ? localCanvasData : [])
  /*
   let  roomdata = [
      {id:1,type:"icon,label", style:{color:"",fontSize:"",background:""},position:{x:0,y:0,z:0}}
    ]
  */


  const addObjCanvas = (joinId, type) => {
    const id = newIdAddToRoom(roomData)
    const zIndex = getRoomObjZindex(roomData)
    const labelObj = { id: id, joinId: joinId, type: type, style: {}, position: { x: 0, y: 0, z: zIndex } }
    roomData.push(labelObj)
    setRoomData(() => {
      return [...roomData]
    })
    localStorage.setItem("room-data", JSON.stringify(roomData));
  }

  const applyStyle = (value, key) => {
    let index = roomData.findIndex((obj) => obj?.id === selectdId)
    if (index >= 0) {
      if (key === "fontSize") { value = value + "px" }
      roomData[index].style[key] = value
      setRoomData(() => {
        return [...roomData]
      })
      localStorage.setItem("room-data", JSON.stringify(roomData));
    }
  }


  const addLabel = (text) => {
    if (text.length > 0) {
      const index = labelsList.findIndex((item) => item?.text === text)
      //only add label if it is not exist in current label list
      if (index === -1) {
        const obj = { id: labelsList.length + 1, text: text }
        labelsList.push(obj)
        setLabelsList(() => [...labelsList])
        localStorage.setItem("label-data", JSON.stringify(labelsList));
      }
      setCustomLabel("")
    }
  }

  return (
    <div className="container-fluid " style={{ paddingBottom: "20px" }}>
      <div className="row mt-2">
        <div className="col-md-12">
          <div class="row">
            <div className={`${showLeftMenu ? "col-md-2" : "left-menu-collapse"} px-0`} style={{ borderRight: "1px solid black" }}>
              <div className="column-title">
                <span onClick={() => setShowLeftMenu((prev) => !prev)} style={{ cursor: "pointer" }}>{showLeftMenu ? "<<" : ">>"}</span>
                {showLeftMenu ? " Drag Drop Component" : ""}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div class="accordion">
                    <div class="accordion-item">
                      <div class="accordion-header" id="headingOne">
                        <IconButton size="large" edge="start" color="inherit" aria-label="label" sx={{ ml: 0 }}>
                          <AddCircle />
                        </IconButton>
                        {showLeftMenu &&
                          <>
                            <label>Icons</label>
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            </button>
                          </>}
                      </div>
                      {showLeftMenu &&
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
                          <div class="accordion-body row">
                            {icons?.length > 0 && icons?.map((item) => {
                              return <div className='text-center col-md-4'>
                                <Icon onClick={() => {
                                  addObjCanvas(item?.id, "icon")
                                }}>{item?.key}</Icon></div>
                            })}
                          </div>
                        </div>
                      }
                    </div>

                    <div class="accordion-item">
                      <div class="accordion-header" id="headingTwo">
                        <IconButton size="large" edge="start" color="inherit" aria-label="label" sx={{ ml: 0 }}>
                          <LabelOutlined />
                        </IconButton>
                        {showLeftMenu &&
                          <>  <label>Label</label>
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            </button>
                          </>}
                      </div>
                      {showLeftMenu &&
                        <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" >
                          <div class="accordion-body">
                            {labelsList?.length > 0 && labelsList.map((item, index) => {
                              return <div key={index} className="label-text" title="click here to add " onClick={() => {
                                addObjCanvas(item?.id, "label")
                              }}>{item?.text} </div>
                            })}
                            <div className='row mt-4' >
                              <div className="col-md-12 mb-2"> <input style={{ width: "100%" }} value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} /></div>
                              <div className="col-md-12 mb-2"> <button className="addlabel-btn" onClick={() => addLabel(customLabel)}>Add label</button></div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className={`col-md-8 middle-container px-0 ${showLeftMenu ? "" : "md-no-left"}`} style={{height:"500px"}}>
              <div className="column-title">
                Middle Container
              </div>
              <div className="room-container" id="drag-box">
                {roomData?.length > 0 && roomData.map((item, roomItemIndex) => {
                  if (item?.type === "label" && item?.joinId) {
                    let index = labelsList.findIndex((obj) => obj.id === item?.joinId)
                    if (index === -1) { return null }
                    // we will not show any obj if we cant find any joinid for given id
                    return <DraggableLabel
                      item={item}
                      roomData={roomData}
                      setRoomData={setRoomData}
                      roomItemIndex={roomItemIndex}
                      labelIndex={index}
                      labelsList={labelsList}
                      setSelectedId={setSelectedId}
                    />
                  }
                  if (item?.type === "icon" && item?.joinId) {
                    let index = icons.findIndex((obj) => obj.id === item?.joinId)
                    if (index === -1) { return null }
                    // we will not show any obj if we cant find any joinid for given id
                    return <DraggableIcon
                      item={item}
                      roomData={roomData}
                      setRoomData={setRoomData}
                      roomItemIndex={roomItemIndex}
                      setSelectedId={setSelectedId}
                      icons={icons}
                      iconIndex={index}
                    />
                  }
                  return null
                })}

              </div>
            </div>
            <div className="col-md-2 px-0" style={{ borderLeft: "1px solid black" }}>
              <div className="column-title">
                Properties
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div class="accordion">
                    <div class="accordion-item">
                      <div class="accordion-header" id="headingOneR">
                        <label>Apply Style</label>
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneR" aria-expanded="true" aria-controls="collapseOneR">
                        </button>
                      </div>
                      <div id="collapseOneR" class="accordion-collapse collapse show" aria-labelledby="headingOneR" >
                        <div class="accordion-body">
                          <div className="row" style={{ fontSize: "12px" }}>
                            <label className="col-md-6">Font Size </label>
                            <div className="col-md-6"><input style={{ width: "100%" }} type="number" defaultValue="10" max="30" onChange={(e) => applyStyle(e.target.value, "fontSize")} /> </div>
                          </div>
                          <div className="row mt-2" style={{ fontSize: "12px" }}>
                            <label className="col-md-6">Select Color </label>
                            <div className="col-md-6"><input style={{ width: "100%" }} type="color" onChange={(e) => applyStyle(e.target.value, "color")} /></div>
                          </div>
                          <div className="row mt-2" style={{ fontSize: "12px" }}>
                            <label className="col-md-6">Select backGround </label>
                            <div className="col-md-6"><input style={{ width: "100%" }} type="color" onChange={(e) => applyStyle(e.target.value, "background")} /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>



  )
}

export default Home