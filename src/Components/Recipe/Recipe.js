import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, image, method, ing1, ing2, ing3, ing4, ing5, ing6, ing10, msr1, msr2, msr3, msr4, msr5, msr6, btn, btnText}) => {


    return (
        <div className={style.recipeContainer}>
            <h1>{title}</h1>
            <img className={style.image} src={image} alt=''/>
            <div className={style.ingredients}>
                {!{ing1} ? null : <p className={style.firstP}>{msr1} {ing1}</p>}
                {!{ing2} ? null : <p>{msr2} {ing2}</p>}
                {!{ing3} ? null : <p>{msr3} {ing3}</p>}
                {!{ing4} ? null : <p>{msr4} {ing4}</p>}
                {!{ing5} ? null : <p>{msr5} {ing5}</p>}
                {!{ing6} ? null : <p>{msr6} {ing6}</p>}
                {!{ing10} ? null : <p>{ing10}</p>}
            </div>
            <p className={style.method}>{method}</p>
            <button onClick={btn}>{btnText}</button>
        </div>
    )
}

//trying to sort a way for me to pull in all the different ingredients
// maybe using a new function to loop through numbers 1 - 10 
// and only rendering the ingredients that have something within them
/* const getIngredients = () => {
        for(let i = 0; i < 10; i++) {
            if(i) {

            }
        }
} */

export default Recipe;