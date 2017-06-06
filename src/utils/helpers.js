import bodybuilder from 'bodybuilder';

export const millisToSeconds = (millis) => {
  if (typeof millis !== 'number') {
    throw new Error('_millisToSeconds(): Provided parameter is not a number');
  }
  return ((millis % 60000) / 1000).toFixed(2);
};

export const numberWithCommas = (number) => {
  if (typeof number !== 'number') {
    throw new Error('Error: Parameter provided is not a number');
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalizeFirst = (str) => {
  return (str).substr(0, 1).toUpperCase() + (str).substr(1);
}

export const queryBuilder = (store) => {
  let body = new bodybuilder();
  let options = [];

  if (store.language.currentLanguage) {
    options.push(`language.locale: ${store.language.currentLanguage}`);
  }

  if (store.search.author) {
    options.push(`author.name: ${store.search.author}`);
  }

  if (store.type.currentPostType) {
    options.push(`type: ${store.type.currentPostType}`);
  }

  if (store.date.dateSelect) {
    if (store.date.dateSelect !== 'custom') {
      body.filter('range', 'published', { gte: store.date.dateSelect });
    }
    else if (store.date.dateSelect === 'custom') {
      body.filter('range', 'published', {
        gte: store.date.from,
        lte: store.date.to,
        format: 'dd/MM/yyyy'
      });
    }
  }

  if (store.search.sort === 'published') {
    body.sort('published', 'desc')
  }

  let optionStr = options.reduce((acc, value, index, arr) => {
    if (index === (arr.length - 1)) {
      acc += value;
    } else {
      acc += `${value} AND `;
    }
    return acc;
  }, '');

  // add original search query last
  body.query('query_string', 'query', `${store.search.query} AND (${optionStr})`);

  return body.build();
};


