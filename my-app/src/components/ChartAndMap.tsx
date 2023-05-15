import { useQuery } from "@tanstack/react-query";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

type ObjectItem = {
  geocode: number[];
  popUpMsg: any;
};

type DataType = {
  data: ObjectItem[];
};


// Map component and its using wiht in this file
const MapComponent: React.FC<DataType> = ({ data }) => {
  const center = [28.62497207183455, 77.08135102907217];

  
  const customIcon = new Icon({
    iconUrl: "https://img.icons8.com/?size=512&id=txNnXCx7ya2j&format=png",
    iconSize: [20, 20],
  });

  const markers = data;

  return (
    <>
      <MapContainer
        scrollWheelZoom={false}
        center={[28.62497207183455, 77.08135102907217]}
        zoom={3}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Wqqwdi7cJk8J1jUPS5jJ"
        />

        {markers.map((e) => {
          return (
            <>
              <Marker position={[e.geocode[0], e.geocode[1]]} icon={customIcon}>
                <Popup>
                  <li>Name: {e.popUpMsg.name}</li>
                  <li> Active Cases: {e.popUpMsg.active}</li>
                  <li>Recovered: {e.popUpMsg.recovered}</li>
                  <li>Deaths: {e.popUpMsg.deaths}</li>
                </Popup>
              </Marker>
            </>
          );
        })}
      </MapContainer>
    </>
  );
};



// main componet which renders both chart element and map element
export const ChartAndMap = () => {

  // react query call for chartData
  const caseStatisticsObj = useQuery({
    queryKey: ["mydata"],
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then(
        (res) => res.json()
      ),
  });

  // react query call for mapData
  const mapDataObj = useQuery({
    queryKey: ["map"],
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/countries").then((res) =>
        res.json()
      ),
  });

  if (caseStatisticsObj.isLoading || mapDataObj.isLoading) {
    return (
      <div style={{paddingTop:"100px"}}>
        <div role="status">
    <svg aria-hidden="true" className="w-20 h-20  m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
        
      </div>
    );
  }

  if (caseStatisticsObj.error || mapDataObj.error) {
    return <>('An error has occurred: ')</>;
  }
  
  const caseStatistics = caseStatisticsObj.data;
  const caseData = caseStatistics.cases;
  const deathData = caseStatistics.deaths;
  const recoveredData = caseStatistics.recovered;
  const mapData = mapDataObj.data;
  

  let lebelDataCase = [];
  let mainDataCase = [];
  let mainDataDeath = [];
  let mainDataRecovered = [];

  let i = 1;
  for (let key in caseData) {
    lebelDataCase.push(`day ${i}`);
    i++;
  }

  for (let key in caseData) {
    mainDataCase.push(caseData[key]);
  }

  for (let key in deathData) {
    mainDataDeath.push(deathData[key]);
  }
  for (let key in recoveredData) {
    mainDataRecovered.push(recoveredData[key]);
  }

  // filter data for maps component
  let dataForMap = [];

  for (let e of mapData) {
    let obj: any = {
      geocode: "",
      popUpMsg: "",
    };
    let popObjData = {
      name: "",
      active: "",
      deaths: "",
      recovered: "",
    };
    let cordinates = [];
    let lat = e.countryInfo.lat;
    let long = e.countryInfo.long;
    cordinates.push(lat);
    cordinates.push(long);

    popObjData["name"] = e.country;
    popObjData["active"] = e.active;
    popObjData["deaths"] = e.deaths;
    popObjData["recovered"] = e.recovered;
    obj["geocode"] = cordinates;
    obj["popUpMsg"] = popObjData;

    dataForMap.push(obj);
  }
 
//  line chart dataset and other data fields
  const chartData = {
    labels: lebelDataCase,
    datasets: [
      {
        label: "Cases",
        data: mainDataCase,
        backgroundColor: "#890072",
        borderColor: "#d7a231",
        borderWidth: 0,
      },
      {
        label: "Deaths",
        data: mainDataDeath,
        backgroundColor: "#ff0b0b",
        borderColor: "#320f94",
        borderWidth: 0,
      },
      {
        label: "Recoverd",
        data: mainDataRecovered,
        backgroundColor: "#00de3b",
        borderColor: "#009d1f",
        borderWidth: 0,
      },
    ],
  };


  // line chart options to show chart in desired way
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: { beginAtZero: true },
    },
  };

  return (
    <>
      <div>
        <div className="container p-12 mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 pt-8 gap-10">
          <div className="block rounded-lg bg-white px-5 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className=" font-bold border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Covid Cases Fluctuations
            </div>
            <Line height={"130px"} data={chartData} options={options}></Line>
          </div>

          <div
            style={{ padding: "20px" }}
            className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            <div className=" font-bold border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Covid Cases in Map
            </div>
            <MapComponent data={dataForMap} />
          </div>
        </div>
      </div>
    </>
  );
};
