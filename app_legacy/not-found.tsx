import Link from "next/link";

export default function NotFound() {
  function getSiteData() {
    return ["/", "/scan", "/result"];
  }

  const data = getSiteData(); // TODO fetch data from async API using await
  return (
    <div className="min-h-screen hero">
      <div className="flex w-min flex-col rounded-lg p-8 text-center hero-content bg-base-100">
        <h1 className="text-2xl">
          404 Not Found
          <p className="text-base">Start from links below</p>
        </h1>

        <div className="w-min text-left space-y-4">
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
