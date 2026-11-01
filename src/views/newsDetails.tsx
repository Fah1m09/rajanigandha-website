import NewsData from "../assets/newsdb";

export default function NewsDetails({ newsId }: { newsId: string }) {
  const news = NewsData.find((item) => String(item.Id) === newsId);
  if (!news) return <main className="equipment-container">News item not found.</main>;
  return (
    <main className="equipment-container space-y-5">
      <img className="max-h-[28rem] w-full rounded-lg object-cover lg:w-2/3" src={news.Image} alt={news.Title} />
      <div className="news-date"><span>Date: </span><time>{news.Time}</time></div>
      <h3 className="news-title">{news.Title}</h3>
      <p>{news.Description}</p>
    </main>
  );
}
