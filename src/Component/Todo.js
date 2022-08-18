import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.dark("Please Add Item");
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
    toast.dark("Clear All Item")
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
    <ToastContainer/>
      <div className="vh-100 gridBox">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card">
                <div class="card-body p-5">
                  <figure className="wood-text">
                    <figcaption className="d-flex justify-content-center">
                      Grocery Bud
                    </figcaption>
                  </figure>
                  <div className="d-flex justify-content-center mb-4">
                  <div className="inputdata">
                    <input
                      type="text"
                      placeholder="Add Items..!"
                      value={inputdata}
                      onChange={(e) => setInputdata(e.target.value)}
                    />
                    </div>
                    <div>
                    <button
                      type="add"
                      title="Add Item"
                      cursor="pointer"
                      onClick={addItem}
                    >
                      {toggle ? "Add" : "Edit"}
                    </button>
                    </div>
                  </div>

                  {items.map((elem) => {
                    return (
                      <>
                        <div className="inputda d-flex justify-content-center mb-4">
                          <div className="items" key={elem.id}>
                            <h3 className="item">{elem.name} </h3>
                            <div>
                              <FiEdit
                                className="crudButton"
                                title={"Edit Item"}
                                cursor={"pointer"}
                                style={{ paddingRight: "10px" }}
                                onClick={() => {
                                  editItem(elem.id);
                                }}
                              />

                              <MdDelete
                                className="crudButton"
                                title={"Delete Item"}
                                cursor={"pointer"}
                                onClick={() => {
                                  deletItem(elem.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                  <div>
                    <figure className="d-flex justify-content-center mb-4">
                      <figcaption>
                        <button className="button">
                          <span  onClick={removeAll}>Clear Items</span>
                        </button>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
