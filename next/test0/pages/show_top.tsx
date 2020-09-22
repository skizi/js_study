import Link from "next/link";
import fetch from "node-fetch";

type Props = {
  shows : {
    id : number,
    name : string
  }[]
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



export const getStaticProps = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data:any[] = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return { props : { shows: data.map(entry => entry.show) } };
};

export default Index;