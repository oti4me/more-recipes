import React from 'react';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import MostUpvotedRecipes from './MostUpvotedRecipes';
import MostFavouritedRecipes from './MostFavouritedRecipes';
import SearchRecipe from './SearchRecipe';
import Pagination from '../Pagination';

/**
 * @description renders home page tabs
 * 
 * @param {object} props
 * 
 * @returns {object} return jsx object that displays the top banner
 */
export const Tab = (props) => {
  return (
    <div className="top-margin-30">
      <ul id="tabs-swipe-demo" className="tabs row">
        <li className="tab col s12 m3 l3 active">
          <Link to="#test-swipe-1"><h5>All Recipes</h5></Link>
        </li>
        <li className="tab col s12 m3 l3">
          <Link className="" to="#test-swipe-2"><h5>Most Voted</h5></Link>
        </li>
        <li className="tab col s12 m3 l3">
          <Link to="#test-swipe-3"><h5>Most Favourited</h5></Link>
        </li>
        <li className="tab col s12 m3 l3" style={{ marginTop: '-10px' }}>
          <Link to="#test-swipe-4" >
            <div className="col s12 m12 l12" >
              <form
                onSubmit={props.handleSubmit}
                onChange={props.handleSubmit}
              >
                <div className="input-field col s12" >
                  <i className="material-icons prefix">search</i>
                  <label
                    htmlFor="search"
                    style={{
                      marginTop: '-6px',
                      fontSize: '10px',
                      textAlign: 'center'
                    }}
                  >
                    Enter Keyword
                  </label>
                  <input
                    id="search"
                    value={props.value}
                    onChange={props.handleChange}
                    name="query"
                    type="text"
                  />
                </div>
              </form>
            </div>
          </Link>
        </li>
      </ul>
      <div id="test-swipe-1" className="col s12 top-margin-20">
        <RecipeList />
        {
          props.recipes && props.recipes.length > 0
            ? <Pagination clickedFrom="home" />
            : ''
        }
      </div>
      <div id="test-swipe-2" className="col s12">
        <MostUpvotedRecipes />
      </div>
      <div id="test-swipe-3" className="col s12">
        <MostFavouritedRecipes />
      </div>
      <div id="test-swipe-4" className="col s12">
        <SearchRecipe />
      </div>
    </div >
  )
};

export default Tab;