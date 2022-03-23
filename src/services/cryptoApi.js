import {
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
	'X-RapidAPI-Key':
		process.env.REACT_APP_CRYPTOBUDDY_API_KEY
};

const makeRequest = (url) => ({
	url,
	headers: cryptoHeaders
});

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://coinranking1.p.rapidapi.com'
	}),
	endpoints: (builder) => ({
		getCoins: builder.query({
			query: (count) => makeRequest(`/coins?limit=${count}`)
		}),
		getCoin: builder.query({
			query: (coinId) => makeRequest(`/coin/${coinId}`)
		}),
		getCoinHistory: builder.query({
			query: ({ coinId, timeperiod }) =>
				makeRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
		}),
		getCoinExchanges: builder.query({
			query: () => makeRequest('/exchanges')
		})
	})
});

export const {
	useGetCoinsQuery,
	useGetCoinQuery,
	useGetCoinHistoryQuery,
	useGetCoinExchangesQuery
} = cryptoApi;
