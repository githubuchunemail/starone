import React from "react";
import "./Card.scss";
import { Button } from "antd";

const Card = ({ title, img, price, description, category, onDelete, onEdit}) => {
  return (
    <div className="Card">
     <img src={img} alt="" />
     <h3> Name: {title} </h3>
     <p> <b>Price:</b> {price} </p>
     <p> <b>info:</b> {description} </p>
     <p> <b>category:</b> {category} </p>
     <Button type="danger" style={{backgroundColor: "red"}} onClick={onDelete}>Delete</Button>
     <Button onClick={onEdit}>Edite</Button>
    </div>
  );
};

export default Card;
