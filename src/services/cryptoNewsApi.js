import {
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
	'x-bingapis-sdk': 'true',
	'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
	'x-rapidapi-key':
		process.env.REACT_APP_CRYPTOBUDDY_API_KEY
};

const makeRequest = (url) => ({
	url,
	headers: cryptoNewsHeaders
});

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bing-news-search1.p.rapidapi.com'
	}),
	endpoints: (builder) => ({
		getNews: builder.query({
			query: ({ newsCategory, count }) =>
				makeRequest(
					`/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`
				)
		})
	})
});

export const { useGetNewsQuery } = cryptoNewsApi;
