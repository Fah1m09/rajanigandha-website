import NewsData from "../../assets/newsdb";

export default function News() {
  return (
    <main className="equipment-container space-y-5">
      {NewsData.map((news) => <article className="flex flex-col overflow-hidden rounded-lg bg-white text-slate-900 shadow-md dark:bg-slate-800 dark:text-white sm:flex-row" key={news.Id}>
        <img className="w-full object-cover sm:w-64" src={news.Image} alt={news.Title} />
        <div className="flex flex-col p-5"><h2 className="text-xl font-semibold">{news.Title}</h2><time className="mt-1 text-sm text-slate-500 dark:text-slate-300">{news.Time}</time><p className="mt-4">{news.Description}</p></div>
      </article>)}
    </main>
  );
}
