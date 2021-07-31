import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogposts"); // response = array of blogposts. response.data = {}
      dispatch({ type: "get_blogposts", payload: response.data });
    } catch (e) {
      alert(e);
    }
  };
};

const addBlogPost = (dispatch) => {
  // function that describes how we want to change our data
  return async (title, content, callback) => {
    try {
      await jsonServer.post("/blogposts", { title, content }); // 2nd arg is the info or data that we want to send to our server
      if (callback) callback();
    } catch (e) {
      alert(e);
    }
  }; // inner function here is what we end up calling from inside our component
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    try {
      await jsonServer.delete(`/blogposts/${id}`);
      // this inner function is what we're running inside the component
      dispatch({ type: "delete_blogpost", payload: id });
    } catch (e) {
      alert(e);
    }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    try {
      await jsonServer.put(`/blogposts/${id}`, { title, content });
    } catch (e) {
      alert(e);
    }
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  // exporting two variables called Context and Provider
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);

/* NOTES
    children: unrelated to context

    const App = () => {
        return <CustomComponent>
            <Text>Hi there</Text>
        </CustomComponent>
    }

    - we pass down children as a prop from App to CustomComponent. 
    - we can accept other components as an argument.

    children: <Text>Hi there</Text>

    in this project, children = <App />
    <BlogContext.Provider> is wrappping the entire stack navigator (<App/>) component inside it
    
    - when we create a context object, we also get inside the object something caled the Provider, whcih accepts some info, and this info will be available to all our child components

    pass a single object {data: blogPosts (array of blogposts), addBlogPost: ()=>{//callback function from blog post provider down to index screen.}}
*/

/*
1. app first renders: initial state of blogPosts: empty array hence, no blogposts
2. set up provider, render entire application, given value from blogContext.Provider. these info are blogposts and addBlogPost that will dispatch an action of type 'addblogpost'
3. that will call dispatch (function used to modify our state) and call it with an object as argument with type: 'add_blog_post'
4. runs blogReducer(state, action) function. state: current state, action: type and payload properties. this reducer function returns a state
5. the returning of state causes the blogcontext Provider to rerender (just like useState hook)
6. after rerender, we will get the new blogPosts array
7. rest of application rerenders, indexScreen takes the new value of blogPosts and set it as data for flatlist.

*/

/*
Everytime we want to add in an additional way to change our state object, we do 2 things:
1. add a new function to call dispatch func to make a change to our state object
2. add additional case to our reducer

*/
