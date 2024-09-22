import axios from 'axios';

const API_URL = 'http://localhost:8080'; //my server url

export const fetchSpendings = async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    try {
        const response = await axios.get(`${API_URL}/spendings?${query}`);
        console.log(response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            
            if (error.response?.status === 404) {
                console.error('No spendings found (404):', error);
                return []; //  empty array if no spendings are found
            } else {
                console.error('Error fetching spendings:', error.message);
                throw new Error('Failed to fetch spendings');
            }
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Unexpected error occurred');
        }
    }
};
