import axios from 'axios';
import bodybuilder from 'bodybuilder';

const SEARCH = `${process.env.REACT_APP_PUBLIC_API}/v1/search`;

export const queryRequest = body => {
  return axios.post(SEARCH, body)
    .then(response => response.data);
};

export const languageAggRequest = () => axios.post(SEARCH, {
  body: bodybuilder()
    .size(0)
    .agg('terms', 'language.locale.keyword', {}, 'locale', a => a.aggregation('terms', 'language.display_name.keyword', {}, 'display'))
    .build(),
}).then(response => response.data);

export const postTypeAggRequest = () => axios.post(SEARCH, {
  body: bodybuilder()
    .size(0)
    .agg('terms', 'type.keyword', {}, 'postType')
    .build(),
}).then(response => response.data);
