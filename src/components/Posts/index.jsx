import {PostCard} from '../PostCard/index'
export const Posts = ({posts}) => {
  
    return(
        <>
         <div className="posts">
        {posts.map(post => (
            <PostCard {...post} key={post.id}/>
          ))}
      </div>
        </>
    )
}