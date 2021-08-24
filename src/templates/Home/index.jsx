
import './styles.css';
import { useEffect, useState, useCallback } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPages] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    :
    posts;


  const handleLoadPosts = useCallback(async (page,postsPerPage) => {
   
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  },[])

  useEffect(() => {
    handleLoadPosts(page,postsPerPage);
  },[handleLoadPosts,page,postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPages(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}

        <Input searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />

      )}
      {filteredPosts.length === 0 && (
        <h1>Sem resultados para a pesquisa</h1>

      )}
      <div className="button-container">
        {!searchValue && (
          <>
            <Button disabled={noMorePosts} text="Load more posts" onClick={loadMorePosts} />
          </>
        )}

      </div>
    </section>
  );
}

/* class Home2 extends Component {
  state = {

    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState(
      {
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos,
      });
  }
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  componentDidUpdate() {


  }
  componentWillUnmount() {

  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      :
      posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )}

          <Input searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />

        )}
        {filteredPosts.length === 0 && (
          <h1>Sem resultados para a pesquisa</h1>

        )}
        <div className="button-container">
          {!searchValue && (
            <>
              <Button disabled={noMorePosts} text="Load more posts" onClick={this.loadMorePosts} />
            </>
          )}

        </div>
      </section>
    );
  }
} */


export default Home;
