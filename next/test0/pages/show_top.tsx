import Link from "next/link";
import fetch from "isomorphic-unfetch"; //SSRでも動作するfetch

type Props = {
  id : number,
  name : string
}



const Index: React.FC<Props> = props => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/shows/[id]" as={`/shows/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const res:Promise = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data:object = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return { shows: data.map(entry => entry.show) };
};

export default Index;