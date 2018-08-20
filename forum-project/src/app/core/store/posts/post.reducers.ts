import { PostState } from './post.state';
import { PostModel } from '../../models/posts/post.model';
import * as PostActions from './post.actions';

const initialState: PostState = {
  all: []
};

function getAllPosts(state, allRecipes) {
  return {
    ...state,
    all: allRecipes
  };
}

function addPost(state: PostState, post: PostModel) {
  return Object.assign({}, state, {
    all: [...state.all, post]
  });
}

function editPost(state: PostState, post: PostModel) {
  const copyCats = state.all.slice();
  const postToEdit = copyCats.find(c => c._id === post._id);
  postToEdit.title = post.title;
  postToEdit.body = post.body;
  postToEdit.author = post.author;
  postToEdit.category = post.category;
  postToEdit.creationDate = post.creationDate;
  postToEdit.comments = post.comments;

  return Object.assign({}, state, {
    all: copyCats
  });
}

function deletePost(state: PostState, id: string) {
  return Object.assign({}, state, {all: state.all.filter(c => c._id !== id)});
}

export function postReducer (
  state: PostState = initialState,
  action: any) {
  switch (action.type) {
    case PostActions.GET_ALL:
      return getAllPosts(state, action.payload);
    case PostActions.ADD_POST:
      return addPost(state, action.payload);
    case PostActions.EDIT_POST:
      return editPost(state, action.payload);
    case PostActions.Delete:
      return deletePost(state, action.id);
    default:
      return state;
  }
}
