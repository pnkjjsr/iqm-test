import React, { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import InfiniteScroll from "react-infinite-scroll-component";

import Layout from "@layouts/open/index";
import Item from "@components/Item";

export default function Home({ data }) {
  if (data.error_id == 502) {
    return <Container>{data.error_message}</Container>;
  }

  let arr = Object.values(data.items);
  // let arr = Object.values(data.articles);

  const [items, setItems] = useState(arr);
  const [apiPage, setApiPage] = useState(1);

  const fetchMoreData = async () => {
    setApiPage(apiPage + 1);
    let no = apiPage + 1;

    let res = await fetch(
      `https://api.stackexchange.com/2.2/questions?page=${no}&pagesize=20&order=desc&sort=activity&tagged=javascript&site=stackoverflow`
      // `https://newsapi.org/v2/everything?page=${no}&pageSize=20&q=bitcoin&from=2020-08-07&sortBy=publishedAt&apiKey=56f97ce62cde4666882c52ca9e986f58`
    );
    let data = await res.json();

    setItems(Object.values(data.items).concat());
    // setItems(items.concat(Object.values(data.articles)));
  };

  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <Head>
          <title>IQM | Next.js + TypeScript Example</title>
          <meta
            name="description"
            content="IQM | Next.js + TypeScript Example"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Container>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {items.map((i, index) => {
                let iso = i.creation_date.setSeconds(0, 0);
                let date = new Date(iso.toISOString);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let dt = date.getDate();

                return (
                  <Item
                    key={index}
                    title={i.title}
                    author={i.author}
                    date={`${dt}/${month}/${year}`}
                    data={i}
                  />
                );
              })}
            </InfiniteScroll>
          </Container>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.stackexchange.com/2.2/questions?page=1&pagesize=20&order=desc&sort=activity&tagged=javascript&site=stackoverflow"
    // "https://newsapi.org/v2/everything?page=1&pageSize=20&q=bitcoin&from=2020-08-07&sortBy=publishedAt&apiKey=56f97ce62cde4666882c52ca9e986f58"
  );
  const data = await res.json();

  return { props: { data } };
}
