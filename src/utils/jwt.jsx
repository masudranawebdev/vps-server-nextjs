"use client";
import { jwtDecode } from "jwt-decode";

const decodedToken = (token) => {
  return jwtDecode(token);
};

export default decodedToken;
