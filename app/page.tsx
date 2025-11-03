import MainHeroSection from "./mainSection/hero";
import LevelTestSection from "./mainSection/levelTestSection";
import ApiSection from "./mainSection/speechSection";

export default function Main() {
  return (
    <div>
      <MainHeroSection />
      <ApiSection />
      <LevelTestSection />
    </div>
  );
}
