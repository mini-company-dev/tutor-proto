import FeatureSection from "./mainSection/featureSection";
import MainHeroSection from "./mainSection/heroSection";
import LevelTestSection from "./mainSection/levelTestSection";

export default function Main() {
  return (
    <main>
      <MainHeroSection />
      <FeatureSection />
      {/* <LevelTestSection /> */}
    </main>
  );
}
