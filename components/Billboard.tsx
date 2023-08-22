import useBillboard from '@/hooks/useBillboard';

export default function Billboard() {
  const { data } = useBillboard();

  return (
    <div>
      <h1>Billboard</h1>
      <video
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
      <div>
        <p>{data?.title}</p>
        <p>{data?.description}</p>
      </div>
      <div>
        <button>More Info</button>
      </div>
    </div>
  );
}
