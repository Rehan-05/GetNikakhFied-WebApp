import { combineReducers } from "redux";
import { loginReducer } from "./LoginReducers";
import { homeRed } from "./homeRed";
import { filterReducer } from "./filterRed";
import { boolR } from "./boolRed";
import { chatReducer, singleChatReducer } from "./ChatReducers";

const rootReducer = combineReducers({
  homeRed,
  loginReducer,
  filterReducer,
  boolR,
  chatReducer,
  singleChatReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
