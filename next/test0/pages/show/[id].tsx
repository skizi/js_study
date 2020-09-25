import Link from "next/link";
import fetch from "isomorphic-unfetch"; //SSRでも動作するfetch
import styled from 'styled-components'

const RedLink = styled.a`
  color: red;
`




type Props = {
  show : {
    name : string,
    summary : string,
    image : {
      medium : string
    }
  }
}

const Post: React.FC<Props> = props => (
  <div>
    <style jsx>
      {`
        .return-btn{
          display:block;
        }

        h3{
            padding-left:4px;
            border-left:2px solid #333;
        }

        h4{
          margin-bottom:5px;
        }
      `}
    </style>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
    <Link href="/show">
      <a className="return-btn">一覧に戻る</a>
    </Link>

    <h3>以下のようなhrefがつかないリンクの場合はpassHrefをつけてSEO対策する</h3>
    <h4>hrefなし</h4>
    <Link href="/show">
      <RedLink>一覧に戻る</RedLink>
    </Link>

    <h4>passHrefを利用して、hrefあり</h4>
    <Link href="/show" passHref>
      <RedLink>一覧に戻る</RedLink>
    </Link>
  </div>
);


export const getStaticPaths = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman")
  const data:any[] = await res.json()
  // レポジトリの名前をパスとする
  // const paths = data.map(entry => `/shows/${entry.show.id}`)
  const paths = data.map( entry => ({ params: { id: entry.show.id + "" } }))
  // 事前ビルドしたいパスをpathsとして渡す fallbackについては後述
  return { paths, fallback: false }
}


export const getStaticProps = async (context:any) => {
  const id = context.params.id;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show:any = await res.json();
  return { props : { show } };
};

export default Post;