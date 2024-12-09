import Image from 'next/image';

export default function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      image: '/post8.png', 
      title: "Loudest à la Madison #1 (L'intégral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: '22 April 2021',
      comments: '10 comments',
    },
    {
      id: 2,
      image: '/post9.png', 
      title: "Loudest à la Madison #1 (L'intégral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: '22 April 2021',
      comments: '10 comments',
    },
    {
      id: 3,
      image: '/post10.png',
      title: "Loudest à la Madison #1 (L'intégral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: '22 April 2021',
      comments: '10 comments',
    },
  ];

  return (
    <div className="featured-posts3">
      <div className="header3">
        <p className="sub-heading3">Practice Advice</p>
        <h2 className="main-heading3">Featured Posts</h2>
        <p className="description3">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
        </p>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-image">
              <Image
                src={post.image}
                alt={post.title}
                width={350}
                height={200}
                layout="responsive"
              />
              <span className="tag">NEW</span>
            </div>
            <div className="post-content">
              <p className="tags">Google · Trending · New</p>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <div className="meta">
                <span>{post.date}</span>
                <span>{post.comments}</span>
              </div>
              <a href="#" className="learn-more">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
