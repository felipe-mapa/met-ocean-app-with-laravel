import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch, Provider } from "react-redux";
import { Container } from "@material-ui/core";

import * as actions from "./store/metoceanAction";
import ChartContainer from "./containers/ChartContainer";
import Spinner from "./Layout/Spinner/Spinner";
import Header from "./components/Header";
import store from './config/store'

const App = () => {
    // get selectors from store
    const hourlyData = useSelector(state => state.metocean.hourlyData);
    const columns = useSelector(state => state.metocean.columns);

    // set states
    const [isLoading, setIsLoading] = useState(true);

    // fetch all data
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchColumns());
        dispatch(actions.fetchHoulyData());
    }, [dispatch]);

    //  check if it's loading
    useEffect(() => {
        if (hourlyData.length > 0) {
            setIsLoading(false);
        }
    }, [hourlyData]);
    
    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="md" className="App">
                {!isLoading ? (
                    <ChartContainer />
                ) : (
                    // display a loader if data is not loaded
                    <Spinner />
                )}
            </Container>
        </React.Fragment>
    );
};

const app = (
    // access store globally
    <Provider store={store}>
      <App />
    </Provider>
  );

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
