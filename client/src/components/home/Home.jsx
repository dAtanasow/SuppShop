import MostRatedSection from "./MostRated";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-10 p-5">
        <MostRatedSection title="TOP RATED PROTEINS" category="protein" />
        <MostRatedSection
          title="TOP RATED TESTOSTERONE BOOSTERS"
          category="testosterone booster"
        />
        <MostRatedSection title="TOP RATED CREATINES" category="creatine" />
      </section>
    </>
  );
}
