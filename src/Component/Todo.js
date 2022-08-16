import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import "./Todo.css";

const getLocaldata = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function Todo() {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocaldata());
  const [toggle, setToggle] = useState(true);
  const [isEditIte, setIsEditItem] = useState(null);
  const deletItem = (index) => {
    const updateddata = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateddata);
  };
  const addItem = () => {
    if (!inputdata) {
      alert("Add Item");
    } else if (inputdata && !toggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditIte) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      setToggle(true);
      setInputdata("");
      setIsEditItem(null);
    } else {
      const allInputdata = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, allInputdata]);
      setInputdata(" ");
    }
  };

  const editItem = (id) => {
    let newEditItems = items.find((elem) => {
      return elem.id === id;
    });
    setToggle(false);
    setInputdata(newEditItems.name);
    setIsEditItem(id);
  };
  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div>
        <figure>
          <figcaption>Grocery Bud</figcaption>
        </figure>
        <div className="inputdata">
          <input
            type="text"
            placeholder="Add Items..!"
            value={inputdata}
            onChange={(e) => setInputdata(e.target.value)}
          />
          <button
            type="add"
            title="Add Item"
            cursor="pointer"
            onClick={addItem}
          >
            {toggle ? "Add" : "Edit"}
          </button>
        </div>

        {items.map((elem) => {
          return (
            <>
              <div className="items" key={elem.id}>
                <h3 className="item">{elem.name} </h3>
                <div>
                  <FiEdit
                    title={"Edit Item"}
                    cursor={"pointer"}
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      editItem(elem.id);
                    }}
                  />

                  <MdDelete
                    title={"Delete Item"}
                    cursor={"pointer"}
                    onClick={() => {
                      deletItem(elem.id);
                    }}
                  />
                </div>
              </div>
            </>
          );
        })}

        <div>
          <figure>
            <figcaption>
              <button>
                <span onClick={removeAll}>Clear Items</span>
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}

export default Todo;
