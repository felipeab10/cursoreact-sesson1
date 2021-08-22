import '../../templates/Home'
export const PostCard = (props) => {
return (
    <>
    <div className="post" >
            <div  className="post-content">
              <img src={props.cover} alt={props.title} />

              <h1>{props.title}</h1>
              <p>{props.body}</p>
            </div>
          </div>
    </>
)
}