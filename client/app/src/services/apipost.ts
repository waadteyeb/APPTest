import axios from 'axios';

const API_URL = 'http://localhost:8080'; // my server URL

export const postSpendings = async (spendingData: any) => {
    try {
        const response = await axios.post(`${API_URL}/spendings`, spendingData);
        console.log(response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error posting spendings:', error.message);
            throw new Error('Failed to post spendings');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};
