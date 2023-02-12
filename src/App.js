import './App.css';
import {useEffect,useState,useCallback}from "react";

 const App=()=> {
  return <Weather></Weather>;
}
const Weather=()=>{
  const [data,setData]=useState([]);//jsonで返ってきたデータを保存するもの
  const [loading,setLoading]=useState(true)//ローディング中か否かのフラグを設定する
  const [city,setcityCode]=useState(130000);//都市コード用、初期値は東京エリア
    const queryWeather=useCallback(async()=>{
    //asyncの中の関数でしかawaitは使えない
    //useCallback(第一引数,第二引数)
    //第二引数[city]の値が変化したときのみ、コールバック関数が実行される
    const url=`https://www.jma.go.jp/bosai/forecast/data/forecast/${city}.json`;
    const response=await fetch(url);
    // fetchで取ってきたデータのjson部分だけを抜き出す。
    const jsondata=await response.json();
    // console.log(JSON.stringify(jsondata));
    // console.log(jsondata[0].timeSeries[0].areas[0].weathers)
    setData(jsondata[0].timeSeries[0].areas[0]);
    setLoading(false);
  },[city]);
  const handleChange=(event)=>{
    setcityCode(event.target.value);
    setLoading(true);
  }
  useEffect(()=>{
    //コンポーネントが描画されてから実行するためuseEffectを利用する
    queryWeather();
  }, [city,queryWeather]);
  let weatherInfo;
  if(loading){
    weatherInfo=<p>loading</p>;
  }else{
    weatherInfo=(
      <p>
        {data.area.name}の明日の天気{data.weathers[0]}
      </p>
    );
  }
  return(
    <>
    <h1>Weather</h1>
    {weatherInfo}
    <select onChange={handleChange}>
      <option value="130000">東京</option>
      <option value="270000">大阪</option>
      <option value="016000">札幌</option>
    </select>

    </>
  )
}

export default App;
