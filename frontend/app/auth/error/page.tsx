export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <h2>Sorry, something went wrong.</h2>
      {params?.error ? (
        <p>Code error: {params.error}</p>
      ) : (
        <p>An unspecified error occurred.</p>
      )}
    </div>
  );
}
