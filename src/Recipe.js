import React from "react";
import styles from "./recipe.module.css";
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={styles.recipe}>
      <h2>{title}</h2>

      <h4>Calories: {calories}</h4>
      <ol>
        {ingredients.map(ingredient => (
          <li className="listone">{ingredient.text}</li>
        ))}
      </ol>

      <img src={image} alt="" className={styles.image} />

      <hr />
    </div>
  );
};

export default Recipe;
