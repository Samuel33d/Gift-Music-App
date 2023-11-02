import TrackCard from "./TrackCard";

const TrackList = ({ tracks, setTrackToPlay }) => {
  return (
    <section className="grid gap-3 mt-5 px-2 ">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          showBtnAdd
          setTrackToPlay={setTrackToPlay}
        />
      ))}
    </section>
  );
};
export default TrackList;
