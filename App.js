import { Provider } from "react-redux";
import AuthNavigator from "./navigations/AuthNavigator";
import { Store } from "./redux/store";

export default function App() {
  return( 
  <Provider store={Store}>
      <AuthNavigator />
  </Provider>
  );
}
