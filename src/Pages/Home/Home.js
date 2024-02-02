import React, {useState} from "react";
import styles from "./Home.module.css";
import MealItem from "../../Components/Meal-item";
import List from "../../Components/List";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopularIngredients from "../../Components/Popular-ingredients";
import { onDescription } from "../../Redux-toolkit/MealSlice/MealSlice";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { latest, popular, randomMeal,randomIngredient } = useSelector((state) => state.products);

  const handleMealInfo = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };

  const handlePopularMeal = (title, description) => {
    navigate(`/ingredient/${title}`);
    dispatch(onDescription(description));
  }
  const randomMealId = (id,title)=>{
    navigate(`/meal/${id}/${title}`)
  };
  const randomItem = [];
  for (let i=0; i<4; i++){
  let randomIndex = Math.floor(Math.random() * randomIngredient.length);
  randomItem.push(randomIngredient[randomIndex])
  }
  const randomItemClick = (title)=>{
    navigate(`/ingredient/${title}`)
  }
  const [input,setInput]=useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${input}`)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={styles.home_search}>
        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div className={styles.meal_item}>
        <h3>Latest Meals</h3>
        <div className={styles.meal_item_content}>
          <List
            items={latest && latest}
            renderItem={(elem, i) => (
              <MealItem
                key={i}
                {...elem}
              
                onClick={() => handleMealInfo(elem.idMeal, elem.strMeal)}
              />
            )}
          />
        </div>
      </div>
      <div className={styles.popular}>
        <h3>Popular Ingredients</h3>
        <div className={styles.popular_ingredients}>
              <List
                items={popular}
                renderItem={(elem, i) => {
                  if(i < 4) {
                    return (
                      <PopularIngredients 
                        onClick={() => handlePopularMeal(elem.strIngredient, elem.strDescription)} 
                        key={i} {...elem}
                        
                        />
                    )
                  }
                }}
              />
        </div>
      </div>
      <div className={styles.random_meals}>
        <div className={styles.random_content}>
          <h3>Random Meals</h3>
          <div className={styles.random_images}>
            <List 
            items={randomMeal && randomMeal}
            renderItem={(elem)=>(
              <MealItem 
              onClick={()=>randomMealId(elem.idMeal,elem.strCategory)}
              {...elem}/>
            )}/>
          </div>
        </div>
      </div>
      <div className={styles.random_ingredients_title}>
      <h3>Random Ingredients</h3>
      <div className={styles.random_ingredient}>
      <List
      items={randomItem}
      renderItem={(elem)=>(
      <PopularIngredients
      onClick={()=>randomItemClick(elem.strIngredient)}
      {...elem}/>
      )}/>
      </div>
      </div>
    </div>
  );
};


export default Home;
