import React, { useState, useEffect } from 'react';

let formCSS = "form-select w-60 py-2 px-3 border border-gray-300 rounded-md";
let labelCSS = "block text-sm font-medium text-gray-700 mb-2";

const AddressSelector = () => {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  useEffect(() => {
    // Fetch regions when component mounts
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    // Replace this URL with the actual endpoint for your region data
    const url = 'ph-json/region.json';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRegions(data);
      })
      .catch(error => console.error('Error fetching regions:', error));
  };

  const fetchProvinces = regionCode => {
    // Replace this URL with the actual endpoint for your province data
    const url = 'ph-json/province.json';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const filteredProvinces = data.filter(province => province.region_code === regionCode);
        setProvinces(filteredProvinces);
      })
      .catch(error => console.error('Error fetching provinces:', error));
  };

  const fetchCities = provinceCode => {
    // Replace this URL with the actual endpoint for your city data
    const url = 'ph-json/city.json';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const filteredCities = data.filter(city => city.province_code === provinceCode);
        setCities(filteredCities);
      })
      .catch(error => console.error('Error fetching cities:', error));
  };

  const fetchBarangays = cityCode => {
    // Replace this URL with the actual endpoint for your barangay data
    const url = 'ph-json/barangay.json';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const filteredBarangays = data.filter(barangay => barangay.city_code === cityCode);
        setBarangays(filteredBarangays);
      })
      .catch(error => console.error('Error fetching barangays:', error));
  };

  const handleRegionChange = e => {
    const regionCode = e.target.value;
    setSelectedRegion(regionCode);
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedBarangay('');
    fetchProvinces(regionCode);
  };

  const handleProvinceChange = e => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedCity('');
    setSelectedBarangay('');
    fetchCities(provinceCode);
  };

  const handleCityChange = e => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedBarangay('');
    fetchBarangays(cityCode);
  };

  const handleBarangayChange = e => {
    const barangayCode = e.target.value;
    setSelectedBarangay(barangayCode);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Your submit logic goes here
    console.log('Submitted:', {
      region: selectedRegion,
      province: selectedProvince,
      city: selectedCity,
      barangay: selectedBarangay,
    });
  };

  return (
    <div>
    <section>
    <form method="POST" onSubmit={handleSubmit}>
      <div className="p-10 sm:p-10 flex justify-center flex-col items-center">
        <div className="mb-3">
          <h3>Address Selector - Philippines</h3>
        </div>
        <hr />
        <div className="mb-6">
          <label className={labelCSS}>Region *</label>
          <select
            name="region"
            className={formCSS}
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="" disabled>
              Choose Region
            </option>
            {regions.map(region => (
              <option key={region.region_code} value={region.region_code}>
                {region.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className={labelCSS}>Province </label>
          <select
            name="province"
            className={formCSS}
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="" disabled>
              Choose State/Province
            </option>
            {provinces.map(province => (
              <option key={province.province_code} value={province.province_code}>
                {province.province_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className={labelCSS}>City / Municipality </label>
          <select
            name="city"
            className={formCSS}
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="" disabled>
              Choose City/Municipality
            </option>
            {cities.map(city => (
              <option key={city.city_code} value={city.city_code}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className={labelCSS}>Barangay *</label>
          <select
            name="barangay"
            className={formCSS}
            value={selectedBarangay}
            onChange={handleBarangayChange}
          >
            <option value="" disabled>
              Choose Barangay
            </option>
            {barangays.map(barangay => (
              <option key={barangay.brgy_code} value={barangay.brgy_code}>
                {barangay.brgy_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input type="submit" className="bg-green-500 text-white py-2 px-4 hover:scale-110 rounded-md cursor-pointer w-full sm:w-auto" name="submit" />
        </div>
      </div>
    </form>
    </section>
    <div>
     
    </div>
    </div>
  );
  
};


export default AddressSelector;
