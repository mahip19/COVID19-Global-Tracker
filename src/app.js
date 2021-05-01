import React from "react";
import styles from "./app.module.css";
// import Cards from './components/Cards/Cards'
// import Chart from './components/Chart/Chart'
// import CountryPicker from './components/CountryPicker/CountryPicker'
import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import image from "./images/corona.jpg";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(country);
    console.log(fetchedData);
    //fetching data

    //setting date
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} alt="COVID-19" src={image} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
export default App;
