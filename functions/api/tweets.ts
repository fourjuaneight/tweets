interface TweetValues {
  id?: string;
  tweet: string;
  date: string;
  url: string;
}

interface HasuraTWQueryResp {
  data: {
    media_tweets: TweetValues[];
  };
}

interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
}

const queryHasuraTweets = async (env: ContextValue) => {
  const query = `
    {
      media_tweets(order_by: {date: desc}) {
        date
        tweet
        url
      }
    }
  `;

  try {
    const request = await fetch(`${env.HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${env.HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraTWQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryHasuraTweets) ${list}:\n${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')}\n${query}`;
    }

    const tweets = (response as HasuraTWQueryResp).data.media_tweets;
    const tweetsWithId: TweetValues[] = tweets.map(tweet => ({
      ...tweet,
      id: tweet.url.split('/').pop(),
    }));

    return tweetsWithId;
  } catch (error) {
    throw `(queryHasuraTweets):\n${error}`;
  }
};

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const tweets = await queryHasuraTweets(env);

    if (tweets.length) {
      return new Response(JSON.stringify(tweets), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    } else {
      return new Response('No data found', {
        ok: false,
        status: 404,
      });
    }
  } catch (error) {
    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
