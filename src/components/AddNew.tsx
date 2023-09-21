import { useRef, useState } from "react";

interface AddNewProps {
  setBackgrounds: React.Dispatch<React.SetStateAction<any>>;
}

const AddNew: React.FC<AddNewProps> = ({ setBackgrounds }) => {

  const [addButtonText, setAddButtonText] = useState("Add new");
  const [isOpen, setIsOpen] = useState(false);

  const bgTitle = useRef<HTMLInputElement>(null);
  const bgUrl = useRef<HTMLInputElement>(null);


  const addBackground = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddButtonText("Adding...")
    await fetch(`https://dev.admflooring.com/wp-json/custom/v1/backgrounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': (window as any).wpData.restNonce
      },
      body: JSON.stringify({
        title: bgTitle.current?.value,
        image_url: bgUrl.current?.value,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBackgrounds(data.backgrounds);
          setAddButtonText("Add new");
          setIsOpen(false);
        } else {
          setAddButtonText("Error. Try again.")
        }
      });
  }

  return (
    <>
      <div className="add-new">
        <button onClick={() => { setIsOpen(!isOpen) }} className="control__button control__button-add">{addButtonText}</button>
        {isOpen && <form onSubmit={addBackground} className="add-new-bg">
          <input type="text" ref={bgTitle} placeholder="Title" />
          <input type="text" ref={bgUrl} placeholder="Image url" />
          <button type="submit">Add</button>
        </form>}
      </div>
    </>
  );
};

export default AddNew;
