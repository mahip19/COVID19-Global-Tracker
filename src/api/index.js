import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changableUrl = url;

  if (country) {
    changableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changableUrl);

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    // const modifiedData = data.map((dailyData) => ({
    //   confirmed: dailyData.comfirmed.total,
    //   deaths: dailyData.deaths.total,
    //   date: dailyData.reportDate,
    // }));
    // console.log("This is modified Data");
    // console.log(modifiedData);
    // return modifiedData;
    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
