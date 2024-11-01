import Link from "next/link";

export default function NotFound() {
  function getSiteData() {
    return ["/", "/scan", "/result"];
  }

  const data = getSiteData(); // TODO fetch data from async API using await
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex flex-col text-center w-min bg-base-100 rounded-lg p-8">
        <h1 className="text-2xl">
          404 Not Found
          <p className="text-base">Start from links below</p>
        </h1>

        <div className="space-y-4 text-left w-min">
          {data.map((url) => (
            <Link key={url} href={url} className="block badge link link-hover">
              {url}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
