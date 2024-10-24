import './App.css';
import '@fontsource/roboto/400.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table.js';
import PieChart from './PieChart.js';


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {       
        let data = JSON.stringify({
          "id": 403,
          "offset": 0,
          "limit": 10,
          "criteria": "",
          "fetchGeodata": true,
          "epoch": "2024-10-03 12:14:40",
          "timestamp": 1
        });

        let config = {
          method: 'post',
          credentials: false,
          maxBodyLength: Infinity,
          url: 'http://localhost:3000',
          headers: {
            "Target-URL": "https://data.mos.ru/ehdapi/catalog/get",
            'ehd-system': 'opod',
            'content-type': 'application/json',
          },
          data: data
        };

        const response = await axios.request(
          config
        );
        const APIResult = response.data.response;
        console.log(APIResult)
        const tableData = aggregateData(APIResult)
        setData(tableData);
        console.log(tableData)
      }
      catch (error) {
        console.error(error);
      }

    };

    fetchData();
  }, []);

  const aggregateData = (data) => {
    let aggregated = data.reduce((acc, item) => {
      const district = item.District;
      const capacity = item.Capacity || 0;
      if (!acc[district]) {
        acc[district] = 0;
      }
      acc[district] += capacity;
      return acc;
    }, {});
    //console.log(aggregated)

    return Object.keys(aggregated).map(district => ({
      District: district, Capacity: aggregated[district]
    })).sort((a, b) => b.Capacity - a.Capacity);
  };

  return (
    <div className="App">
      <main>
        {data ?
          <>
            <h2>Загруженность парковочных мест по району</h2>
            <Table data={data} />
            <PieChart data={data} />
          </>
          : <h2>"Loading..."</h2>}
      </main>
    </div>
  );
}

export default App;
