import { CategoryState } from './category.state';
import { CategoryModel } from '../../models/category/category.model';
import { CategoryEditModel } from '../../models/category/categoryEdit.model';
import * as CategoriesActions from './category.actions';

const initialState: CategoryState = {
  all: []
};

function getAllCategories(state, allRecipes) {
  return {
    ...state,
    all: allRecipes
  };
}

function addCategory(state: CategoryState, category: CategoryEditModel) {
  return Object.assign({}, state, {
    all: [...state.all, category]
  });
}

function editCategory(state: CategoryState, category: CategoryEditModel) {
  if (state.all.find(c => c.name === category.name)) {
    return state;
  }
  const copyCats = state.all.slice();
  const categoryToEdit = copyCats.find(c => c._id === category._id);
  categoryToEdit.name = category.name;
  categoryToEdit.creationDate = category.creationDate;

  return Object.assign({}, state, {
    all: copyCats
  });
}

function deleteCategory(state: CategoryState, id: string) {
  return Object.assign({}, state, {all: state.all.filter(c => c._id !== id)});
}

export function categoryReducer (
  state: CategoryState = initialState,
  action: any) {
  switch (action.type) {
    case CategoriesActions.GET_ALL:
      return getAllCategories(state, action.payload);
    case CategoriesActions.ADD_CATEGORY:
      return addCategory(state, action.payload);
    case CategoriesActions.EDIT_CATEGORY:
      return editCategory(state, action.payload);
    case CategoriesActions.DELETE_CATEGORY:
      return deleteCategory(state, action.id);
    default:
      return state;
  }
}
