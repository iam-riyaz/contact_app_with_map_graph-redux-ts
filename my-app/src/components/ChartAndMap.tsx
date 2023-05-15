import { useQuery } from "@tanstack/react-query";
import { Bar,Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export const ChartAndMap = () => {
  const { isLoading, error, data } = useQuery({
    
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((res) => res.json()),
  });

  const caseStatisticsObj=useQuery({
    queryFn:()=>
    fetch("https://disease.sh/v3/covid-19/all").then((res) => res.json())
  })

  const mapDataObj=useQuery({
    queryFn:()=>
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((res) => res.json())
  })

  if (isLoading || caseStatisticsObj.isLoading || mapDataObj.isLoading) {
    return (
      <div>
        {" "}
        <h1 style={{ margin: "auto" }}>(Loading...)</h1>
      </div>
    );
  }

  if (error || caseStatisticsObj.error || mapDataObj.error) {
    return <>('An error has occurred: ')</>;
  }

  const caseStatistics= caseStatisticsObj.data;
  const caseData=caseStatistics.cases;
  const deathData= caseStatistics.deaths;
  const recoveredData= caseStatistics.recovered;
  const mapData= mapDataObj.data 

   console.log({caseData,caseStatistics,mapData});
  let lebelDataCase= []
  let mainDataCase= []
  let mainDataDeath=[]
  let mainDataRecovered=[]

  let i=1
  for(let key in caseData) {
    lebelDataCase.push(`day ${i}`)
    i++
  }

  for(let key in caseData) {
    mainDataCase.push(caseData[key])
  }

  for(let key in deathData)
  {
    mainDataDeath.push(deathData[key])
  }
  for(let key in recoveredData)
  {
    mainDataRecovered.push(recoveredData[key])
  }
  



  console.log({mainData: mainDataCase, lebelData: lebelDataCase})

  const chartData = {
    labels:lebelDataCase,
    datasets: [
      {
        label: "Cases",
        data: mainDataCase,
        backgroundColor: "#ffc3c3",
        borderColor: "#d7a231",
        borderWidth: 1,
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
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x:{beginAtZero: true}

    },
  };

  console.log({ data });
  return (
    <>
      
      <div>
        <div className="container p-12 mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 pt-8 gap-10">
          <div className="block rounded-lg bg-white px-5 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div  className=" font-bold border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          Covid Cases Fluctuations
                  </div>
            <Line data={chartData} options={options}></Line>
          </div>
          
          

          {/* <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <Bar data={chartData} options={options}></Bar>
          </div> */}
        </div>
        
      </div>
    </>
  );
};
