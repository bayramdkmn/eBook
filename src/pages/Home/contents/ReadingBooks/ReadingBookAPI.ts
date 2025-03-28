import axios from "axios";
import { API_URL } from "../../../../constants/index";

export async function addReadingBooks(data: any) {
    try {
        const token = localStorage.getItem('authToken');
        const requesterId = localStorage.getItem('requesterId');

        if (!token) {
            throw new Error('Token bulunamadı');
        }
        if (!requesterId) {
            throw new Error('Requester ID bulunamadı');
        }

        const readingBookData = {
            ...data,
            requesterId
        };

        console.log("backend gidecek data", readingBookData);

        const response = await axios.post(`${API_URL}/api/readingBooks/addReadingBook`, readingBookData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (err) {
        console.log("frontend addReadingBooks hata", err);
    }
}
