import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const AddressStateCity = ({ user, Controller, control, setValue }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchStates = async () => {
    try {
      var config = {
        method: "GET",
        url: "https://api.countrystatecity.in/v1/countries/IN/states",
        headers: {
          "X-CSCAPI-KEY": process.env.REACT_APP_CSC_KEY,
        },
      };

      let { data } = await axios(config);
      setStates(data.map((item) => ({ value: item.iso2, label: item?.name })));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async (state) => {
    try {
      var config = {
        method: "GET",
        url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
        headers: {
          "X-CSCAPI-KEY": process.env.REACT_APP_CSC_KEY,
        },
      };

      let { data } = await axios(config);
      setCities(data.map((item) => ({ value: item.name, label: item.name })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.state && states.length > 0) {
        setValue(
          "state",
          states.find((st) => st.label === user.state)
        );
        if (user.city) {
          fetchCities(states.find((st) => st.label === user.state).value);
        }
      }
    }
  }, [user, states, setValue]);

  useEffect(() => {
    if (!isUpdate) {
      if (user) {
        if (user.city && cities.length > 0) {
          setValue(
            "city",
            cities.find((ct) => ct.label === user.city)
          );
          setIsUpdate(true);
        }
      }
    }
  }, [cities, isUpdate, setValue, user]);

  return (
    <>
      <div className="col-md-6" style={{ zIndex: 50 }}>
        <div
          className="input-wrap"
          style={{ border: "1px solid #18497014", borderRadius: "4px" }}
        >
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={states}
                closeMenuOnSelect={true}
                value={value}
                name={name}
                placeholder="Select State"
                onChange={(val) => {
                  setValue("city", "");
                  onChange(val);
                  fetchCities(val.value);
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="col-md-6" style={{ zIndex: 50 }}>
        <div
          className="input-wrap"
          style={{ border: "1px solid #18497014", borderRadius: "4px" }}
        >
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                placeholder="Select City"
                {...field}
                options={cities}
                closeMenuOnSelect={true}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default AddressStateCity;
