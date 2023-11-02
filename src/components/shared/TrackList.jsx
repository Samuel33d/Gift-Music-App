import TrackCard from "./TrackCard";

const TrackList = ({ tracks }) => {
  
  return (
    <section className="grid gap-3 mt-5 px-2 ">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} showBtnAdd showBtnPlay/>
      ))}
    </section>
  );
};
export default TrackList;
