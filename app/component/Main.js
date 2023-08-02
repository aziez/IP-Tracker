/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const MapView = dynamic(() => import("./MapView"), {
  loading: () => <p>LOADING.......</p>, // A loading indicator to show while loading
  ssr: false, // Avoid server-side rendering (only render on the client side)
});

const Main = () => {
  const [ipValue, setIpValue] = useState("");
  const [latLang, setLatLang] = useState([]);
  const [datas, setDatas] = useState();
  const apiKey = process.env.NEXT_PUBLIC_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_URL;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${apiUrl}?apiKey=${apiKey}&ipAddress=${ipValue}`
      );
      if (!res.ok) {
        throw new Error("API request failed with status: " + res.status);
      }
      const data = await res.json();
      setDatas(data);
      const location = { lat: data?.location?.lat, lang: data?.location?.lng };

      setLatLang(location);
      console.log("HAS SUBMITTED", data); // Log the fetched data, not the state
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="relative z-10">
        <div className="py-16 overflow-hidden bg-gray-900 isolate">
          <img
            src="/images/pattern-bg-desktop.png"
            alt=""
            className="absolute inset-0 object-cover w-full h-full object-start -z-10"
          />
          <img
            src="/images/pattern-bg-mobile.png"
            alt=""
            className="absolute inset-0 object-cover w-full h-full object-start md:hidden -z-10"
          />
          <h1 className="mb-4 text-xl font-bold text-center text-white">
            IP Address Tracker
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center w-full px-10 md:px-44">
              <input
                type="text"
                name="ip-address"
                id="ip-address"
                autoComplete="given-ip"
                onChange={(e) => setIpValue(e.target.value)}
                value={ipValue}
                className="block px-3.5 w-full py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded-s-lg"
              />
              <button
                className="px-4 py-2 bg-black border-black hover:bg-gray-800 focus:outline-none focus:ring-opacity-75 rounded-e-lg"
                type="submit"
              >
                <img src="/images/icon-arrow.svg" alt="Arrow Icon" />
              </button>
            </div>
          </form>
        </div>
        <div className="absolute w-full px-10 rounded-lg md:-bottom-20">
          <div className="grid grid-cols-1 gap-2 px-6 py-5 text-center bg-white rounded-lg md:grid-cols-4 md:text-left">
            <div className="flex flex-col justify-center grid-rows-2">
              <p className="font-mono text-xs font-semibold text-gray-500 ">
                IP ADDRESS
              </p>
              <p className="text-lg font-bold text-black">{datas?.ip}</p>
            </div>
            <div className="flex flex-col justify-center grid-rows-2">
              <p className="font-mono text-xs font-semibold text-gray-500 ">
                LOCATION
              </p>
              <p className="text-lg font-bold text-black">{`${datas?.location?.city}, ${datas?.location?.country} ${datas?.location?.geonameId}`}</p>
            </div>
            <div className="flex flex-col justify-center grid-rows-2">
              <p className="font-mono text-xs font-semibold text-gray-500 ">
                TIMEZONE
              </p>
              <p className="text-lg font-bold text-black">{`UTC ${datas?.location?.timezone}`}</p>
            </div>
            <div className="flex flex-col justify-center grid-rows-2">
              <p className="font-mono text-xs font-semibold text-gray-500 ">
                ISP
              </p>
              <p className="text-lg font-bold text-black">{datas?.isp}</p>
            </div>
          </div>
        </div>
      </div>
      <MapView latLang={latLang} />
    </>
  );
};
export default Main;
