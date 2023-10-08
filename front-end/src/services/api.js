// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchEvents = async (data) => {
  try {
    const response = await axios.get(
      `${API_URL}/events?filter=${JSON.stringify(data)}`
    );
    return response.data;
  } catch (error) {
    console.error("Etkinlikler alınamadı:", error);
    throw error;
  }
};

export const fetchPlaces = async (data) => {
  try {
    const response = await axios.get(
      `${API_URL}/places?filter=${JSON.stringify(data)}`
    );
    return response.data;
  } catch (error) {
    console.error("Etkinlikler alınamadı:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Kategoriler alınamadı:", error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Etkinlik alınamadı:", error);
    throw error;
  }
};

export const fetchPlaceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/places/${id}`);
    return response.data;
  } catch (error) {
    console.error("Places alınamadı:", error);
    throw error;
  }
};

export async function fetchCities() {
  try {
    const response = await axios.get(`${API_URL}/cities`);
    return response.data; // API'den gelen şehir verilerini döndür
  } catch (error) {
    throw new Error("Şehirler alınamadı: " + error.message);
  }
}
