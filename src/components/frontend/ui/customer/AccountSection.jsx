"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { AuthContext } from "@/context/context";
import { districts } from "@/data/district-data";
import { divisions } from "@/data/division-data";
import { useUpdateAccountMutation } from "@/redux/feature/getme/getmeApi";
import withAuth from "@/utils/withAuth";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

const AccountSection = () => {
  const [division, setDivision] = useState(null);
  const [divisionName, setDivisionName] = useState(null);
  const [changeDivision, setChangeDivision] = useState(false);
  const [district, setDistrict] = useState(null);
  const [openDistrict, setOpenDistrict] = useState(true);
  const [divisionId, setDivisionId] = useState(null);
  const [districtsData, setDistrictsData] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [updateAccount, { isLoading }] = useUpdateAccountMutation();

  useEffect(() => {
    setDivision(user?.user_division);
    setDivisionName(user?.user_division);
    if (division) {
      setDistrict(user?.user_district);
    }
  }, [user]);

  useEffect(() => {
    if (!divisionId) {
      const id = divisions.find((divi) => divi?.name === divisionName);
      setDivisionId(id?.id);
    }
  }, [divisionName, divisionId]);

  useEffect(() => {
    if (divisionId) {
      const districtData = districts.filter(
        (district) => district?.division_id === divisionId
      );
      setDistrictsData(districtData);
    }
  }, [divisionId]);

  const handleOnSubmit = async (data) => {
    try {
      data["user_phone"] = user?.user_phone;
      data["user_division"] = division;
      data["user_district"] = district;
      const res = await updateAccount(data);
      if (res.data?.statusCode === 200 && res.data?.success === true) {
        toast.success(res?.data?.message, {
          autoClose: 1500,
        });
      } else {
        toast.error(res.error.data?.message, {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || loading) {
    return "Loading...";
  }

  return (
    <div className="p-1">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          My Profile
        </h2>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="user_name">
                Name
              </label>
              <input
                id="user_name"
                defaultValue={user?.user_name}
                placeholder="name"
                type="text"
                {...register("user_name")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="user_email">
                Email
              </label>
              <input
                id="user_email"
                placeholder="email"
                defaultValue={user?.user_email}
                type="email"
                {...register("user_email")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="user_phone">
                Phone
              </label>
              <input
                minLength={11}
                maxLength={11}
                disabled
                placeholder="phone"
                defaultValue={user?.user_phone}
                id="user_phone"
                type="phone"
                {...register("user_phone")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="user_address">
                Address
              </label>
              <input
                id="user_address"
                placeholder="address"
                type="text"
                defaultValue={user?.user_address}
                {...register("user_address")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="division" className="label">
                <span className="label-text">Division</span>
              </label>
              <Select
                id="division"
                name="division"
                required
                aria-label="Select a Division"
                isSearchable={true}
                options={divisions}
                defaultValue={{
                  name: user?.user_division,
                  id: user?.user_division,
                }}
                getOptionLabel={(x) => x?.name}
                getOptionValue={(x) => x?.id}
                onChange={(selectedOption) => {
                  setDivisionId(selectedOption?.id);
                  setDivision(selectedOption?.name);
                  setChangeDivision(true);
                  setOpenDistrict(false);
                  setTimeout(() => {
                    setOpenDistrict(true);
                  }, 100);
                }}
              ></Select>
            </div>
            {openDistrict && (
              <div className="form-control w-full">
                <label htmlFor="district" className="label">
                  <span className="label-text">District</span>
                </label>
                {changeDivision == true ? (
                  <Select
                    id="district"
                    name="district"
                    required
                    aria-label="Select a District"
                    isSearchable={true}
                    options={districtsData}
                    getOptionLabel={(x) => x?.name}
                    getOptionValue={(x) => x?.id}
                    onChange={(selectedOption) => {
                      setDistrict(selectedOption?.name);
                    }}
                  ></Select>
                ) : (
                  <Select
                    id="district"
                    name="district"
                    required
                    aria-label="Select a District"
                    isSearchable={true}
                    options={districtsData}
                    defaultValue={{
                      name: user?.user_district,
                      id: user?.user_district,
                    }}
                    getOptionLabel={(x) => x?.name}
                    getOptionValue={(x) => x?.id}
                    onChange={(selectedOption) => {
                      setDistrict(selectedOption?.name);
                    }}
                  ></Select>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isLoading ? <MiniSpinner /> : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default withAuth(AccountSection);
