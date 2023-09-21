import { useRef, useState } from "react";

interface ControlsProps {
  id: number;
  title: string;
  css_styles: string;
  backgroundUrl: string;
  patternSize: number;
  setPatternSize: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  positionX: number;
  setPositionX: React.Dispatch<React.SetStateAction<number>>;
  positionY: number;
  setPositionY: React.Dispatch<React.SetStateAction<number>>;
  rotateX: number;
  setRotateX: React.Dispatch<React.SetStateAction<number>>;
  rotateZ: number;
  setRotateZ: React.Dispatch<React.SetStateAction<number>>;
  perspective: number;
  setPerspective: React.Dispatch<React.SetStateAction<number>>;
  zIndex: number;
  setZIndex: React.Dispatch<React.SetStateAction<number>>;
  setBackgrounds: React.Dispatch<React.SetStateAction<number>>;
}

const Controls: React.FC<ControlsProps> = ({
  id, title, backgroundUrl,
  patternSize, setPatternSize,
  width, setWidth,
  height, setHeight,
  positionX, setPositionX,
  positionY, setPositionY,
  rotateX, setRotateX,
  rotateZ, setRotateZ,
  perspective, setPerspective,
  zIndex, setZIndex,
  setBackgrounds
}) => {

  const [background, setBackground] = useState(backgroundUrl);
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [deleteButtonText, setDeleteButtonText] = useState("Delete");


  const editBackground = async () => {
    setSaveButtonText("Saving...");
    await fetch(`https://dev.admflooring.com/wp-json/custom/v1/backgrounds/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': (window as any).wpData.restNonce
      },
      body: JSON.stringify({
        image_url: background,
        css_styles: {
          patternSize,
          width,
          height,
          positionX,
          positionY,
          rotateX,
          rotateZ,
          perspective,
          zIndex,
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSaveButtonText("Saved!");
          setTimeout(() => {
            setSaveButtonText("Save")
          }, 2000);
        } else {
          setSaveButtonText("Error. Try again.")
        }
      });
  }
  const deleteBackground = async () => {
    setDeleteButtonText("Deleting...")
    await fetch(`https://dev.admflooring.com/wp-json/custom/v1/backgrounds/${id}`, {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': (window as any).wpData.restNonce
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBackgrounds(data.backgrounds);
          setDeleteButtonText("Delete");
        } else {
          setDeleteButtonText("Error. Try again.")
        }
      });
  }

  return (
    <>
      <div className="controls-panel">
        <h2>{title}</h2>
        <div className="controls">
          <div className="control">
            <p>Width: {width}%</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Height: {height}%</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>X: {positionX}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={positionX}
              onChange={(e) => setPositionX(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Y: {positionY}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={positionY}
              onChange={(e) => setPositionY(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Perspective: {perspective}px</p>
            <input
              type="range"
              min="300"
              max="1500"
              value={perspective}
              onChange={(e) => setPerspective(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Rotate X: {rotateX}deg</p>
            <input
              type="range"
              min="0"
              max="100"
              value={rotateX}
              onChange={(e) => setRotateX(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Rotate Z: {rotateZ}deg</p>
            <input
              type="range"
              min="-90"
              max="90"
              value={rotateZ}
              onChange={(e) => setRotateZ(parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <p>Pattern size: {patternSize}px</p>
            <input
              type="range"
              min="0"
              max="1500"
              value={patternSize}
              onChange={(e) => setPatternSize(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="control-url">
          <p>Image URL:</p>
          <input type="text" onChange={(e) => { setBackground(e.target.value) }} value={background} />
        </div>
        <div className="buttons">
          <button
            className="control__button control__button-action"
            onClick={() => setZIndex(zIndex === 1 ? 2 : 1)}
          >
            z-index: {zIndex}
          </button>
          <button onClick={editBackground} className="control__button">{saveButtonText}</button>
          <button onClick={deleteBackground} className="control__button control__button-delete">{deleteButtonText}</button>

        </div>
      </div>
    </>
  );
};

export default Controls;
