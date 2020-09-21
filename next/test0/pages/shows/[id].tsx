
import fetch from "isomorphic-unfetch"; //SSRでも動作するfetch


type Props = {
  show : object
}

const Post: React.FC<Props> = props => (
  <div>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
  </div>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res:Promise = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show:object = await res.json();
  console.log(`Fetched show: ${show.name}`);
  return { show };
};

export default Post;